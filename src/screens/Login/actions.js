import { LOGIN_REQUESTING } from './constants';

const loginRequest = function loginRequest({ username_or_email, password }) {
  return { type: LOGIN_REQUESTING, username_or_email, password };
};

export default loginRequest;
