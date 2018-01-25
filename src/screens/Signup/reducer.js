import { SIGNUP_REQUESTING, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./constants";

const initialState = {
  requesting: false,
  successful: false,
  messages: [],
  errors: []
};

export default function SignupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_REQUESTING:
      return {
        requesting: true,
        successful: false,
        messages: [],
        errors: []
      };

    case SIGNUP_SUCCESS:
      return {
        requesting: false,
        successful: true,
        messages: [],
        errors: []
      };

    // Append any errors to the current state, if any.
    case SIGNUP_ERROR: {
      return {
        requesting: false,
        successful: false,
        messages: [],
        errors: [
          ...state.errors,
          {
            body: action.error.toString()
          }
        ]
      };
    }

    default:
      return state;
  }
}
