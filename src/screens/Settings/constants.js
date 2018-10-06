export const TRADING_PAIR_USD = 'USD';
export const TRADING_PAIR_AUD = 'AUD';
export const UPDATE_TRADING_PAIR = 'UPDATE_TRADING_PAIR';
export const INITIALIZE_SETTINGS = 'INITIALIZE_SETTINGS';
export const SETTINGS_STORAGE_KEY = '@HTHWORLD:settings';

export const SUPPORTED_TRADING_PAIRS = [
  {
    name: TRADING_PAIR_USD,
    symbol: '$',
    image: require('assets/usd.png')
  },
  {
    name: TRADING_PAIR_AUD,
    symbol: '$',
    image: require('assets/aud.png')
  }
];
