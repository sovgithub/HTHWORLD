// CONSTANTS
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// REDUCER
const initialState = {
  accessToken: null
};

export default function baseReducer(state = initialState, action) {
  switch(action.type) {
  case LOGIN:
    return {
      ...state,
      accessToken: action.payload
    };
  case LOGOUT:
    return {
      ...state,
      accessToken: null
    };
  default:
    return state;
  }
}


// ACTIONS
function makeActionCreator(type, ...argNames) {
  return function (...args) {
    let action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export const login = makeActionCreator(LOGIN, 'payload');
export const logout = makeActionCreator(LOGOUT);
