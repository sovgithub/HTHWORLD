import {SHOW_RECEIVE_MODAL, HIDE_RECEIVE_MODAL} from './constants.js';

const initialState = {
  show: false
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_RECEIVE_MODAL:
      return {
        ...state,
        show: true
      };
    case HIDE_RECEIVE_MODAL:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}
