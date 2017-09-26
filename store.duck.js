export type Store = {
};

export type Action = {
  type: string,
  payload?: any
};

const initialState = {
};

export default function baseReducer(state: State = initialState, action: Action) {
  switch(action.type) {
  default:
    return state;
  }
}
