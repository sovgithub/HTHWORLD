import { SIGNUP_REQUESTING } from './constants';

const signupRequest = function signupRequest({
  first_name,
  last_name,
  phone_number,
  email_address,
  username,
  password,
}) {
  return {
    type: SIGNUP_REQUESTING,
    first_name,
    last_name,
    phone_number,
    email_address,
    username,
    password,
  };
};

export default signupRequest;
