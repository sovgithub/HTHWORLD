import {
  TRANSACTION_FOUND,
  TRANSACTION_UPDATE
} from "./constants";

const initialState = {
  fiatTrades: [],
  transactions: {},
  transactionsByAddress: {}
};

function fiatTradesReducer(state, action) {
  const prevState = state.transactions[action.transaction.hash] || {};
  const isTrade = action.transaction.isTrade || false;
  const prevIsTrade = prevState.isTrade || false;

  const getFullTransaction = (hash) => hash === action.transaction.hash ? action.transaction : state.transactions[hash];
  const sorter = (a, b) => getFullTransaction(a).blockNumber - getFullTransaction(b).blockNumber;

  if (isTrade !== prevIsTrade) {
    if (isTrade) {
      return [...state.fiatTrades, action.transaction.hash].sort(sorter);
    } else {
      const removalIndex = state.fiatTrades.indexOf(action.transaction.hash);

      if (removalIndex >= 0) {
        return [
          ...state.fiatTrades.slice(0, removalIndex),
          ...state.fiatTrades.slice(removalIndex + 1),
        ];
      }
    }
  }

  return state.fiatTrades;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TRANSACTION_UPDATE: {
      return {
        ...state,
        fiatTrades: fiatTradesReducer(state, action),
        transactions: {
          ...state.transactions,
          [action.transaction.hash]: action.transaction
        }
      };
    }
    case TRANSACTION_FOUND: {
      const transactionToState = state.transactionsByAddress[action.transaction.to] || [];
      const transactionFromState = state.transactionsByAddress[action.transaction.from] || [];

      const getFullTransaction = (hash) => hash === action.transaction.hash ? action.transaction : state.transactions[hash];
      const sorter = (a, b) => getFullTransaction(a).blockNumber - getFullTransaction(b).blockNumber;

      const newTransactionTo = transactionToState.includes(action.transaction.hash)
            ? transactionToState
            : [...transactionToState, action.transaction.hash].sort(sorter);
      const newTransactionFrom = transactionFromState.includes(action.transaction.hash)
            ? transactionFromState
            : [...transactionFromState, action.transaction.hash].sort(sorter);
      return {
        ...state,
        fiatTrades: fiatTradesReducer(state, action),
        transactions: {
          ...state.transactions,
          [action.transaction.hash]: action.transaction
        },
        transactionsByAddress: {
          ...state.transactionsByAddress,
          [action.transaction.to]: newTransactionTo,
          [action.transaction.from]: newTransactionFrom
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const selectors = {
  getTransactionsForAddress(address) {
    return store => {
      const hashes = store.transactions.transactionsByAddress[address] || [];
      return hashes.map(hash => store.transactions.transactions[hash]);
    };
  }
};
