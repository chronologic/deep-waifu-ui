import styled from 'styled-components';
import { Typography, Layout, Row, Col } from 'antd';

import { flamingo, whitesmoke } from '../colors';
import { useWaifu } from '../../hooks';
import { AppHeader, KaomojiLoader } from '../shared';
import { OrderPillow } from '../pillow';
import MintForm from './MintForm';

const { Content } = Layout;
const { Title } = Typography;

export default function GeneratorHeader() {
  const { state } = useWaifu();
  const loading = !!state.selfieDataUrl && !state.waifuDataUrl;

  return (
    <Layout>
      <AppHeader />
      {loading && <KaomojiLoader message="We are generating your Waifu" />}
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
              <MintForm />
            </Col>
            <Col flex="auto">
              <OrderPillow />
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
