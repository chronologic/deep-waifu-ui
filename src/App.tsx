import 'antd/dist/antd.css';
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import { LandingPage } from './components';
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
        <Route path="*">
          <LandingPage />
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
