import React from 'react';

import { WaifuProvider } from './contexts';
import SolanaProviders from './SolanaProviders';

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    <SolanaProviders>
      <WaifuProvider>{children}</WaifuProvider>
    </SolanaProviders>
  );
}
