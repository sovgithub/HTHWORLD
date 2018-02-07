import {
  WALLET_CREATE_REQUESTING,
  WALLET_CREATE_SUCCESS,
  WALLET_UPDATE_BALANCE_SUCCESS
} from './constants';

const initialState = {
  create_requesting: false,
  create_successful: false,
  create_messages: [],
  create_errors: [],
  walletAddresses: [
    /* publicAddress[] */
  ],
  wallets: {
    /*
      <publicAddress>: {
        symbol: string
        balance: number
        publicAddress: string
      }
    */
  }
};

export default function reducer(state = initialState, action) {
  console.log(state, action);
  switch (action.type) {
    case WALLET_CREATE_REQUESTING:
      return {
        ...state,
        requesting: true,
        successful: false,
        messages: [],
        errors: []
      };

    case WALLET_CREATE_SUCCESS: {
      const payload = action.payload;
      return {
        ...state,
        create_requesting: false,
        create_successful: true,
        create_messages: [],
        create_errors: [],
        walletAddresses: [...state.walletAddresses, payload.publicAddress],
        wallets: {
          ...state.wallets,
          [payload.publicAddress]: {
            symbol: payload.symbol,
            balance: payload.balance,
            publicAddress: payload.publicAddress
          }
        }
      };
    }
    case WALLET_UPDATE_BALANCE_SUCCESS: {
      const payload = action.payload;
      return {
        ...state,
        wallets: {
          ...state.wallets,
          [payload.publicAddress]: {
            ...state.wallets[payload.publicAddress],
            balance: payload.balance
          }
        }
      };
    }
    default:
      return state;
  }
}
