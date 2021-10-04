import { useCallback, useMemo } from 'react';
import * as anchor from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import * as splToken from '@solana/spl-token';

import idl from '../idl/deep_waifu_payment_contract.json';
import { PAYMENT_PROGRAM_ID, PAYMENT_TOKEN_MINT } from '../env';
import { useSolanaProvider } from './useSolanaProvider';
import { IPaymentPda } from '../types';

interface IPaymentResult {
  tx: string;
  payer: string;
  id: number;
}

export function usePaymentContract() {
  const provider = useSolanaProvider();
  const wallet = useWallet();
  const program = useMemo(() => new anchor.Program(idl as any, PAYMENT_PROGRAM_ID, provider), [provider]);

  const fetchState = useCallback(async (): Promise<IPaymentPda> => {
    const [paymentProgramPda] = await getPaymentStoragePdaAddress();
    const pdaState = await program.account.paymentStorage.fetch(paymentProgramPda);

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

  const payForMintSol = useCallback(async (): Promise<string> => {
    const state = await fetchState();
    const [paymentProgramPda] = await getPaymentStoragePdaAddress();

    console.log('initializing SOL payment...', {
      myPda: new anchor.web3.PublicKey(paymentProgramPda).toBase58(),
      payer: wallet.publicKey!.toBase58(),
      beneficiary: state.beneficiary.toBase58(),
      systemProgram: anchor.web3.SystemProgram.programId.toBase58(),
    });

    return program.rpc.payForMint({
      accounts: {
        myPda: new anchor.web3.PublicKey(paymentProgramPda),
        payer: wallet.publicKey,
        beneficiary: state.beneficiary,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      instructions: [
        anchor.web3.SystemProgram.transfer({
          fromPubkey: wallet.publicKey!,
          toPubkey: state.beneficiary,
          lamports: 0,
        }),
      ],
    });
  }, [fetchState, program.rpc, wallet.publicKey]);

  const payForMintDay = useCallback(async (): Promise<string> => {
    const state = await fetchState();
    const [paymentProgramPda] = await getPaymentStoragePdaAddress();

    const walletToken = await splToken.Token.getAssociatedTokenAddress(
      splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
      splToken.TOKEN_PROGRAM_ID,
      new anchor.web3.PublicKey(PAYMENT_TOKEN_MINT),
      wallet.publicKey!,
      false
    );

    console.log('initializing DAY payment...', {
      myPda: new anchor.web3.PublicKey(paymentProgramPda).toBase58(),
      payer: wallet.publicKey!.toBase58(),
      from: walletToken.toBase58(),
      beneficiaryDay: state.beneficiaryDay.toBase58(),
      tokenProgram: splToken.TOKEN_PROGRAM_ID.toBase58(),
    });

    return program.rpc.payForMintSpl({
      accounts: {
        myPda: new anchor.web3.PublicKey(paymentProgramPda),
        payer: wallet.publicKey,
        from: walletToken,
        beneficiaryDay: state.beneficiaryDay,
        tokenProgram: splToken.TOKEN_PROGRAM_ID,
      },
    });
  }, [fetchState, program.rpc, wallet.publicKey]);

  const payForMint = useCallback(
    async (dayPayment: boolean): Promise<IPaymentResult> => {
      const tx = dayPayment ? await payForMintDay() : await payForMintSol();

      await provider.connection.confirmTransaction(tx);
      const id = await extractId(tx);

      return { tx, payer: wallet.publicKey!.toBase58(), id };
    },
    [extractId, payForMintDay, payForMintSol, provider.connection, wallet.publicKey]
  );

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

async function getPaymentStoragePdaAddress() {
  return await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(anchor.utils.bytes.utf8.encode('payment-storage'))],
    new anchor.web3.PublicKey(PAYMENT_PROGRAM_ID)
  );
}

getPaymentStoragePdaAddress().then((res) => console.log(res[0].toBase58()));
