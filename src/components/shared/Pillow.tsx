import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Typography, Card, Space, Button, Image, message } from 'antd';

import { flamingo } from '../colors';
import { apiService } from '../../services';
import { useWaifu } from '../../hooks';
import { sleep } from '../../utils';

const { Title, Text } = Typography;

export default function Pillow() {
  const { state } = useWaifu();
  const [loading, setLoading] = useState(false);
  const handleOrderIntent = useCallback(async () => {
    setLoading(true);
    try {
      const { checkoutUrl } = await apiService.createStripeCheckoutIntent({
        name: state.name || 'Waifu',
        image: state.waifu!,
      });

      window.open(checkoutUrl, '_blank');
    } catch (e) {
      message.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [state]);

  return (
    <PillowMockup>
      <Card bordered={false}>
        <Space direction="vertical" size="middle">
          <div>
            <Title className="titleFeaturesRed">ヽ(*・ω・)ﾉ</Title>
            <Title className="titleFeatures">Order Pillow</Title>
          </div>
          <PillowBase>
            <Image width={180} preview={false} src={'../img/pillow-base.png'} />
          </PillowBase>
          <PillowImage>
            <Image width={180} preview={false} src={state.waifuDataUrl || state.selfieDataUrl} />
          </PillowImage>
          <Text className="text14">
            Get your DeepWaifu printed on both sides of a 18"x18" pillow in full color. The pillows are soft yet
            durable, made from 100% spun polyester poplin fabric.
          </Text>
          <Text strong className="text14">
            Free shipment to Europe, USA, Canada, Japan
          </Text>
          <Button size="large" loading={loading} onClick={handleOrderIntent}>
            Order a pillow for $90!
          </Button>
        </Space>
      </Card>
    </PillowMockup>
  );
}

const PillowMockup = styled.div`
  position: relative;
  top: 0;
  left: 0;
  text-align: center;
  background: none;

  .ant-card-body {
    padding: 0 2em;
  }

  .ant-card {
    background: none;
  }
  .ant-btn {
    color: ${flamingo};
    border-color: black;
  }
  .ant-btn:hover {
    color: ${flamingo};
    border-color: ${flamingo};
  }
`;

const PillowBase = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;

const PillowImage = styled.div`
  position: absolute;
  top: 75px;
  left: 60px;
  mix-blend-mode: multiply;

  mask-image: url('../img/pillow-mask.png');
  mask-size: 180px;
  mask-repeat: no-repeat;
  mask-position: center;
`;
