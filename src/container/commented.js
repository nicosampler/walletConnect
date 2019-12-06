// const handleTransaction = async () => {
//   const accounts = await web3.eth.getAccounts();
//   const acc = accounts[0];
//   const MM = '0x76d88fb4fcb39B4b895Bfc4df0dCa252b9C7DC6B';
//   const value = web3.utils.toWei('1', 'ether');
//   const res = await web3.eth.sendTransaction({
//     from: acc,
//     to: MM,
//     value
//   });
//   console.log(res);
// };

// const getCTokenInfo = async cToken => {
//   comptroller.methods.markets(cToken).call(function(err, res) {
//     console.log(res);
//   });
// };

// const checkMembership = async cToken => {
//   const acc = await getDefaultAccount();

//   const cBAT = await comptroller.methods
//     .checkMembership(acc, cTokens.cBAT)
//     .call();

//   const cDAI = await comptroller.methods
//     .checkMembership(acc, cTokens.cDAI)
//     .call();

//   const cREP = await comptroller.methods
//     .checkMembership(acc, cTokens.cREP)
//     .call();

//   const cUSDC = await comptroller.methods
//     .checkMembership(acc, cTokens.cUSDC)
//     .call();

//   const cWBTC = await comptroller.methods
//     .checkMembership(acc, cTokens.cWBTC)
//     .call();

//   const cZRX = await comptroller.methods
//     .checkMembership(acc, cTokens.cZRX)
//     .call();

//   const cETH = await comptroller.methods
//     .checkMembership(acc, cTokens.cETH)
//     .call();

//   console.log({ cBAT, cDAI, cREP, cUSDC, cWBTC, cZRX, cETH });
// };

// const enableBorrowing = async () => {
//   const cTokensAddresses = [
//     cTokens.cBAT,
//     cTokens.cDAI,
//     cTokens.cETH,
//     cTokens.cREP,
//     cTokens.cUSDC,
//     cTokens.cWBTC,
//     cTokens.cZRX
//   ];
//   const from = await getDefaultAccount();
//   const res = comptroller.methods.enterMarkets(cTokensAddresses).send({ from });
//   console.log('Enable Borrowing TX:', res);
// };

// const supplyEth = async strValue => {
//   const from = await getDefaultAccount();
//   const value = web3.utils.toWei(strValue, 'ether');
//   const res = cEther.methods.mint().send({ from, value });
//   console.log(res);
// };

// const txWaitForConfirmations = txPromise => {
//   return new Promise((resolve, reject) => {
//     txPromise
//       .on('confirmation', confirmationNumber => {
//         if (confirmationNumber <= MIN_CONFIRMATIONS) {
//           console.log(
//             `Waiting for confirmation ${confirmationNumber} of ${MIN_CONFIRMATIONS}`
//           );
//         }
//         if (confirmationNumber === MIN_CONFIRMATIONS) {
//           resolve();
//         }
//       })
//       .on('error', reject);
//   });
// };
