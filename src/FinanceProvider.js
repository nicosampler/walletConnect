// import React from 'react';
// import Web3 from 'web3';
// import { useWeb3Context } from 'web3-react';

// export const CompoundContext = React.createContext();
// CompoundContext.displayName = 'CompoundContext';

// async function getWeb3Instance(url, setContextValue) {
//   const contextValue = {
//     address: undefined,
//     isConnected: false,
//     web3: undefined
//   };

//   // Modern dapp browsers
//   if (window.ethereum) {
//     const web3 = new Web3(window.ethereum);

//     try {
//       await window.ethereum.enable();
//       const accounts = await web3.eth.getAccounts();

//       setContextValue({
//         address: accounts[0],
//         isEnabled: true,
//         web3
//       });
//     } catch {
//       setContextValue({ ...contextValue, web3 });
//       return;
//     }
//   }

//   // Legacy dapp browsers
//   if (window.web3) {
//     const web3 = new Web3(window.ethereum);

//     const accounts = await web3.eth.getAccounts();
//     let address;
//     if (accounts.length) {
//       address = accounts[0];
//     }

//     setContextValue({
//       address,
//       isEnabled: true,
//       web3
//     });
//   }

//   if (!window.ethereum || !window.web3) {
//     setContextValue({ ...contextValue, web3: new Web3(url) });
//   }
// }

// function CompoundProvider({ children }) {
//   const [contextValue, setContextValue] = React.useState();

//   const web3Context = useWeb3Context();
//   const web3Instance = web3Context.library;

//   React.useEffect(() => {
//     getWeb3Instance(setContextValue, web3Instance);
//   }, [web3Instance, setContextValue]);

//   return (
//     <EthereumContext.Provider value={contextValue}>
//       {children}
//     </EthereumContext.Provider>
//   );
// }

// export default CompoundProvider;
