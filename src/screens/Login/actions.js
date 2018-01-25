import { LOGIN_REQUESTING } from "./constants";

const loginRequest = function loginRequest({ email_address, password }) {
  return { type: LOGIN_REQUESTING, email_address, password };
};

export default loginRequest;
