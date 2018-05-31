import { createSelector } from 'reselect';

export const tradingPairSelector = createSelector(
  state => state.settings,
  settings => settings.tradingPair
);
