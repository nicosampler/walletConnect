import React from 'react';
import styled from 'styled-components';
import { useWeb3Context } from 'web3-react';
//import isEmpty from 'lodash/fp/isEmpty';

import Header from './Header';
//import AccountInfo from './AccountInfo';
//import FinanceInteractions from './FinanceInteractions';
import CErc20Abi from '../abis/CErc20.json';
import { CDAI, DAI } from '../contractsInfo';
import { connectorsNames } from '../ethConnectors';

const GridLayout = styled.div`
  display: grid;
  grid-auto-rows: 35px 1fr 35px;
  grid-template-columns: 400px auto;
  grid-template-areas:
    'header header'
    'main main'
    'footer footer';
  grid-column-gap: 3px;
  grid-row-gap: 3px;
  width: 100vw;
  height: 100vh;

  .header {
    grid-area: header;
  }

  .main {
    grid-area: main;
  }

  .footer {
    grid-area: footer;
  }
`;

function App(props) {
  const context = useWeb3Context();
  //const [nonce, setNonce] = React.useState();
  //const [contractsInstances, setContractsInstances] = React.useState();

  // React.useEffect(() => {
  //   context.setFirstValidConnector(['MetaMask' /* , 'Infura' */]);
  //   if (context.active) {
  //     context.library.eth.getTransactionCount(context.account).then(setNonce);
  //     const web3 = context.library;
  //     setContractsInstances({
  //       dai: new web3.eth.Contract(CErc20Abi, DAI.address),
  //       cDai: new web3.eth.Contract(CErc20Abi, CDAI.address)
  //     });
  //   }
  // }, [context, setContractsInstances]);

  function getMainSection() {
    if (!context.active && !context.error) {
      return <div>Connect your wallet</div>;
    } else if (context.error) {
      return <div>Error...</div>;
    } else {
      return <div>Connected</div>;
    }
  }

  return (
    <GridLayout>
      <div className="header">
        <Header />
      </div>
      <div className="main">{getMainSection()}</div>
      <div className="footer">footer</div>
    </GridLayout>
  );
}

export default App;
