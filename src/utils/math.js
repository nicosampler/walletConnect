import Big from 'big.js';

const decimalsPrecision = Number(process.env.REACT_APP_DECIMALS_PRECISION);

export const tokenToBigNumber = (value, decimals = 18) => {
  return new Big(value).div(Math.pow(10, decimals));
};

export const tokenToNumber = (value, decimals = 18) => {
  const divisor = Math.pow(10, decimals);
  const number = new Big(value);
  return number.div(divisor).toFixed(decimalsPrecision);
};

export const numberToToken = (value, decimals) => {
  const exponent = Math.pow(10, decimals);
  const number = new Big(value);

  return number.times(exponent).toString();
};
