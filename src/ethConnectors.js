import { Connectors } from 'web3-react';
import WalletConnectApi from '@walletconnect/web3-subprovider';

const { InjectedConnector, WalletConnectConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });

const WalletConnect = new WalletConnectConnector({
  api: WalletConnectApi,
  bridge: 'https://bridge.walletconnect.org',
  supportedNetworkURLs: {
    1: process.env.REACT_APP_MAINNET_URL,
    4: process.env.REACT_APP_RINKEBY_URL
  },
  defaultNetwork: process.env.REACT_APP_DEFAULT_NETWORK_ID
});

export const connectorsNames = {
  MetaMask: 'MetaMask',
  WalletConnect: 'WalletConnect'
};

export default { MetaMask, WalletConnect };
