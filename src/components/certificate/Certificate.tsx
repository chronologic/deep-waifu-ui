import { useMemo } from 'react';
import styled from 'styled-components';
import { Typography, Space, Image, Row, Col, Card } from 'antd';

import { useWaifu } from '../../hooks';
import { flamingo, bluegrey } from '../colors';

const { Title, Text } = Typography;

interface IProps {
  className?: string;
  waifuDataUrl?: string;
  name?: string;
  id?: number;
  holder?: string;
}

export default function Certificate({ className, waifuDataUrl, name, id, holder }: IProps) {
  const { state } = useWaifu();

  const nameSize = useMemo(() => {
    const nameLength = name?.length || 0;
    if (nameLength <= 8) {
      return 'xl';
    } else if (nameLength <= 12) {
      return 'l';
    } else if (nameLength <= 16) {
      return 'm';
    } else if (nameLength <= 20) {
      return 's';
    } else {
      return 'xs';
    }
  }, [name]);

  return (
    <Overlay id="certificate" className={className}>
      <CertificateBase>
        <Card hoverable cover={<img height="451" alt="certificate" src={'../img/mockup-blank.jpg'} />}></Card>
      </CertificateBase>
      <CertificateImage>
        <Image width={256} preview={false} src={waifuDataUrl || state.waifuDataUrl} />
      </CertificateImage>
      <TextBlock>
        <Row className="flow">
          <Col flex="240px">
            <Space direction="vertical" className="space">
              <Title className="title30">Certificate of Adoption</Title>
              <Text className="titleJumbo">養子縁組証明書</Text>
              <Text strong className="text14">
                Let it be known to all that the holder of the DeepWaifu known by the name of
              </Text>
              <Text className={`titleName ${nameSize}`}>{name || state.name}</Text>
              <Text strong className="text14">
                has agreed to provide a loving home for this waifu and promised to keep it safe.
              </Text>
              <Text className="text10 first">
                <strong>Token ID:</strong> {String(id || state.id).padStart(4, '0')}
              </Text>
              <Text className="text10">
                <strong>Holder:</strong> {holder || state.holder}
              </Text>
            </Space>
          </Col>
        </Row>
      </TextBlock>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const CertificateBase = styled.div`
  text-align: center;
  position: relative;
  top: 0;
  left: 0;

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

  .space {
    width: 232px;
  }

  .titleName {
    font-family: Hachi Maru Pop;
    font-style: normal;
    font-weight: normal;
    line-height: 36px;
    color: ${flamingo};
    white-space: nowrap;

    &.xl {
      font-size: 28px;
    }
    &.l {
      font-size: 22px;
    }
    &.m {
      font-size: 18px;
    }
    &.s {
      font-size: 14px;
    }
    &.xs {
      font-size: 12px;
    }
  }
  .text14 {
    color: ${bluegrey};
  }

  .text10 {
    font-size: 10px;
    white-space: nowrap;
    display: inline-block;

    &.first {
      margin-top: 16px;
    }
  }
`;
