import { createSelector } from 'reselect';

export const transactionStatusSelector = createSelector(
  state => state.transactionStatus,
  (_, id) => id,
  (transactionStatus, id) => transactionStatus[id]
);
