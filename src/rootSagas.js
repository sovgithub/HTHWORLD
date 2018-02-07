/**
|--------------------------------------------------
| Root Saga - combines all sagas throughout the app
|--------------------------------------------------

Usage:
import example from "path/to/Example/sagas";

Add to rootSaga's all method:
yield all([example(), ...otherSagas]);

*/

import { all } from "redux-saga/effects";

import authSagas from "sagas/authentication";
import walletSagas from "screens/Wallet/sagas";

export default function* rootSaga() {
  yield all([authSagas(), walletSagas()]);
}
