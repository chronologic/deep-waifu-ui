import styled from 'styled-components';
import { Typography, Layout, Row, Col } from 'antd';

import { flamingo, whitesmoke } from '../colors';
import { AppHeader } from '../shared';
import PillowMockup from './PillowMockup';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function OrderError() {
  return (
    <Layout>
      <AppHeader />
      <CustomContent>
        <Content>
          <Row className="mainTitle">
            <Title className="titleRed">
              ･ﾟ･(｡{'>'}ω{'<'}｡)･ﾟ･
            </Title>
            <Title>&nbsp;Oops, something went wrong with your order!</Title>
          </Row>
          <Row>
            <Col flex="auto" className="centerFlex">
              <Title>Please try again!</Title>
            </Col>
          </Row>
          <Row>
            <Col flex="auto" className="centerFlex pillowContainer">
              <PillowMockup />
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
  min-height: 100vh;

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
    margin-top: 4em;
    margin-bottom: 6em;
  }

  .note {
    font-size: 12px;
    font-style: italic;
  }
`;
