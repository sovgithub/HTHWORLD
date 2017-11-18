// TYPES
export type Store = {
  accessToken?: string | null
};

export type Action = {
  type: string;
  [key: string]: any;
};


// CONSTANTS
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// REDUCER
const initialState: Store = {
  accessToken: null
};

export default function baseReducer(state: Store = initialState, action: Action): Store {
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
function makeActionCreator(type: string, ...argNames: string[]) {
  return function (...args: any[]): Action {
    let action: Action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

export const login = makeActionCreator(LOGIN, 'payload');
export const logout = makeActionCreator(LOGOUT);
