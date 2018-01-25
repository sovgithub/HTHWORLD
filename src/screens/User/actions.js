import { USER_SET, USER_UNSET } from "./constants";

export function setUser(user) {
  return {
    type: USER_SET,
    user_uid: user.user_uid
  };
}

export function unsetUser() {
  return {
    type: USER_UNSET
  };
}
