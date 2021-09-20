import { useContext } from 'react';

import { WaifuContext } from '../contexts';

export function useWaifu() {
  const waifuCtx = useContext(WaifuContext);

  return waifuCtx;
}
