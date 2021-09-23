import styled from 'styled-components';
import { Typography, Layout, Divider } from 'antd';

import { flamingo } from '../colors';

const { Footer } = Layout;
const { Text, Title } = Typography;

export default function SoldOut() {
  return (
    <Container>
      <Title className="red">
        ･ﾟ･(｡{'>'}ω{'<'}｡)･ﾟ･
      </Title>
      <Text className="text">SOLD OUT!</Text>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .red {
    font-size: 40px;
    color: ${flamingo};
  }
  .text {
    font-size: 46px;
    font-weight: bold;
    margin: 8px;
  }
`;
