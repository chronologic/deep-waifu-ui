import 'antd/dist/antd.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { MainHeader, MainContent, MainFooter } from './components';
import { GeneratorHeader } from './generator';
import { CertificateHeader } from './certificate';
import Providers from './Providers';
import GlobalStyle from './GlobalStyle';

const antIcon = <LoadingOutlined style={{ fontSize: 72 }} spin />;

class Wrapper extends React.Component {
  public render() {
    return (
      <Providers>
        <GlobalStyle />
        <Router>
          <App />
        </Router>
      </Providers>
    );
  }
}

function App() {
  return (
    <Suspense
      fallback={
        <LoaderWrapper>
          <Spin indicator={antIcon} />
        </LoaderWrapper>
      }
    >
      <Switch>
        <Route exact path="/certificate">
          <CertificateHeader />
          <MainContent />
          <MainFooter />
        </Route>
        <Route exact path="/generator">
          <GeneratorHeader />
          <MainContent />
          <MainFooter />
        </Route>
        <Route path="/">
          <MainHeader />
          <MainContent />
          <MainFooter />
        </Route>
      </Switch>
    </Suspense>
  );
}

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default Wrapper;
