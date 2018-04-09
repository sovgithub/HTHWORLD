import {
  WALLET_INITIALIZE_PASSPHRASE,

  WALLET_TRACK_SYMBOL,
  WALLET_TRACK_SYMBOL_SUCCESS,
  WALLET_TRACK_SYMBOL_FAILURE,

  WALLET_IMPORT,
  WALLET_IMPORT_SUCCESS,
  WALLET_IMPORT_FAILURE,

  WALLET_UPDATE_BALANCE_REQUESTING,
  WALLET_SEND_FUNDS_REQUESTING
} from "./constants";

export function initializeMnemonic(mnemonicPhrase) {
  return {
    type: WALLET_INITIALIZE_PASSPHRASE,
    mnemonicPhrase
  };
}

export function trackSymbol(symbol) {
  return {
    type: WALLET_TRACK_SYMBOL,
    symbol
  };
}

export function trackSymbolSuccess(payload) {
  return {
    type: WALLET_TRACK_SYMBOL_SUCCESS,
    payload
  };
}

export function trackSymbolFailure(error) {
  return {
    type: WALLET_TRACK_SYMBOL_FAILURE,
    error
  };
}

export function importWallet(symbol, importType, seed) {
  return {
    type: WALLET_IMPORT,
    symbol,
    importType,
    seed
  };
}

export function importWalletSuccess(payload) {
  return {
    type: WALLET_IMPORT_SUCCESS,
    payload
  };
}

export function importWalletFailure(error) {
  return {
    type: WALLET_IMPORT_FAILURE,
    error
  };
}









export function updateBalance(id) {
  return {
    type: WALLET_UPDATE_BALANCE_REQUESTING,
    id
  };
}

export function sendFunds(fromId, toPublicAddress, amount) {
  return {
    type: WALLET_SEND_FUNDS_REQUESTING,
    fromId,
    toPublicAddress,
    amount
  };
}
