import Bitcoin from 'bitcoinjs-lib';
import {TRANSACTION_FOUND} from './constants';
import { WALLET_IMPORT_SUCCESS, WALLET_TRACK_SYMBOL_SUCCESS } from "screens/Wallet/constants";
import { fork, all, take, select, takeEvery, call, put } from "redux-saga/effects";

import {BTCNodeRequest} from 'screens/Wallet/WalletInstances/BtcWallet';
import {timestampPriceApi} from './ethsagas';
import TxDecoder from './btc-tx-decoder';

export default function* btcTransactionsSagaWatcher() {
  yield all([
    takeEvery('FETCH_TRANSACTION_BTC', fetchTransaction),
  ]);
}


export function* fetchTransaction(action) {
  // if we have already found this transaction before,
  // don't go through the trouble of fetching all the information again
  const savedTransaction = yield select(state => state.transactions.transactions[action.id]);
  if (savedTransaction) {
    return;
  }

  const response = yield call(BTCNodeRequest, {
    method: 'gettransaction',
    params: [
      /* transaction id */
      action.id,
      /* include watch-only accounts */
      true
    ]
  });

  const json = yield response.json();

  const price = yield call(timestampPriceApi.makeRequest, `?fsym=BTC&tsyms=USD&ts=${action.raw.blocktime}`);

  const decoded = (new TxDecoder(json.result.hex, Bitcoin.networks.testnet)).decode();


  // the following is how we would get the sender's address
  const transaction = Bitcoin.TransactionBuilder.fromTransaction(Bitcoin.Transaction.fromHex(json.result.hex));
  const previousIn = transaction.tx.ins[0];
  const prevInTransactionHash = Buffer.from(previousIn.hash).reverse().toString('hex');

  const prevresponse = yield call(BTCNodeRequest, {
    method: 'getrawtransaction',
    params: [
      /* transaction id */
      prevInTransactionHash,
      /* should we decode the transaction? */
      true
    ]
  });

  const prevjson = yield prevresponse.json();
  const from = prevjson.result.vout[previousIn.index].scriptPubKey.addresses[0];
  const to = from === action.raw.address ? decoded.outputs[1].scriptPubKey.addresses[0] : action.raw.address;

  yield put({
    type: TRANSACTION_FOUND,
    transaction: {
      blockNumber: action.raw.blocktime,
      timeMined: action.raw.blocktime * 1000,
      isTrade: false,
      hash: action.id,
      from,
      to,
      value: action.raw.amount.toString(),
      priceAtTimeMined: action.raw.amount * price.BTC.USD,
      gasPrice: json.result.fee * -1
    }
  });
}
