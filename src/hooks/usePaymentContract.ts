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

  const payForMint = useCallback(async (): Promise<string> => {
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

    return tx;
  }, [fetchState, program, provider, wallet.publicKey]);

  return { fetchState, payForMint };
}
