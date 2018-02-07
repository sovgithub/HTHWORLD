import {
  WALLET_CREATE_REQUESTING,
  WALLET_UPDATE_BALANCE_REQUESTING,
  WALLET_SEND_FUNDS_REQUESTING
} from './constants';

export function createWallet(symbol, mnemonicString) {
  return {
    type: WALLET_CREATE_REQUESTING,
    symbol,
    mnemonicString
  };
}

export function updateBalance(publicAddress) {
  return {
    type: WALLET_UPDATE_BALANCE_REQUESTING,
    publicAddress
  };
}

export function sendFunds(fromPublicAddress, toPublicAddress, amount) {
  return {
    type: WALLET_SEND_FUNDS_REQUESTING,
    fromPublicAddress,
    toPublicAddress,
    amount
  };
}
