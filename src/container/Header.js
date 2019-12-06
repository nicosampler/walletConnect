import React from 'react';
import styled from 'styled-components';
import WalletConnector from './WalletConnector';

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Header = props => (
  <ButtonsContainer>
    <WalletConnector />
  </ButtonsContainer>
);

export default Header;
