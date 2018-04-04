import { utils } from 'ethers';

export const limitNumber = PRECISION => value =>
  Number(value.toFixed(PRECISION));

export const limitDecimalString = PRECISION => value => {
  const halves = value.split('.');
  const [integers, decimals] = halves;
  if (halves.length === 2) {
    return `${integers}.${decimals.substring(0, PRECISION)}`;
  } else {
    return integers;
  }
};

export const formatDecimalInput = PRECISION => {
  const limiter = limitDecimalString(PRECISION);
  return value => {
    const matches = String(value).match(/(\d+)?(\.)?(\d+)?/);
    return limiter(matches ? matches[0] : '');
  };
};

export const bigNumberToEther = bigNumber =>
  utils.formatEther(bigNumber.toString());
