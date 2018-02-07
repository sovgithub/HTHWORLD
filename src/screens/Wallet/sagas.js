import {
  all,
  takeEvery,
  takeLatest,
  call,
  take,
  put
} from 'redux-saga/effects';
import { initializeWallet } from './WalletInstances';
import {
  WALLET_CREATE_REQUESTING,
  WALLET_CREATE_SUCCESS,
  WALLET_CREATE_ERROR,
  WALLET_UPDATE_BALANCE_ERROR,
  WALLET_UPDATE_BALANCE_REQUESTING,
  WALLET_UPDATE_BALANCE_SUCCESS,
  WALLET_SEND_FUNDS_REQUESTING,
  WALLET_SEND_FUNDS_SUCCESS,
  WALLET_SEND_FUNDS_ERROR
} from './constants';

const wallets = {
  /*
    <publicAddress>: Wallet instance
  */
};

async function createWallet(symbol, mnemonicString) {
  const wallet = initializeWallet(symbol, true, mnemonicString);
  const balance = await wallet.getBalance();
  const publicAddress = await wallet.getPublicAddress();
  wallets[publicAddress] = wallet;

  return {
    symbol,
    balance: Number(balance.toString()),
    publicAddress
  };
}

async function sendFunds(fromPublicAddress, toPublicAddress, amount) {
  const response = await wallets[fromPublicAddress].send(
    amount,
    toPublicAddress
  );
  console.log(response);
  return response;
}

async function getBalance(publicAddress) {
  const balance = await wallets[publicAddress].getBalance();
  console.log(balance);

  return {
    publicAddress,
    balance: Number(balance.toString())
  };
}

function* createWalletFlow(action) {
  try {
    const { symbol, mnemonicString } = action;

    const payload = yield call(createWallet, symbol, mnemonicString);

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

function* sendFundsFlow(action) {
  try {
    const { fromPublicAddress, toPublicAddress, amount } = action;

    const request = yield call(
      sendFunds,
      fromPublicAddress,
      toPublicAddress,
      amount
    );

    // refetch balance or keep an eye on the status of the request.
  } catch (error) {
    console.log(error);

    yield put({
      type: WALLET_SEND_FUNDS_ERROR,
      error
    });
  }
}

function* updateBalanceFlow(action) {
  try {
    const { publicAddress } = action;
    console.log('hey');

    const payload = yield call(getBalance, publicAddress);

    yield put({
      type: WALLET_UPDATE_BALANCE_SUCCESS,
      payload
    });
  } catch (error) {
    console.log(error);

    yield put({
      type: WALLET_UPDATE_BALANCE_ERROR,
      error
    });
  }
}

export default function* walletSagaWatcher() {
  yield all([
    takeLatest(WALLET_CREATE_REQUESTING, createWalletFlow),
    takeLatest(WALLET_UPDATE_BALANCE_REQUESTING, updateBalanceFlow),
    takeLatest(WALLET_SEND_FUNDS_REQUESTING, sendFundsFlow)
  ]);
}
