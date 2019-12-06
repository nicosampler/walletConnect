import React from 'react';
import { useWeb3Context } from 'web3-react';
import Big from 'big.js';

import { DAI, CDAI } from '../contractsInfo';
import { tokenToNumber } from '../utils/math';

// 0xdd34095e53dE5F626028FCeB3B046d36e7FabE6b

export default props => {
  const context = useWeb3Context();
  const {
    contractsInstances: { dai, cDai },
    nonce
  } = props;

  const [balances, setBalances] = React.useState({
    dai: 0,
    cDai: 0,
    cDaiPrice: 0,
    cDaiUSD: 0,
    lockedDai: 0
  });

  function calcCDaiPrice(cDaiBalance, exchangeRate) {
    return new Big(cDaiBalance)
      .times(new Big(exchangeRate))
      .div(10 ** DAI.decimals)
      .div(10 ** CDAI.exchangeDecimals)
      .toFixed(Number(process.env.REACT_APP_DECIMALS_PRECISION));
  }

  React.useEffect(() => {
    async function getBalances() {
      //const account = context.account;
      const account = '0xdd34095e53dE5F626028FCeB3B046d36e7FabE6b';
      const resDaiBalance = await dai.methods.balanceOf(account).call();
      const resCDaiBalance = await cDai.methods.balanceOf(account).call();
      const resLockedDai = await cDai.methods
        .balanceOfUnderlying(account)
        .call();
      const resCDaiExchangeRate = await cDai.methods
        .exchangeRateCurrent()
        .call();

      setBalances({
        dai: tokenToNumber(resDaiBalance, DAI.decimals),
        cDai: tokenToNumber(resCDaiBalance, CDAI.decimals),
        lockedDai: tokenToNumber(resLockedDai, DAI.decimals),
        cDaiUSD: calcCDaiPrice(resCDaiBalance, resCDaiExchangeRate)
      });
    }

    getBalances();
  }, [context, setBalances, dai, cDai, nonce]);

  return (
    <div>
      <div>Current Nonce: {nonce}</div>
      <div>Dai Balance: {balances.dai}</div>
      <div>Dai Locked: {balances.lockedDai}</div>
      <br />
      <div>cDai Balance: {balances.cDai}</div>
      <div>cDai in USD: {balances.cDaiUSD}</div>
    </div>
  );
};
