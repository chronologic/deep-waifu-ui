import styled from 'styled-components';
import { Typography, Layout, Row, Col } from 'antd';
import queryString from 'query-string';

import { flamingo, whitesmoke } from '../colors';
import { AppHeader, Confetti } from '../shared';
import PillowMockup from './PillowMockup';

const { Content } = Layout;
const { Title, Text } = Typography;

const { paymentId, orderId } = queryString.parse(window.location.search);

export default function OrderSuccess() {
  return (
    <Layout>
      <Confetti />
      <AppHeader />
      <CustomContent>
        <Content>
          <Row className="mainTitle">
            <Title className="titleRed">（*☆ω☆）</Title>
            <Title>&nbsp;Your DeepWaifu pillow is on its way!</Title>
          </Row>
          <Row>
            <Col flex="auto" className="centerFlex pillowContainer">
              <PillowMockup />
            </Col>
          </Row>
          <Row>
            <Col flex="auto" className="centerFlex orderDetails">
              <Text>
                <b>Your payment id:</b> {paymentId}
              </Text>
              <Text>
                <b>Your order id:</b> {orderId}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col flex="auto" className="centerFlex note">
              <Text>You can safely close this window now</Text>
            </Col>
          </Row>
        </Content>
      </CustomContent>
    </Layout>
  );
}

const CustomContent = styled.div`
  background: ${whitesmoke};

  .ant-layout-content {
    max-width: 960px;
    margin: 8em auto 4em auto;
    padding: 0 10px;
  }

  .mainTitle {
    display: flex;
    padding: 1em 0 2em;
  }
  .titleRed {
    color: ${flamingo};
  }

  .centerFlex {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pillowContainer {
    margin-top: 10em;
    margin-bottom: 12em;
    > div {
      transform: scale(2);
    }
  }

  .orderDetails {
    font-size: 16px;
    line-height: 32px;
    margin-bottom: 2em;
  }

  .note {
    font-size: 12px;
    font-style: italic;
  }
`;
