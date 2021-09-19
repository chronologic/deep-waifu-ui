import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Layout, Space, Button, Image, Row, Col, Card, Input, Switch, message } from 'antd';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

import { usePaymentContract, useSelfie } from '../../hooks';
import { fileToDataUrl } from '../../utils';
import { apiService } from '../../services';
import { flamingo, whitesmoke } from '../colors';
import { AppHeader, Pillow } from '../shared';
import NftCounter from './NftCounter';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function MintButton() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { waifu } = useSelfie();
  const { payForMint } = usePaymentContract();
  const [resumeMint, setResumeMint] = useState(false);

  const handleMint = useCallback(async () => {
    if (!connected) {
      setResumeMint(true);
      return setVisible(true);
    }

    try {
      const tx = await payForMint();
      console.log(tx);
      message.success('Payment successful');
      const res = await apiService.mint(tx, waifu!, 'lol');
      console.log(res);
      message.success('Waifu minted!');
    } catch (e) {
      message.error((e as any).message + 'sdsdfsd');
    }
  }, [connected, payForMint, setVisible, waifu]);

  useEffect(() => {
    if (connected && resumeMint) {
      setResumeMint(false);
      handleMint();
    }
  }, [connected, handleMint, resumeMint]);

  return (
    <Mint>
      <Space direction="vertical" size="middle">
        <div className="switch">
          <Space direction="horizontal" size="large">
            <Image className="solLogo" height={14} preview={false} src={'../img/solana-logo-red.svg'} />
            <Switch checkedChildren="Pay with SOL" unCheckedChildren="Pay with DAY" defaultChecked />
          </Space>
        </div>
        <Button type="primary" size="large" danger onClick={handleMint}>
          Mint DeepWaifu NFT
        </Button>
        <NftCounter />
      </Space>
    </Mint>
  );
}

const Mint = styled.div`
  text-align: center;
  margin: 2em 0;

  .ant-switch {
    background-color: ${flamingo};
  }
  .ant-switch-checked {
    background-color: black;
  }
  .ant-switch-checked:focus {
    box-shadow: 0 0 0 2px rgb(235 87 87 / 20%);
  }
  .solLogo {
    margin-top: 2px;
  }
`;
