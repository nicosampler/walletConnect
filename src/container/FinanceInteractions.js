import React from 'react';
import { useWeb3Context } from 'web3-react';
import Big from 'big.js';
import CPK from 'contract-proxy-kit';

import { CDAI, DAI } from '../contractsInfo';
import Form from './Form';

const MAX_WEI =
  '115792089237316195423570985008687907853269984665640564039457584007913129639935';
const MIN_CONFIRMATIONS = 3;

const txWaitForConfirmations = txPromise => {
  return new Promise((resolve, reject) => {
    txPromise
      .on('confirmation', confirmationNumber => {
        if (confirmationNumber <= MIN_CONFIRMATIONS) {
          console.log(
            `Waiting for confirmation ${confirmationNumber} of ${MIN_CONFIRMATIONS}`
          );
        }
        if (confirmationNumber === MIN_CONFIRMATIONS) {
          resolve();
        }
      })
      .on('error', reject);
  });
};

const Main = props => {
  const {
    nonce,
    setNonce,
    contractsInstances: { dai, cDai }
  } = props;
  const context = useWeb3Context();

  const supplySai = async strValue => {
    const { account, library: web3 } = context;
    const bNValue = new Big(strValue).times(10 ** DAI.decimals);
    console.log(`supply value: ${bNValue}`);

    const cpk = await CPK.create({ web3 });
    console.log('cpk.address:', cpk.address);
    const transactions = [];

    const resProxyDaiBalance = await dai.methods.balanceOf(cpk.address).call();
    const bNProxyDaiBalance = new Big(resProxyDaiBalance).times(
      10 ** DAI.decimals
    );

    async function supplyDai() {
      // verify if cDai is allowed to act the owner for DAI
      console.log('Supplying Dai');
      const res = await dai.methods.allowance(cpk.address, CDAI.address).call();
      if (bNValue > new Big(res)) {
        transactions.push({
          operation: CPK.CALL,
          to: DAI.address,
          value: 0,
          data: dai.methods.approve(CDAI.address, MAX_WEI).encodeABI()
        });
      }

      // const supplyParameter = web3.eth.abi.encodeParameter(
      //   'uint256',
      //   bNValue.toString()
      // );

      // transactions.push({
      //   operation: CPK.CALL,
      //   to: CDAI.address,
      //   value: 0,
      //   data: cDai.methods.mint(supplyParameter).encodeABI()
      // });

      const xx = cpk.execTransactions(transactions);
      console.log(xx);

      // .on('transactionHash', function(hash) {
      //   console.log('hash: ', hash);
      // })
      // .on('confirmation', function(confirmationNumber, receipt) {
      //   console.log('confirmationNumber: ', confirmationNumber);
      // })
      // .on('receipt', function(receipt) {
      //   console.log('receipt: ', receipt);
      // })
      // .on('error', function(error, receipt) {
      //   console.log('error: ', error);
      // });
    }

    if (bNValue > bNProxyDaiBalance) {
      console.log(
        `proxy balance does not have enough founds: ${bNProxyDaiBalance}`
      );
      const transferDaiPromise = dai.methods
        .transfer(cpk.address, bNValue.toString())
        .send({ from: account });
      await txWaitForConfirmations(transferDaiPromise);
      supplyDai();
    } else {
      supplyDai();
    }
  };

  return (
    <div nonce={nonce}>
      <Form onSupplySai={supplySai} />
    </div>
  );
};

export default Main;
