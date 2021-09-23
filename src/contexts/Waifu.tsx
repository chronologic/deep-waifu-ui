import React, { createContext, useCallback, useState } from 'react';
import { message } from 'antd';

import { SECOND_MILLIS } from '../constants';
import { apiService } from '../services';
import { sleep } from '../utils';

export interface IWaifu {
  loading: boolean;
  name: string;
  onSetName: (name: string) => void;
  id: number;
  onSetId: (id: number) => void;
  holder: string;
  onSetHolder: (holder: string) => void;
  tx: string;
  onSetTx: (tx: string) => void;
  selfie: File | undefined;
  onSelfieChange: (file: File) => void;
  waifu: File | undefined;
  onReset: () => void;
}

interface IProps {
  children: React.ReactNode;
}

export const WaifuContext = createContext<IWaifu>({
  loading: false,
  selfie: undefined,
  name: '',
  onSetName: () => {},
  id: 0,
  onSetId: () => {},
  holder: '',
  onSetHolder: () => {},
  tx: '',
  onSetTx: () => {},
  onSelfieChange: () => {},
  waifu: undefined,
  onReset: () => {},
});

export const WaifuProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  const [holder, setHolder] = useState('');
  const [tx, setTx] = useState('');
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
    setName('');
    setId(0);
    setHolder('');
    setLoading(false);
  }, []);

  return (
    <WaifuContext.Provider
      value={{
        loading,
        selfie,
        name,
        onSetName: setName,
        id,
        onSetId: setId,
        holder,
        onSetHolder: setHolder,
        tx,
        onSetTx: setTx,
        onSelfieChange: handleSelfieChange,
        waifu,
        onReset: handleReset,
      }}
    >
      {children}
    </WaifuContext.Provider>
  );
};
