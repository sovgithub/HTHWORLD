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

import { combineReducers } from "redux";
import login from "screens/Login/reducer";
import signup from "screens/Signup/reducer";
import wallet from "screens/Wallet/reducer";

const rootReducer = combineReducers({
  login,
  signup,
  wallet
});

export default rootReducer;
