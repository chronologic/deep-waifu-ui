import React from 'react';

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  return <div>{children}</div>;
}
