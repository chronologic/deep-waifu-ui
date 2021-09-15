import styled from 'styled-components';
import { Typography, Layout, Divider, Button, Dropdown, Menu, message } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';

import { flamingo } from '../colors';

const { Header } = Layout;
const { Title } = Typography;

function handleMenuClick(e: any) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1" icon={<LogoutOutlined />}>
      Disconnect
    </Menu.Item>
  </Menu>
);

export default function AppHeader() {
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
            <Dropdown className="wallet" overlay={menu}>
              <Button>
                GKvqs...EJqiV <DownOutlined />
              </Button>
            </Dropdown>
          </CustomMenu>
        </Header>
      </CustomHeader>
    </FixedHeader>
  );
}

const CustomMenu = styled.div`
  display: flex;
  padding-top: 1.2em;

  .wallet {
    margin-left: auto;
    margin-top: 1em;
  }
  .ant-btn:hover,
  .ant-btn:focus {
    color: ${flamingo};
    border-color: ${flamingo};
  }

  a.title {
    display: flex;
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
