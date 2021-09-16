import React from 'react';

import { SelfieProvider } from './contexts';
import SolanaProviders from './SolanaProviders';

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    <SolanaProviders>
      <SelfieProvider>{children}</SelfieProvider>
    </SolanaProviders>
  );
}
