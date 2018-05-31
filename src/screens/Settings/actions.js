import {
  UPDATE_TRADING_PAIR,
  INITIALIZE_SETTINGS,
} from './constants';

export function initializeSettings(state) {
  return {
    type: INITIALIZE_SETTINGS,
    state
  };
}

export function updateTradingPair(tradingPair) {
  return {
    type: UPDATE_TRADING_PAIR,
    tradingPair
  };
}
