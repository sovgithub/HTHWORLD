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
        icon: require('assets/btc_icon.png'),
        colors: ['#F2A900', '#BD8401'],
        fullName: 'Bitcoin',
      };
    case 'HTH':
      return {
        image: require('assets/btc_logo.png'),
        icon: require('assets/btc_icon.png'),
        colors: ['#F2A900', '#BD8401'],
        fullName: 'Help The Homeless Coin',
    case 'ETH':
      return {
        image: require('assets/eth_logo.png'),
        icon: require('assets/eth_icon.png'),
        colors: ['#C99D66', '#99774D'],
        fullName: 'Ethereum',
      };
    case 'BOAR':
      return {
        image: require('assets/boar_logo.png'),
        icon: require('assets/boar_icon.png'),
        colors: ['#E5129A', '#AA0D72'],
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
      case 'LTC':
      case 'HTH': {
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
      case 'LTC':
      case 'HTH": {
        return 'testnet';
      }
      default:
        return 'test';
    }
  }
}
