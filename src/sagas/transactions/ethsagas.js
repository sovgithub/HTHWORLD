import ethers from 'ethers';
import Config from 'react-native-config';
import {
  SYMBOL_ETH
} from "containers/App/constants";
import { AsyncStorage } from 'react-native';
import { channel, delay } from 'redux-saga';
import { fork, all, take, select, takeLatest, takeEvery, call, put } from "redux-saga/effects";
import { WALLET_IMPORT_SUCCESS, WALLET_TRACK_SYMBOL_SUCCESS } from "screens/Wallet/constants";
import { transactionsForWalletSelector } from "./selectors";
import { RequestLimiter, asyncMemoize, getHalfwayPoint, Queue } from './helpers';
import {
  BLOCK_ADDED_TO_QUEUE,
  BLOCK_NUMBER_STORAGE_KEY,
  SEARCH_FOR_INTERESTING_BLOCKS,
  INTERESTING_BLOCK_FOUND
} from './constants';
import { TYPE_SEND, TYPE_REQUEST } from 'screens/SendRequest/constants';

import {
  blockAddedToQueue,
  blockUpdated,
  interestingBlockFound,
  transactionFound,
  triggerSearchForInterestingBlocks
} from './actions';

import {bigNumberToEther} from 'lib/formatters';
import { getNetworkForCoin } from 'lib/currency-metadata';

import api from 'lib/api';

export const network = ethers.providers.networks[getNetworkForCoin(SYMBOL_ETH)];
export const provider = ethers.providers.getDefaultProvider(network);

export const actionBridgeChannel = channel();
export let lastCheckedBlockNumber = {};
export let fetchingBlockNumber = false;
export let transactionsBlockQueue = new Queue();
export let searchInRangeList = [];

export const getTransaction = asyncMemoize(provider.getTransaction.bind(provider));
export const getTransactionCount = asyncMemoize(provider.getTransactionCount.bind(provider));
export const getBlock = asyncMemoize(provider.getBlock.bind(provider));
export const getBalance = asyncMemoize(provider.getBalance.bind(provider));

export const timestampLimiter = new RequestLimiter(
  `${Config.EREBOR_ENDPOINT}/pricing_data/pricehistorical`,
  {numRequests: 15, perTimestamp: 1000},
  (response) => response.Type === 99
);


const HISTORICAL_PRICE_CACHE_KEY = 'HISTORICAL_PRICE_CACHE';
export async function timestampPriceApi(request) {
  const storedValue = await AsyncStorage.getItem(`${HISTORICAL_PRICE_CACHE_KEY}:${request}`);

  if (storedValue) {
    return JSON.parse(storedValue);
  }

  const response = await timestampLimiter.makeRequest(request);

  if (response) {
    await AsyncStorage.setItem(`${HISTORICAL_PRICE_CACHE_KEY}:${request}`, JSON.stringify(response));
  }

  return response;
}

export default function* ethTransactionsSagaWatcher() {
  yield all([
    fork(setupActionBridgeChannel),
    takeEvery([WALLET_IMPORT_SUCCESS, WALLET_TRACK_SYMBOL_SUCCESS], listenForWalletEvents), // takes publicAddress, symbol
    takeLatest(SEARCH_FOR_INTERESTING_BLOCKS, fetchHistoryEth),
  ]);
}

export function* setupActionBridgeChannel() {
  while (true) {
    const action = yield take(actionBridgeChannel);
    yield put(action);
  }
}

export function* listenForWalletEvents(action) {
  const { symbol, publicAddress } = action.payload;

  if (symbol === SYMBOL_ETH) {
    yield fork(fetchHistoryEth, { publicAddress });

    provider.on(publicAddress, () => {
      actionBridgeChannel.put(triggerSearchForInterestingBlocks(publicAddress));
    });
  }
}

// BLOCK SEARCH FUNCTIONS
export function* fetchHistoryEth(action) {
  const { publicAddress } = action;

  try {
    const response = yield call(api.get, `${Config.BOMBADIL_ENDPOINT}/transactions/${publicAddress}`);
    const cachedTransactions = yield select(
      state => transactionsForWalletSelector(state, SYMBOL_ETH, publicAddress)
    );
    for (const transaction of response.result.slice(cachedTransactions.length)) {

      const isFrom = transaction.from.toLowerCase() === publicAddress.toLowerCase();
      const isTo = transaction.to.toLowerCase() === publicAddress.toLowerCase();

      const price = yield call(timestampPriceApi, `?fsym=ETH&tsyms=USD&ts=${transaction.timestamp}`);

      const action = {
        type: isFrom ? TYPE_SEND : TYPE_REQUEST,
        date: Number(transaction.timestamp) * 1000,
        symbol: SYMBOL_ETH,
        from: isFrom ? publicAddress : transaction.from,
        to: isTo ? publicAddress : transaction.to,
        amount: transaction.ether,
        price: Number(transaction.ether) * price.ETH.USD,
        fiatTrade: false,
        details: transaction
      };

      yield put(transactionFound(action));
    }

  } catch(e) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('error encountered while fetching ETH transactions', e);
    }
  }
}


