import React from 'react';
import { useWeb3Context } from 'web3-react';
import WalletConnectQRCodeModal from '@walletconnect/qrcode-modal';
import { Modal, Button } from 'antd';

import { connectorsNames } from '../ethConnectors';

const WalletConnector = props => {
  const context = useWeb3Context();
  const [isModalOpen, setModalOpen] = React.useState();

  const openConnectionModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const unsetConnector = () => context.unsetConnector();
  const onSelectedWallet = c => {
    setModalOpen(false);
    context.setConnector(c);
  };
  const setMetaMaskConnector = () => onSelectedWallet(connectorsNames.MetaMask);
  const setWalletConnectConnector = () =>
    onSelectedWallet(connectorsNames.WalletConnect);

  React.useEffect(() => {
    if (
      context.active &&
      context.connectorName === connectorsNames.WalletConnect
    ) {
      if (!context.account) {
        WalletConnectQRCodeModal.open(
          context.connector.walletConnector.uri,
          () => {}
        );
      } else {
        try {
          WalletConnectQRCodeModal.close();
        } catch {}
      }
    }
  }, [context]);

  const walletSelectionModal = (
    <Modal
      title="Wallet Selection"
      visible={isModalOpen}
      onCancel={closeModal}
      footer={null}>
      <div>
        <Button onClick={setMetaMaskConnector}>MetaMask</Button>
        <Button onClick={setWalletConnectConnector}>WalletConnect</Button>
      </div>
    </Modal>
  );

  //-----------------
  // render logic
  //-----------------
  if (context.error) {
    return (
      <div>
        There was an error trying to connect with your wallet
        <Button onClick={unsetConnector}>x</Button>
      </div>
    );
  }

  if (!context.active) {
    return (
      <div>
        <Button onClick={openConnectionModal} disabled={isModalOpen}>
          Connect
        </Button>
        {walletSelectionModal}
      </div>
    );
  }

  if (context.active && context.account) {
    return <div>Connected to {context.connectorName}</div>;
  }
};

export default WalletConnector;
