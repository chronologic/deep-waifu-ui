import { useCallback, useMemo } from 'react';
import * as anchor from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';

import idl from '../idl/deep_waifu_payment_contract.json';
import { PAYMENT_PROGRAM_ID, PAYMENT_PROGRAM_PDA } from '../env';
import { useSolanaProvider } from './useSolanaProvider';
import { IPaymentPda } from '../types';

export function usePaymentContract() {
  const provider = useSolanaProvider();
  const wallet = useWallet();
  const program = useMemo(() => new anchor.Program(idl as any, PAYMENT_PROGRAM_ID, provider), [provider]);

  const fetchState = useCallback(async (): Promise<IPaymentPda> => {
    const pdaState = await program.account.paymentStorage.fetch(PAYMENT_PROGRAM_PDA);

    return pdaState as any;
  }, [program.account.paymentStorage]);

  const extractId = useCallback(
    async (tx: string): Promise<number> => {
      const res = await provider.connection.getTransaction(tx);
      const logs = extractLogs(res!.meta!.logMessages!);

      return extractIdFromLogs(logs);
    },
    [provider.connection]
  );

  const payForMint = useCallback(async (): Promise<{ tx: string; payer: string; id: number }> => {
    const state = await fetchState();

    const tx = await program.rpc.payForMint({
      accounts: {
        myPda: new anchor.web3.PublicKey(PAYMENT_PROGRAM_PDA),
        payer: wallet.publicKey,
        beneficiary: state.beneficiary,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [],
      instructions: [
        anchor.web3.SystemProgram.transfer({
          fromPubkey: wallet.publicKey!,
          toPubkey: state.beneficiary,
          lamports: 0,
        }),
      ],
    });

    await provider.connection.confirmTransaction(tx);
    const id = await extractId(tx);

    return { tx, payer: wallet.publicKey!.toBase58(), id };
  }, [extractId, fetchState, program.rpc, provider.connection, wallet.publicKey]);

  return { fetchState, payForMint };
}

function extractLogs(logMessages: string[]): string[] {
  const startIndex = logMessages.findIndex((msg) => msg.startsWith(`Program ${PAYMENT_PROGRAM_ID} invoke`));
  const endIndex = logMessages.findIndex((msg) => msg === `Program ${PAYMENT_PROGRAM_ID} success`);

  return logMessages.slice(startIndex, endIndex);
}

function extractIdFromLogs(logMessages: string[]): number {
  const paymentRegex = /\[([A-Za-z0-9]{44}):([0-9]{1,4})\]/;
  const msg = logMessages.find((msg) => msg.includes('Paid for mint'));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, payer, id] = msg!.match(paymentRegex)!;

  return Number(id);
}
