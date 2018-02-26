/**
|--------------------------------------------------
| Init Saga
|--------------------------------------------------
*
*  This handles any inital data the app may need to fetch
*  from the server before the user actually can start
*  making requests.
*
*/

import { put } from 'redux-saga/effects';
import {
  INIT_ERROR,
  INIT_SUPPORTED_COINS,
  SUPPORTED_COINS_PRICING,
} from 'containers/App/constants';

export default function* initFlow() {
  try {
    yield put({
      type: INIT_SUPPORTED_COINS,
      coins: SUPPORTED_COINS_PRICING
    });
  } catch (e) {
    yield put({
      type: INIT_ERROR,
      errors: e.errors
    });
  }
}
