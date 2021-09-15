import { useContext } from 'react';

import { SelfieContext } from '../contexts';

export function useSelfie() {
  const selfieCtx = useContext(SelfieContext);

  return selfieCtx;
}
