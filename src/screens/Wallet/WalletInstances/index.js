import {SYMBOL_ETH} from '../constants';
import EthWallet from './EthWallet';

/*
  class Wallet {
  constructor(isMnemonic, initializer)
  getBalance()
  getPublicAddress()
  getPrivateKey()
  send(amount, toAddress)
  }
*/


export function initializeWallet(symbol, isMnemonic, mnemonicOrPrivateKey) {
  switch(symbol) {
  case SYMBOL_ETH: {
    return new EthWallet(isMnemonic, mnemonicOrPrivateKey);
  }
    // case SYMBOL_BTC: {
    //   return new BtcWallet(isMnemonic, mnemonicOrPrivateKey);
    // }
  default:
    throw Error(`there is no wallet generation method for ${symbol}`);
  }
}
