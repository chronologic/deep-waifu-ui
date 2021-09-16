import { Wallet, web3, Provider } from '@project-serum/anchor';
import { useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const keypair = web3.Keypair.generate();
const defaultWallet = new Wallet(keypair);

export function useSolanaProvider() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const anchorWallet = useMemo(() => wallet || defaultWallet, [wallet]);
  const provider = useMemo(
    () =>
      new Provider(connection, anchorWallet as any, {
        preflightCommitment: 'confirmed',
      }),
    [anchorWallet, connection]
  );

  return provider;
}
