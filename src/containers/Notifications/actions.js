import uuid from 'uuid';

import {
  NOTIFICATION_DISMISSED,
  NOTIFICATION_RECIEVED
} from './constants';

export function notificationRecieved(notification) {
  return {
    type: NOTIFICATION_RECIEVED,
    notification: {
      ...notification,
      uuid: uuid()
    }
  };
}

export function notificationDismissed(notification) {
  return {
    type: NOTIFICATION_DISMISSED,
    notification
  };
}
