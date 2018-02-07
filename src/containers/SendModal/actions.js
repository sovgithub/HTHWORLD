import {SHOW_SEND_MODAL, HIDE_SEND_MODAL} from './constants';

export function showSendModal() {
  return {type: SHOW_SEND_MODAL};
}

export function hideSendModal() {
  return {type: HIDE_SEND_MODAL};
}
