import Config from 'react-native-config';
import {
  INIT_REQUESTING,
  SYMBOL_ETH,
  SYMBOL_BOAR,
  SYMBOL_BTC,
} from "containers/App/constants";
import { AsyncStorage } from 'react-native';
import { channel, delay } from 'redux-saga';
import { fork, all, take, select, takeLatest, takeEvery, call, put } from "redux-saga/effects";
import { TYPE_SEND, TYPE_REQUEST } from 'screens/SendRequest/constants';
import {
  CANCEL_CONTACT_TRANSACTION_REQUESTING,
  CANCEL_CONTACT_TRANSACTION_SUCCESS,
  CANCEL_CONTACT_TRANSACTION_FAILURE,
} from './constants';

import { recordContactTransaction } from './actions';

import { bigNumberToEther } from 'lib/formatters';
import { getNetworkForCoin } from 'lib/currency-metadata';
import { INIT_USER } from 'containers/User/constants';
import { usernameSelector } from 'containers/User/selectors';

import api from 'lib/api';

import { network, provider } from './ethsagas';


export default function* contactTransactionsSagaWatcher() {
  yield all([
    takeLatest(INIT_USER, fetchContactTransactions),
    takeEvery(CANCEL_CONTACT_TRANSACTION_REQUESTING, cancelContactTransaction),
  ]);
}

export function* fetchContactTransactions(action) {
  if (action.user && action.user.uid) {
    const endpoint = `${Config.EREBOR_ENDPOINT}/users/${ action.user.uid }/contact_transactions`;
    try {
      const response = yield call(api.get, endpoint);
      console.log('response', response);
      if (response && response.length) {
        for (const transaction of response) {

          const username = yield select(state => usernameSelector(state));
          const type = transaction.transaction_type === 'send' ? TYPE_SEND: TYPE_REQUEST;
          const to = type === TYPE_SEND ? transaction.recipient : username;
          const from = type === TYPE_SEND ? username : transaction.recipient;
          yield put(recordContactTransaction({
            amount: transaction.amount,
            date: transaction.created * 1000,
            symbol: transaction.currency,
            type,
            to,
            from,
            details: transaction
          }));
        }
      }
    } catch (e) {
      console.log('contact oops', e, e.errors)
    }
  }
}

export function* cancelContactTransaction(action) {
  try {
    const endpoint = `${Config.EREBOR_ENDPOINT}/contacts/transaction_confirmation/${action.transaction.details.uid}`;
    console.log('hey cancel this contact transaction', action);
    const body = {confirmed: false, transaction_hash: null};
    console.log(JSON.stringify(body));
    const response = yield call(api.post, endpoint, body);
    console.log('contact cancel response', response);
    if (response.success) {
      yield put({
        type: CANCEL_CONTACT_TRANSACTION_SUCCESS,
        transaction: action.transaction
      });
    } else {
      yield put({
        type: CANCEL_CONTACT_TRANSACTION_FAILURE,
        transaction: action.transaction
      });
    }
  } catch (e) {
    if (__DEV__) {
      console.log('error cancelling contact transaction', e, e.errors); // eslint-disable-line no-console
    }

    yield put({
      type: CANCEL_CONTACT_TRANSACTION_FAILURE,
      transaction: action.transaction
    });
  }
}

//
// export function* fulfillContactTransaction(action) {
//   const endpoint = `${Config.EREBOR_ENDPOINT}/contacts/transaction_confirmation/${action.transaction.details.uid}`;
//   // { confirmed: true, transactionHash: x }
// }
//
