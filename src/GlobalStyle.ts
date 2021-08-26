import { createGlobalStyle } from 'styled-components';

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
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

export default GlobalStyle;
