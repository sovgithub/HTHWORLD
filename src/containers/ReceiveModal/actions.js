import {SHOW_RECEIVE_MODAL, HIDE_RECEIVE_MODAL} from './constants';

export function showReceiveModal() {
  return {type: SHOW_RECEIVE_MODAL};
}

export function hideReceiveModal() {
  return {type: HIDE_RECEIVE_MODAL};
}
