import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Space, Button, Image, Row, Col, Card, Input, Switch, Form, message } from 'antd';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import * as anchor from '@project-serum/anchor';

import { flamingo, whitesmoke } from '../colors';
import { usePaymentContract, useWaifu } from '../../hooks';
import { fileToDataUrl, sleep } from '../../utils';
import NftCounter from './NftCounter';
import { apiService } from '../../services';
import { SECOND_MILLIS } from '../../constants';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const { Title, Text } = Typography;

const emailRegex =
  /^([a-zA-Z0-9_\-+.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/i;
const MAX_NAME_LENGTH = 24;

export default function MintForm() {
  const history = useHistory();
  const [form] = Form.useForm();
  const { selfie, waifu, onReset, onSetName, onSetHolder, onSetId, onSetTx } = useWaifu();
  const [waifuDataUrl, setWaifuDataUrl] = useState<string>();
  const [selfieDataUrl, setSelfieDataUrl] = useState<string>();
  const { publicKey, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const { payForMint, fetchState } = usePaymentContract();
  const [resumeMint, setResumeMint] = useState(false);
  const [minting, setMinting] = useState(false);
  const [priceSol, setPriceSol] = useState(0);

  const waitForMint = useCallback(async (tx: string): Promise<{ id: number; tx: string }> => {
    return new Promise(async (resolve, reject) => {
      try {
        while (true) {
          await sleep(3 * SECOND_MILLIS);
          const res = await apiService.mintStatus(tx);
          if (res.status === 'minted') {
            return resolve({ id: res.id!, tx: res.tx! });
          } else if (res.status === 'error') {
            return reject(new Error(res.message));
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  }, []);

  const handleMint = useCallback(async () => {
    const { name, email } = await form.validateFields();

    if (!connected) {
      setResumeMint(true);
      return setVisible(true);
    }

    setMinting(true);

    try {
      const tx = await payForMint();
      message.success('Payment successful!');
      await apiService.mint(tx, waifu!, name);
      const res = await waitForMint(tx);
      onSetId(res.id);
      onSetTx(res.tx);
      onSetName(name);
      onSetHolder(publicKey?.toBase58() || '');
      message.success('Your Waifu has been minted!');
      history.push('/certificate');
    } catch (e) {
      message.error((e as any).message);
    } finally {
      setMinting(false);
    }
  }, [connected, payForMint, setVisible, waifu]);

  useEffect(() => {
    if (connected && resumeMint) {
      setResumeMint(false);
      handleMint();
    }
  }, [connected, handleMint, resumeMint]);

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

  useEffect(() => {
    async function fetchPrice() {
      const state = await fetchState();
      setPriceSol(state.priceLamports.mul(new anchor.BN(100)).div(new anchor.BN(LAMPORTS_PER_SOL)).toNumber() / 100);
    }

    fetchPrice();
  }, [fetchState]);

  return (
    <Form form={form}>
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
                <Form.Item
                  name="name"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: "Please provide your Waifu's name",
                    },
                    {
                      max: MAX_NAME_LENGTH,
                      message: `Name can be at most ${MAX_NAME_LENGTH} characters long`,
                    },
                  ]}
                >
                  <Input size="large" placeholder="DeepWaifu’s Name" />
                </Form.Item>
                <Text strong className="text14">
                  has agreed to provide a loving home for this waifu and promised to keep it safe.
                </Text>
                <Form.Item
                  name="email"
                  label=""
                  rules={[
                    {
                      required: true,
                      message: 'Please provide your email',
                    },
                    {
                      pattern: emailRegex,
                      message: 'Please provide valid email',
                    },
                  ]}
                >
                  <Input size="large" type="email" placeholder="Your Email" />
                </Form.Item>
                <Text className="text12">Your email will be kept private</Text>
              </Space>
            </Col>
          </Row>
        </Card>
      </Certificate>
      <MintButtonWrapper>
        <Space direction="vertical" size="middle">
          <div className="switch">
            <Space direction="horizontal" size="large">
              <Image className="solLogo" height={14} preview={false} src={'../img/solana-logo-red.svg'} />
              <Switch checkedChildren={`Pay ${priceSol} SOL`} unCheckedChildren="Pay with DAY" defaultChecked />
            </Space>
          </div>
          <Button type="primary" size="large" danger disabled={minting} loading={minting} onClick={handleMint}>
            Mint DeepWaifu NFT
          </Button>
          <NftCounter />
        </Space>
      </MintButtonWrapper>
    </Form>
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

const MintButtonWrapper = styled.div`
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
