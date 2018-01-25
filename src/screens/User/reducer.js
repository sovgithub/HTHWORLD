import { USER_SET, USER_UNSET } from "./constants";

const initialSate = {
  user_uid: null,
  session: null
};

const reducer = function UserReducer(state = initialSate, action) {
  switch (action.type) {
    case USER_SET:
      return { user_uid: action.user_uid, session: action.session };

    case USER_UNSET:
      return { user_uid: null, session: null };

    default:
      return state;
  }
};

export default reducer;
