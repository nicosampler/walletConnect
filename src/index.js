import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Web3 from 'web3';

import theme from './theme';
import Web3Provider from 'web3-react';
import App from './container/App';
import * as serviceWorker from './serviceWorker';
import connectors from './ethConnectors';
import GlobalStyle from './GlobalStyle';

import 'antd/dist/antd.min.css';

ReactDOM.render(
  <Web3Provider connectors={connectors} libraryName="web3.js" web3Api={Web3}>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Web3Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
