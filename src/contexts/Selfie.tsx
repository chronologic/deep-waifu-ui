import React, { createContext, useCallback, useState } from 'react';
import { message } from 'antd';

import { SECOND_MILLIS } from '../constants';
import { apiService } from '../services';
import { sleep } from '../utils';

export interface ISelfie {
  loading: boolean;
  selfie: File | undefined;
  onSelfieChange: (file: File) => void;
  waifu: File | undefined;
  onReset: () => void;
}

interface IProps {
  children: React.ReactNode;
}

export const SelfieContext = createContext<ISelfie>({
  loading: false,
  selfie: undefined,
  onSelfieChange: () => {},
  waifu: undefined,
  onReset: () => {},
});

export const SelfieProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [selfie, setSelfie] = useState<File>();
  const [waifu, setWaifu] = useState<File>();

  const handleSelfieChange = useCallback(async (file: File) => {
    setSelfie(file);
    setLoading(true);
    try {
      const [res] = await Promise.all([apiService.selfie2anime(file), sleep(3 * SECOND_MILLIS)]);
      setWaifu(res);
    } catch (e) {
      message.error((e as any).message || 'Unknown error. Please try again');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setSelfie(undefined);
    setWaifu(undefined);
    setLoading(false);
  }, []);

  return (
    <SelfieContext.Provider
      value={{ loading, selfie, onSelfieChange: handleSelfieChange, waifu, onReset: handleReset }}
    >
      {children}
    </SelfieContext.Provider>
  );
};
