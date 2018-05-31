import {
  INITIALIZE_SETTINGS,
  TRADING_PAIR_USD,
  UPDATE_TRADING_PAIR,
} from './constants';

const initialState = {
  tradingPair: TRADING_PAIR_USD
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
  case INITIALIZE_SETTINGS:
    return {
      ...state,
      ...action.state
    };
  case UPDATE_TRADING_PAIR:
    return {
      ...state,
      tradingPair: action.tradingPair
    };
  default:
    return state;
  }
}
