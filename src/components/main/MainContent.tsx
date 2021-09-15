import styled from 'styled-components';
import { Typography, Layout, Row, Col, Button, Image, Card } from 'antd';
import { TwitterCircleFilled, GithubFilled } from '@ant-design/icons';
import { flamingo, whitesmoke } from '../colors';

const { Content } = Layout;
const { Title, Text } = Typography;

export default function MainContent() {
  return (
    <Layout>
      <CustomContent>
        <Content>
          <TextBlock>
            <div className="head">
              <Text className="titleJumbo">ディープワイフについて</Text>
              <Title className="titleRed" id="overlay">
                About DeepWaifu
              </Title>
            </div>
            <Text className="text18">
              No Waifu... No Laifu! <br />
              Using deep neural networks this website can make the perfect Waifu just for you!
            </Text>
          </TextBlock>
          <Features>
            <Row>
              <Col span={8}>
                <Title className="titleFeaturesRed">(=^･ω･^=)</Title>
                <Title className="titleFeatures">Upload Selfie</Title>
                <Image preview={false} src={'../img/selfie/selfie12.jpg'} />
                <Text className="text16">Let a non-human artist draw your anime-style portrait.</Text>
              </Col>
              <Col span={8}>
                <Title className="titleFeaturesRed">(´｡• ω •｡`)</Title>
                <Title className="titleFeatures">Mint NFT</Title>
                <Image preview={false} src={'../img/waifu/waifu12.png'} />
                <Text className="text16">Trade exlusive, high-quality NFTs minted on the blockchain.</Text>
              </Col>
              <Col span={8}>
                <Title className="titleFeaturesRed">ヽ(*・ω・)ﾉ</Title>
                <Title className="titleFeatures">Order Pillow</Title>
                <Image preview={false} src={'../img/pillow.png'} />
                <Text className="text16">Get your Waifu printed in full color on both sides of a pillow.</Text>
              </Col>
            </Row>
            <br />
            <Button href="#upload" size="large">
              Meet your DeepWaifu
            </Button>
          </Features>
          <TextBlock>
            <div className="head">
              <Text className="titleJumbo">養子縁組証明書</Text>
              <Title className="titleRed" id="overlay">
                Certificate
              </Title>
            </div>
            <Text className="text18">
              If having an NFT of your Waifu is not enough, you can print your Certificate of Adoption.
            </Text>
          </TextBlock>
          <Certificate>
            <Card>
              <Image preview={false} src={'../img/mockup.jpg'} />
            </Card>
          </Certificate>
          <br />
          <Button href="#upload" size="large">
            Meet your DeepWaifu
          </Button>
          <TextBlock>
            <div className="head">
              <Text className="titleJumbo">私たちと連絡を取る</Text>
              <Title className="titleRed" id="overlay">
                Get in touch
              </Title>
            </div>
            <Text className="text18">Follow us on Twitter and Github to find out more about DeepWaifu.</Text>
          </TextBlock>
          <br />
          <a href="/">
            <TwitterCircleFilled className="iconSocial" />
          </a>
          <a href="/">
            <GithubFilled className="iconSocial" />
          </a>
        </Content>
      </CustomContent>
    </Layout>
  );
}

const CustomContent = styled.div`
  .ant-layout-content {
    text-align: center;
    max-width: 960px;
    margin: 0 auto;
  }
  .text18 {
    font-size: 18px;
  }
  .titleRed {
    color: ${flamingo};
  }
  .titleJumbo {
    font-family: 'Hachi Maru Pop', cursive;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 28px;
    color: rgba(38, 38, 38, 0.1);
    margin-top: 0.5em !important;
  }
  .head {
    position: relative;
  }
  #overlay {
    position: relative;
    top: -1.5em;
    left: 0;
    margin: 0;
  }
  .ant-btn {
    color: ${flamingo};
    border-color: black;
  }
  .ant-btn:hover {
    color: ${flamingo};
    border-color: ${flamingo};
  }
  .iconSocial {
    font-size: 36px;
    margin: 0 0.5em;
    color: black;
  }
`;

const Features = styled.div`
  margin: 3em auto 0 auto;
  padding-bottom: 3em;
  max-width: 960px;
  background: ${whitesmoke};

  .ant-col-8 {
    padding: 2em 4em;
  }
  .titleFeaturesRed {
    font-size: 16px;
    color: ${flamingo};
  }
  .titleFeatures {
    font-size: 16px;
  }
  .text16 {
    font-size: 16px;
  }
  .ant-image {
    margin: 1em 0;
  }
`;

const TextBlock = styled.div`
  margin: 6em 0 1em 0;
`;

const Certificate = styled.div`
  margin: 3em 0 1em;

  .ant-card-body {
    padding: 1em;
  }
`;
