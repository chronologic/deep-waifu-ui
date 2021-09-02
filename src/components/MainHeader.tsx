import styled from 'styled-components';
import { Typography, Layout, Upload, Image, Divider, Button, Dropdown, Menu, message } from 'antd';
import { CloudUploadOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { flamingo } from './colors';

const { Header, Content } = Layout;
const { Dragger } = Upload;
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

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: any) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function MainHeader() {
  return (
    <Layout>
      <FixedHeader>
        <CustomHeader>
          <Header>
            <CustomMenu>
              <Title>Deep</Title>
              <Title className="titleRed">Waifu</Title>
              <Divider type="vertical" />
              <Title>ディープ</Title>
              <Title className="titleRed">ワイフ</Title>
              <Dropdown className="wallet" overlay={menu}>
                <Button>
                  GKvqs...EJqiV <DownOutlined />
                </Button>
              </Dropdown>
            </CustomMenu>
          </Header>
        </CustomHeader>
      </FixedHeader>
      <CustomContent id="upload">
        <Content>
          <div className="grid-layout">
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie1.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu1.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie2.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu2.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie3.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu3.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie4.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu4.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie5.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu5.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie6.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu6.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie7.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu7.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie8.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu8.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie9.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu9.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie10.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu10.png').default} />
              </div>
            </div>
            <div className="grid-item span-1">
              <Dragger {...props} showUploadList={false}>
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined />
                </p>
                <Title className="titleRed">(=^･ω･^=)</Title>
                <Title>Upload a Selfie Here</Title>
                <p>Photos you upload will NOT BE PUBLISHED</p>
              </Dragger>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie11.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu11.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie12.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu12.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie13.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu13.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie14.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu14.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie15.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu15.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie16.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu16.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie17.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu17.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie18.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu18.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie19.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu19.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie20.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu20.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie21.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu21.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie22.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu22.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie23.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu23.png').default} />
              </div>
            </div>
            <div className="grid-item span-2">
              <div className="selfie">
                <Image width={160} preview={false} src={require('../img/selfie/selfie24.jpg').default} />
              </div>
              <div className="waifu">
                <Image width={160} preview={false} src={require('../img/waifu/waifu24.png').default} />
              </div>
            </div>
          </div>
        </Content>
      </CustomContent>
    </Layout>
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

const CustomContent = styled.div`
  .ant-layout-content {
    max-width: 1280px;
    margin: 8em auto 0 auto;
  }
  .titleRed {
    color: ${flamingo};
  }
  .grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8em, auto));
    grid-auto-rows: minmax(8em, auto);
    grid-gap: 0px;
  }
  .span-1 {
    grid-column-end: span 8;
    grid-row-end: span 4;
    margin: 2em;
  }
  .span-2 {
    grid-column-end: span 2;
    grid-row-end: span 2;
    height: 160px;
  }
  .selfie,
  .waifu {
    position: absolute;
    transition: 0.5s;
  }

  .waifu:hover {
    opacity: 0;
  }
`;
