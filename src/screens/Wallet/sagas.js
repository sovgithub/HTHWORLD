import { AsyncStorage } from "react-native";
import { all, takeLatest, takeEvery, call, put } from "redux-saga/effects";
import { initializeWallet } from "./WalletInstances";
import { INIT_REQUESTING } from "containers/App/constants";
import {
  WALLET_CREATE_REQUESTING,
  WALLET_CREATE_SUCCESS,
  WALLET_CREATE_ERROR,
  WALLET_RECOVER_REQUESTING,
  WALLET_UPDATE_BALANCE_ERROR,
  WALLET_UPDATE_BALANCE_REQUESTING,
  WALLET_UPDATE_BALANCE_SUCCESS,
  WALLET_SEND_FUNDS_REQUESTING,
  WALLET_SEND_FUNDS_ERROR
} from "./constants";
import { recoverWallet as recoverWalletAction } from "./actions";
import {store} from '../../App';

const WALLET_STORAGE_KEY = "wallets/storage";

const wallets = {
  /*
    <publicAddress>: Wallet instance
  */
};

export async function getWallets() {
  const wallets = await AsyncStorage.getItem(WALLET_STORAGE_KEY);
  return JSON.parse(wallets);
}

export async function storeWallets() {
  let keysBySymbol = {};
  const keys = Object.keys(wallets);
  for (let i = 0; i < keys.length; i++) {
    const wallet = wallets[keys[i]];
    const symbol = wallet.symbol;
    const privateKey = await wallet.getPrivateKey();
    const existingKeys = keysBySymbol[symbol] || [];
    keysBySymbol = {
      ...keysBySymbol,
      [symbol]: [...existingKeys, privateKey]
    };
  }

  return await AsyncStorage.setItem(
    WALLET_STORAGE_KEY,
    JSON.stringify(keysBySymbol)
  );
}

async function commonWalletInitializationActions(wallet) {
  const symbol = wallet.symbol;
  const balance = await wallet.getBalance();
  const publicAddress = await wallet.getPublicAddress();
  wallets[publicAddress] = wallet;

  await storeWallets();

  return {
    symbol,
    balance: Number(balance.toString()),
    publicAddress
  };
}

async function createWallet(symbol, mnemonicString) {
  return commonWalletInitializationActions(initializeWallet(symbol, true, mnemonicString));
}

async function recoverWallet(symbol, privateKey) {
  return commonWalletInitializationActions(initializeWallet(symbol, false, privateKey));
}

async function sendFunds(fromPublicAddress, toPublicAddress, amount) {
  const response = await wallets[fromPublicAddress].send(
    amount,
    toPublicAddress
  );
  return response;
}

async function getBalance(publicAddress) {
  const balance = await wallets[publicAddress].getBalance();

  return {
    publicAddress,
    balance: Number(balance.toString())
  };
}

function* initWalletsFlow(action) {
  const keysBySymbol = yield call(getWallets);

  if (keysBySymbol) {
    const symbols = Object.keys(keysBySymbol);
    for (let symbolIndex = 0; symbolIndex < symbols.length; symbolIndex++) {
      const symbol = symbols[symbolIndex];
      const keys = keysBySymbol[symbol];
      for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
        const privateKey = keys[keyIndex];
        yield put(recoverWalletAction(symbol, privateKey));
      }
    }
  }
}

function* commonWalletInitializationFlow (creationFunction, symbol, seed) {
  try {
    const payload = yield call(creationFunction, symbol, seed);
    const { publicAddress } = payload;


    if (symbol === 'ETH') {
      const wallet = wallets[publicAddress];

      wallet.listenForBalanceChange((balance) => {
        store.dispatch({
          type: WALLET_UPDATE_BALANCE_SUCCESS,
          payload: {
            publicAddress,
            balance: Number(balance.toString())
          }
        });
      });
    }

    yield put({
      type: WALLET_CREATE_SUCCESS,
      payload
    });
  } catch (error) {
    yield put({
      type: WALLET_CREATE_ERROR,
      error
    });
  }
}

function* createWalletFlow(action) {
  const { symbol, mnemonicString } = action;
  yield call(commonWalletInitializationFlow, createWallet, symbol, mnemonicString);
}

function* recoverWalletFlow(action) {
  const { symbol, privateKey } = action;
  yield call(commonWalletInitializationFlow, recoverWallet, symbol, privateKey);
}

function* sendFundsFlow(action) {
  try {
    const { fromPublicAddress, toPublicAddress, amount } = action;

    yield call(sendFunds, fromPublicAddress, toPublicAddress, amount);

    // refetch balance or keep an eye on the status of the request.
  } catch (error) {
    yield put({
      type: WALLET_SEND_FUNDS_ERROR,
      error
    });
  }
}

function* updateBalanceFlow(action) {
  try {
    const { publicAddress } = action;

    const payload = yield call(getBalance, publicAddress);

    yield put({
      type: WALLET_UPDATE_BALANCE_SUCCESS,
      payload
    });
  } catch (error) {
    yield put({
      type: WALLET_UPDATE_BALANCE_ERROR,
      error
    });
  }
}

export default function* walletSagaWatcher() {
  yield all([
    takeLatest(INIT_REQUESTING, initWalletsFlow),
    takeLatest(WALLET_CREATE_REQUESTING, createWalletFlow),
    takeEvery(WALLET_RECOVER_REQUESTING, recoverWalletFlow),
    takeLatest(WALLET_UPDATE_BALANCE_REQUESTING, updateBalanceFlow),
    takeLatest(WALLET_SEND_FUNDS_REQUESTING, sendFundsFlow)
  ]);
}
