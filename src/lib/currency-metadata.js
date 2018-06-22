import Config from 'react-native-config';

export function getCoinMetadata(symbol) {
  switch (symbol) {
    case 'LTC':
      return {
        image: require('assets/ltc_logo.png'),
        fullName: 'Litecoin',
      };
    case 'DASH':
      return {
        image: require('assets/dash_logo.png'),
        fullName: 'Dash',
      };
    case 'XRP':
      return {
        image: require('assets/ripple_logo.png'),
        fullName: 'Ripple',
      };
    case 'BTC':
      return {
        image: require('assets/btc_logo.png'),
        fullName: 'Bitcoin',
      };
    case 'ETH':
      return {
        image: require('assets/eth_logo.png'),
        fullName: 'Ethereum',
      };
    case 'BOAR':
      return {
        image: require('assets/boar_logo.png'),
        fullName: 'BefOAR',
      };
    default:
      return {
        image: null,
        fullName: '',
      };
  }
}

export function getNetworkForCoin(symbol) {
  if (Config.CURRENCY_NETWORK_TYPE === 'main') {
    switch (symbol) {
      case 'ETH':
      case 'BOAR': {
        return 'homestead';
      }
      case 'BTC':
      case 'LTC': {
        return 'mainnet';
      }
      default:
        return 'test';
    }
  } else {
    switch (symbol) {
      case 'ETH':
      case 'BOAR': {
        return 'ropsten';
      }
      case 'BTC':
      case 'LTC': {
        return 'testnet';
      }
      default:
        return 'test';
    }
  }
}
