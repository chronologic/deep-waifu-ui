import { useCallback, useEffect, useMemo, useState } from 'react';
import * as anchor from '@project-serum/anchor';

import idl from '../idl/deep_waifu_payment_contract.json';
import { PAYMENT_PROGRAM_ID, PAYMENT_PROGRAM_PDA } from '../env';
import { useSolanaProvider } from './useSolanaProvider';
import { IPaymentPda } from '../types';

console.log({ PAYMENT_PROGRAM_ID, PAYMENT_PROGRAM_PDA });

export function usePaymentContract() {
  // const [state, setState] = useState<IPaymentPda>();
  const provider = useSolanaProvider();
  const program = useMemo(() => new anchor.Program(idl as any, PAYMENT_PROGRAM_ID, provider), [provider]);

  const fetchState = useCallback(async (): Promise<IPaymentPda> => {
    const pdaState = await program.account.paymentStorage.fetch(PAYMENT_PROGRAM_PDA);

    // setState(pdaState as any);

    return pdaState as any;
  }, [program.account.paymentStorage]);

  return { fetchState };
}
