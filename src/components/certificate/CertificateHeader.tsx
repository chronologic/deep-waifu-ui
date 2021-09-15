import styled from 'styled-components';
import { Typography, Layout, Space, Button, Image, Row, Col, Card, message } from 'antd';
import { LinkOutlined, FilePdfOutlined } from '@ant-design/icons';
import { flamingo, whitesmoke, bluegrey } from '../colors';
import { Pillow } from '../pillow';
import { AppHeader } from '../shared';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function CertificateHeader() {
  return (
    <Layout>
      <AppHeader />
      <CustomContent id="upload">
        <Content>
          <Row className="mainTitle">
            <Title className="titleRed">(´｡• ω •｡`)</Title>
            <Title>&nbsp;Your DeepWaifu NFT has been listed!</Title>
          </Row>
          <Row className="flow">
            <Col flex="640px">
              <Overlay>
                <Certificate>
                  <Card hoverable cover={<img height="451" alt="certificate" src={'../img/mockup-blank.jpg'} />}></Card>
                </Certificate>
                <CertificateImage>
                  <Image width={256} preview={false} src={'../img/waifu/waifu9.png'} />
                </CertificateImage>
                <TextBlock>
                  <Row className="flow">
                    <Col flex="240px">
                      <Space direction="vertical">
                        <Title className="title30">Certificate of Adoption</Title>
                        <Text className="titleJumbo">養子縁組証明書</Text>
                        <Text strong className="text14">
                          Let it be known to all that the holder of the DeepWaifu known by the name of
                        </Text>
                        <Text className="titleName">Himari</Text>
                        <Text strong className="text14">
                          has agreed to provide a loving home for this waifu and promised to keep it safe.
                        </Text>
                        <br />
                        <Text className="text8">
                          <strong>Token ID:</strong> 0001
                        </Text>
                        <Text className="text8">
                          <strong>Holder:</strong> GKvqsuNcnwWqPzzuhLmGi4rzzh55FhJtGizkhHaEJqiV
                        </Text>
                      </Space>
                    </Col>
                  </Row>
                </TextBlock>
              </Overlay>
              <Mint>
                <Space direction="vertical" size="middle">
                  <div className="mintBtn">
                    <Space direction="horizontal" size="large">
                      <Button danger size="large">
                        Tweet it!
                      </Button>
                      <Button type="primary" size="large" danger>
                        View NFT
                      </Button>
                    </Space>
                  </div>
                  <div className="mintBtn">
                    <Space direction="horizontal" size="large">
                      <Button type="link" danger icon={<LinkOutlined />}>
                        View on Solanascan
                      </Button>
                      <Button type="link" danger icon={<FilePdfOutlined />}>
                        Download PDF
                      </Button>
                    </Space>
                  </div>
                </Space>
              </Mint>
            </Col>
            <Col flex="auto">
              <Pillow />
            </Col>
          </Row>
        </Content>
      </CustomContent>
    </Layout>
  );
}

const Overlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

const Certificate = styled.div`
  text-align: center;
  position: relative;
  top: 0;
  left: 0;
  margin-bottom: 3em;

  .ant-card-body {
    display: none;
  }
  .ant-card-cover,
  .ant-card-bordered {
    height: 451px;
  }
`;

const CertificateImage = styled.div`
  position: absolute;
  top: 140px;
  left: 70px;
  transform: rotate(-14.5deg);
  mix-blend-mode: multiply;
`;

const TextBlock = styled.div`
  position: absolute;
  top: 0px;
  left: 365px;
  transform: rotate(-14.5deg);
  text-align: center;
  mix-blend-mode: multiply;

  .titleName {
    font-family: Hachi Maru Pop;
    font-style: normal;
    font-weight: normal;
    font-size: 30px;
    line-height: 36px;
    color: ${flamingo};
  }
  .text14 {
    color: ${bluegrey};
  }
`;

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
  .mintBtn {
    display: block;
  }
`;

const CustomContent = styled.div`
  background: ${whitesmoke};

  .ant-layout-content {
    max-width: 960px;
    margin: 8em auto 0 auto;
    padding: 0 10px;
  }
  .ant-input:hover,
  .ant-input:focus,
  .ant-input-focused {
    border-color: ${flamingo};
    box-shadow: 0 0 0 2px rgb(235 87 87 / 20%);
  }

  .mainTitle {
    display: flex;
    padding: 1em 0 2em;
  }

  .certificate {
    text-align: center;
  }

  .titleFeaturesRed {
    font-size: 16px;
    color: ${flamingo};
  }
  .titleFeatures {
    font-size: 16px;
  }
  .titleRed {
    color: ${flamingo};
  }
  .title30 {
    font-size: 30px;
    margin: 0px;
    margin-top: 0px !important;
    color: ${bluegrey};
  }
  .titleJumbo {
    font-family: Hachi Maru Pop;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 36px;
    color: ${flamingo};
  }
  .text14 {
    font-size: 14px;
  }
  .text12 {
    font-size: 12px;
  }
  .text8 {
    font-size: 8px;
    color: ${bluegrey};
  }
  .flow {
    flex-flow: initial;
  }
`;
