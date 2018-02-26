/**
|--------------------------------------------------
| Root Reducer - combines all reducers throughout the app
|--------------------------------------------------

Usage:
import example from "path/to/Example/reducer";

Add to combineReducers:
combineReducers({
  example,
  ...
});

*/

import { combineReducers } from 'redux';
import app from 'containers/App/reducer';
import login from 'screens/Login/reducer';
import signup from 'screens/Signup/reducer';
import wallet from 'screens/Wallet/reducer';
import receiveModal from 'containers/ReceiveModal/reducer';
import sendModal from 'containers/SendModal/reducer';
import pricing from 'sagas/pricing/reducer';
import kyc from 'screens/Settings/reducer';

const rootReducer = combineReducers({
  app,
  login,
  signup,
  wallet,
  receiveModal,
  sendModal,
  pricing,
  kyc
});

export default rootReducer;
