import React from 'react';

import { SelfieProvider } from './contexts';

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  return <SelfieProvider>{children}</SelfieProvider>;
}
