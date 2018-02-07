import {SHOW_SEND_MODAL, HIDE_SEND_MODAL} from './constants.js';

const initialState = {
  show: false
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case SHOW_SEND_MODAL:
      return {
        ...state,
        show: true
      };
    case HIDE_SEND_MODAL:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}
