/**
|--------------------------------------------------
| Login Saga
|--------------------------------------------------
*
*  This handles all side-effects for logging a user
*  in. Any token storage, anylitics tracking, or app
*  redirection can be triggered here.
*
*/

import { call, put } from "redux-saga/effects";
import { LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import api from "lib/api";

// TODO: abstract these into dev/prod files
const loginUrl = `https://smaugdev.hoardinvest.com/login/`;

// Handle logging in via the API
export async function loginApi(email_address, password) {
  try {
    const res = await api.post(loginUrl, { email_address, password });
    return { user_uid: res.user_uid };
  } catch (error) {
    throw error;
  }
}

export default function* loginFlow({ email_address, password }) {
  let currentUser;

  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    currentUser = yield call(loginApi, email_address, password);

    // .. we can also tell redux that our login was successful
    yield put({ type: LOGIN_SUCCESS });
  } catch (e) {
    currentUser = null;
    yield put({
      type: LOGIN_ERROR,
      errors: e.errors
    });
  }

  // return the currentUser for health and wealth
  return currentUser;
}
