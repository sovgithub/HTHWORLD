import { createSelector } from 'reselect';

export const isSignedInSelector = createSelector(
  state => state.user,
  user => !!(user.user && user.user.user_uid)
);

export const emailSelector = createSelector(
  state => state.user,
  user => user && user.user && user.user.email_address
);
