/**
|--------------------------------------------------
| Signup Saga
|--------------------------------------------------
* 
*  This handles all side-effects for new user signup.
*  Any token storage, anylitics tracking, or app
*  redirection can be triggered here.
*  
*/

import { call, put, takeLatest } from "redux-saga/effects";
import { handleApiErrors } from "lib/api-errors";
import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";

// In order to trigger navigation outside of
// the parent component, we'll use this service.
import NavigatorService from "../../navigator";

// TODO: abstract these into dev/prod files
const signupUrl = `https://smaugdev.hoardinvest.com/users/`;

function signupApi(
  first_name,
  last_name,
  phone_number,
  email_address,
  password
) {
  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      email_address: email_address,
      password: password
    })
  })
    .then(handleApiErrors)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });
}

// This will be run when the SIGNUP_REQUESTING
// Action is found by the watcher
function* signupFlow(action) {
  try {
    const {
      first_name,
      last_name,
      phone_number,
      email_address,
      password
    } = action;

    // pulls "calls" to our signupApi with our email and password
    // from our dispatched signup action, and will PAUSE
    // here until the API async function, is complete!
    const response = yield call(
      signupApi,
      first_name,
      last_name,
      phone_number,
      email_address,
      password
    );

    // when the above api call has completed it will "put",
    // or dispatch, an action of type SIGNUP_SUCCESS with
    // the successful response.
    yield put({ type: SIGNUP_SUCCESS, response });

    // redirect the user to the logged in dashboard
    NavigatorService.navigate("Login");
  } catch (error) {
    // TODO: return nice-looking errors to the user
    // yield put({ type: LOGIN_ERROR, error });
  }
}

// Watches for the SIGNUP_REQUESTING action type
// When it gets it, it will call signupFlow()
// WITH the action we dispatched
function* signupWatcher() {
  // takeLatest() takes the LATEST call of that action and runs it
  // if we we're to use takeEvery, it would take every single
  // one of the actions and kick off a new task to handle it
  // CONCURRENTLY!!!
  yield takeLatest(SIGNUP_REQUESTING, signupFlow);
}

export default signupWatcher;
