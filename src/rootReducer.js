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
import user from "screens/User/reducer";

const rootReducer = combineReducers({
  user,
  login,
  signup
});

export default rootReducer;
