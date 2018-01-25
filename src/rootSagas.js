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

import loginSagas from "./screens/Login/sagas";
import signupSagas from "./screens/Signup/sagas";

export default function* rootSaga() {
  yield all([loginSagas(), signupSagas()]);
}
