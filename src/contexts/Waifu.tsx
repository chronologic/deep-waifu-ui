import React, { createContext, useCallback, useEffect, useState } from 'react';
import { message } from 'antd';

import { SECOND_MILLIS } from '../constants';
import { apiService } from '../services';
import { fileToDataUrl, sleep, srcToFile } from '../utils';

const STATE_STORAGE_KEY = 'waifu-state';

export interface IWaifuSerializableState {
  name: string;
  id: number;
  holder: string;
  tx: string;
  selfieDataUrl: string;
  waifuDataUrl: string;
  metadataLink: string;
  certificateLink: string;
}

export interface IWaifuState extends IWaifuSerializableState {
  selfie: File | undefined;
  waifu: File | undefined;
}

export interface IWaifuContext {
  state: IWaifuState;
  onUpdateState: (state: Partial<IWaifuState>, replace?: boolean) => void;
  onResetState: () => void;
}

interface IProps {
  children: React.ReactNode;
}

export const WaifuContext = createContext<IWaifuContext>({
  state: {} as any,
  onUpdateState: () => {},
  onResetState: () => {},
});

const initialState = readState();

export const WaifuProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [initialized, setInitialized] = useState(false);
  const [waifuState, setWaifuState] = useState<IWaifuState>(initialState as any);

  const persistState = useCallback((newState: IWaifuState) => {
    setWaifuState(newState);
    storeState(newState);
  }, []);

  const handleResetState = useCallback(() => {
    persistState({} as any);
  }, [persistState]);

  const handleUpdateState = useCallback(
    async (state: Partial<IWaifuState>, replace = false) => {
      const newState = { ...state };

      if (newState.waifu) {
        newState.waifuDataUrl = await fileToDataUrl(newState.waifu);
      } else if (newState.waifuDataUrl) {
        newState.waifu = await srcToFile(newState.waifuDataUrl, 'waifu.png', 'image/png');
      }

      if (newState.selfie) {
        newState.selfieDataUrl = await fileToDataUrl(newState.selfie);
        persistState({ ...waifuState, ...newState });
        try {
          const [res] = await Promise.all([apiService.selfie2anime(newState.selfie), sleep(3 * SECOND_MILLIS)]);
          newState.waifu = res;
          newState.waifuDataUrl = await fileToDataUrl(res);
        } catch (e) {
          message.error((e as any).message || 'Unknown error. Please try again');
          handleResetState();
          throw e;
        }
      } else if (newState.selfieDataUrl) {
        newState.selfie = await srcToFile(newState.selfieDataUrl, 'selfie.jpg', 'image/jpeg');
      }

      const updatedState = replace ? newState : { ...waifuState, ...newState };

      persistState(updatedState as IWaifuState);
    },
    [waifuState, persistState, handleResetState]
  );

  useEffect(() => {
    async function init() {
      await handleUpdateState(initialState as IWaifuState);
      setInitialized(true);
    }

    init();
    // only run this once so skip any dependencies
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WaifuContext.Provider
      value={{
        state: waifuState,
        onUpdateState: handleUpdateState,
        onResetState: handleResetState,
      }}
    >
      {initialized && children}
    </WaifuContext.Provider>
  );
};

function storeState(state: IWaifuState) {
  localStorage.setItem(
    STATE_STORAGE_KEY,
    JSON.stringify({
      ...state,
      waifu: undefined,
      selfie: undefined,
    })
  );
}

function readState(): IWaifuSerializableState {
  return JSON.parse(localStorage.getItem(STATE_STORAGE_KEY) || '{}');
}
