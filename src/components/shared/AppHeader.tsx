import styled from 'styled-components';
import { Typography, Layout, Divider } from 'antd';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

import { flamingo } from '../colors';

const { Header } = Layout;
const { Title } = Typography;

export default function AppHeader() {
  const wallet = useWallet();

  return (
    <FixedHeader>
      <CustomHeader>
        <Header>
          <CustomMenu>
            <a className="title" href="/">
              <Title>Deep</Title>
              <Title className="titleRed">Waifu</Title>
              <Divider type="vertical" />
              <Title>ディープ</Title>
              <Title className="titleRed">ワイフ</Title>
            </a>
            <WalletMultiButton className={wallet.connected ? 'walletConnector' : 'walletConnector hidden'} />
          </CustomMenu>
        </Header>
      </CustomHeader>
    </FixedHeader>
  );
}

const CustomMenu = styled.div`
  display: flex;
  padding-top: 1.2em;
  justify-content: space-between;

  a.title {
    display: flex;
  }

  .ant-btn:hover,
  .ant-btn:focus {
    color: ${flamingo};
    border-color: ${flamingo};
  }

  .walletConnector {
    background-color: white;
    color: rgba(0, 0, 0, 0.85);
    border: 1px solid rgba(0, 0, 0, 0.85);
    border-radius: 3px;
    font-weight: 300;

    &:hover {
      background-color: white;
      transition: all 0.2s ease;
      color: ${flamingo};
      border-color: ${flamingo};
      background-image: none;
    }

    &.hidden {
      visibility: hidden;
    }
  }
`;

const CustomHeader = styled.div`
  .ant-layout-header {
    height: 8em;
    background: white;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 10px;
  }
  .titleRed {
    color: ${flamingo};
  }
  .ant-divider-vertical {
    top: 1.3em;
    height: 1.6em;
    border-left: 2px solid rgba(0, 0, 0, 0.2);
  }
`;

const FixedHeader = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.06);
  background: white;
`;
