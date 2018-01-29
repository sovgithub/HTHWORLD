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

import { take, fork, cancel, call, put, cancelled } from "redux-saga/effects";
import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";
import api from "lib/api";

// In order to trigger navigation outside of
// the parent component, we'll use this service.
import NavigatorService from "../../navigator";

// Modify User state
import { setUser, unsetUser } from "screens/User/actions";
import { USER_UNSET } from "screens/User/constants";

// TODO: abstract these into dev/prod files
const loginUrl = `https://smaugdev.hoardinvest.com/login/`;

// Handle logging in via the API
async function loginApi(email_address, password) {
  try {
    const res = await api.post(loginUrl, { email_address, password });
    return { user_uid: res.user_uid };
  } catch (error) {
    throw error;
  }
}

// Handle logging in via the API
// TODO: abstract these into dev/prod files
const logoutUrl = `https://smaugdev.hoardinvest.com/logout/`;
async function logoutApi() {
  try {
    return api.post(logoutUrl);
  } catch (error) {
    throw error;
  }
}

function* logout() {
  // dispatches the USER_UNSET action
  yield call(logoutApi);
  yield put(unsetUser());
  // TODO: remove user session data from Async Storage
  NavigatorService.navigate("Login");
}

function* loginFlow(email_address, password) {
  let currentUser;

  try {
    // try to call to our loginApi() function.  Redux Saga
    // will pause here until we either are successful or
    // receive an error
    currentUser = yield call(loginApi, email_address, password);

    // tell Redux to set currentUser, this is non blocking so...
    yield put(setUser(currentUser));

    // .. we can also tell redux that our login was successful
    yield put({ type: LOGIN_SUCCESS });

    // TODO: store the current user & session data from currentUser in Async Storage

    // redirect the user to the logged in dashboard
    NavigatorService.navigateDeep([
      { routeName: "Menu" },
      { routeName: "Dashboard" }
    ]);
  } catch (error) {
    // TODO: return nice-looking errors to the user
    // yield put({ type: LOGIN_ERROR, error });
  } finally {
    // No matter what, if our `forked` `task` was cancelled
    // we will then just redirect them to login
    if (yield cancelled()) {
      // redirect to the logged out screen
      NavigatorService.navigate("Login");
    }
  }

  // return the currentUser for health and wealth
  return currentUser;
}

// Our watcher (saga).  It will watch for all login-related actions.
function* loginWatcher() {
  // Generators halt execution until their next step is ready/occurring
  while (true) {
    // ... and in this first it sees a yield statement which
    // pauses the loop.  It will sit here and WAIT for this action.
    //
    // yield take(ACTION) just says, when our generator sees the ACTION
    // it will pull from that ACTION's payload that we send up, its
    // email and password.  ONLY when this happens will the loop move
    // forward...
    const { email_address, password } = yield take(LOGIN_REQUESTING);
    // ... and pass the email and password to our loginFlow() function
    // the fork() method spins up another "process" that will deal with
    // handling the loginFlow's execution in the background!
    // Think, "fork another process".
    //
    // It also passes back to us, a reference to this forked task
    // which is stored in our const task here.  We can use this to manage
    // the task.
    //
    // However, fork() does not block our loop.  It's in the background
    // therefore as soon as our loop executes this it mores forward...
    const task = yield fork(loginFlow, email_address, password);

    // ... and begins looking for either USER_UNSET or LOGIN_ERROR!
    // That's right, it gets to here and stops and begins watching
    // for these tasks only.  Why would it watch for login any more?
    // During the life cycle of this generator, the user will login once
    // and all we need to watch for is either logging out, or a login
    // error.  The moment it does grab either of these though it will
    // once again move forward...
    const action = yield take([USER_UNSET, LOGIN_ERROR]);

    // ... if, for whatever reason, we decide to logout during this
    // cancel the current action.  i.e. the user is being logged
    // in, they get impatient and start hammering the logout button.
    // this would result in the above statement seeing the USER_UNSET
    // action, and down here, knowing that we should cancel the
    // forked `task` that was trying to log them in.  It will do so
    // and move forward...
    if (action.type === USER_UNSET) yield cancel(task);

    // ... finally we'll just log them out.  This will unset the client
    // access token ... -> follow this back up to the top of the while loop
    yield call(logout);
  }
}

export default loginWatcher;
