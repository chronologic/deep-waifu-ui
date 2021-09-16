import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Layout, Space, Button, Image, Row, Col, Card, Input, Switch } from 'antd';

import { flamingo, whitesmoke } from '../colors';
import { Pillow } from '../pillow';
import { usePaymentContract, useSelfie } from '../../hooks';
import { AppHeader } from '../shared';
import { fileToDataUrl } from '../../utils';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function GeneratorHeader() {
  const history = useHistory();
  const { loading, selfie, waifu, onReset } = useSelfie();
  const [waifuDataUrl, setWaifuDataUrl] = useState<string>();
  const [selfieDataUrl, setSelfieDataUrl] = useState<string>();

  const handleReset = useCallback(() => {
    onReset();
    history.push('/');
  }, [history, onReset]);

  useEffect(() => {
    async function convertWaifuToDataUrl() {
      const dataUrl = await fileToDataUrl(waifu as File);
      setWaifuDataUrl(dataUrl);
    }

    if (waifu) {
      convertWaifuToDataUrl();
    }
  }, [waifu]);

  useEffect(() => {
    async function convertSelfieToDataUrl() {
      const dataUrl = await fileToDataUrl(selfie as File);
      setSelfieDataUrl(dataUrl);
    }

    if (selfie) {
      convertSelfieToDataUrl();
    }
  }, [selfie]);

  const { fetchState } = usePaymentContract();

  useEffect(() => {
    fetchState().then(console.log);
  }, [fetchState]);

  return (
    <Layout>
      <AppHeader />
      <CustomContent id="upload">
        <Content>
          <Row className="mainTitle">
            {!loading && (
              <>
                <Title className="titleRed">(´｡• ω •｡`)</Title>
                <Title>&nbsp;Here’s your DeepWaifu!</Title>
              </>
            )}
            {loading && (
              <>
                <Title className="titleRed">( ☆ ω ☆ )</Title>
                <Title>&nbsp;Generating your DeepWaifu...</Title>
              </>
            )}
          </Row>
          <Row className={loading ? 'flow blur' : 'flow'}>
            <Col flex="640px">
              <Certificate>
                <Card hoverable>
                  <Row className="flow">
                    <Col>
                      <CertificateImage>
                        <Card className="certImage">
                          <Space direction="vertical" size="large">
                            <Image width={280} preview={false} src={waifuDataUrl || selfieDataUrl} />
                            <Button type="link" danger onClick={handleReset}>
                              Re-upload selfie
                            </Button>
                          </Space>
                        </Card>
                      </CertificateImage>
                    </Col>
                    <Col>
                      <Space direction="vertical">
                        <Title className="title30">Certificate of Adoption</Title>
                        <Text className="titleJumbo">養子縁組証明書</Text>
                        <Text strong className="text14">
                          Let it be known to all that the holder of the DeepWaifu known by the name of
                        </Text>
                        <Input size="large" placeholder="DeepWaifu’s Name" />
                        <Text strong className="text14">
                          has agreed to provide a loving home for this waifu and promised to keep it safe.
                        </Text>
                        <Input size="large" placeholder="Your Email" />
                        <Text className="text12">Your email will be kept private</Text>
                      </Space>
                    </Col>
                  </Row>
                </Card>
              </Certificate>
              <Mint>
                <Space direction="vertical" size="middle">
                  <div className="switch">
                    <Space direction="horizontal" size="large">
                      <Image className="solLogo" height={14} preview={false} src={'../img/solana-logo-red.svg'} />
                      <Switch checkedChildren="Pay with SOL" unCheckedChildren="Pay with DAY" defaultChecked />
                    </Space>
                  </div>
                  <Button type="primary" size="large" danger>
                    Mint DeepWaifu NFT
                  </Button>
                  <Text className="text12">
                    Hurry up, there's only <strong> 999 NFTs left to mint!</strong>
                  </Text>
                </Space>
              </Mint>
            </Col>
            <Col flex="auto">
              <Pillow overlay={waifuDataUrl || selfieDataUrl} />
            </Col>
          </Row>
        </Content>
      </CustomContent>
    </Layout>
  );
}

const Certificate = styled.div`
  text-align: center;
`;

const CertificateImage = styled.div`
  .certImage {
    width: 310px;
    height: 310px;
    margin: 0 3em 1em 0;
  }
  .ant-card-body {
    padding: 1em;
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
  .solLogo {
    margin-top: 2px;
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
  .flow {
    flex-flow: initial;

    &.blur {
      filter: blur(10px);
    }
  }
`;
