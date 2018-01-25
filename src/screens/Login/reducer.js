import { LOGIN_REQUESTING, LOGIN_SUCCESS, LOGIN_ERROR } from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUESTING:
      return { requesting: true, successful: false, messages: [], errors: [] };

    case LOGIN_SUCCESS:
      return {
        ...state,
        requesting: false,
        successful: true,
        messages: [],
        errors: []
      };

    // Append any errors to the current state, if any.
    case LOGIN_ERROR:
      return {
        ...state,
        requesting: false,
        successful: false,
        messages: [],
        errors: [...state.errors, { body: action.error.toString() }]
      };

    default:
      return state;
  }
}
