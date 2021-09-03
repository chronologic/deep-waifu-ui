import styled from 'styled-components';
import { Typography, Layout, Divider } from 'antd';

const { Footer } = Layout;
const { Text } = Typography;

export default function MainFooter() {
  return (
    <Layout>
      <CustomFooter>
        <Footer>
          <Divider />
          <Text type="secondary">Terms of Service • Privacy Statement</Text>
        </Footer>
      </CustomFooter>
    </Layout>
  );
}

const CustomFooter = styled.div`
  .ant-layout-footer {
    text-align: center;
    background: white;
    max-width: 960px;
    margin: 0 auto 2em;
    padding: 0 1em;
  }
`;
