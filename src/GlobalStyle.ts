import { createGlobalStyle } from 'styled-components';
import { flamingo } from './components/colors';

// weird hack to make prettier recognize css in createGlobalStyle and format it
const styled = {
  div: createGlobalStyle,
};

const GlobalStyle = styled.div`
  body,
  html {
    font-family: -apple-system, 'PingFangSC', BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
      'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-size: 10px;
    font-weight: 300;
    box-sizing: border-box;
    scroll-behavior: smooth;

    --antd-wave-shadow-color: ${flamingo};
  }

  h1.ant-typography,
  .ant-typography h1 {
    font-family: 'Dela Gothic One', cursive;
    font-weight: 500;
    font-size: 24px;
    margin-top: 0.5em !important;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
  .ant-layout {
    background: white;
  }
  .ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon {
    color: ${flamingo};
  }
  .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover {
    border-color: ${flamingo};
  }
  .ant-message-info .anticon,
  .ant-message-loading .anticon {
    color: ${flamingo};
  }
`;

export default GlobalStyle;
