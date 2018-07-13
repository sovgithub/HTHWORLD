import {
  TRANSACTIONS_HYDRATED,
  TRANSACTION_FOUND,
  TRANSACTION_UPDATE
} from "./constants";

const initialState = {
  fiatTrades: [],
  transactions: {},
  transactionsBySymbolAddress: {},
  hydrationCompleted: false
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
    case TRANSACTIONS_HYDRATED: {
      return {
        ...state,
        hydrationCompleted: true
      };
    }
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
      const transactionAddressesBySymbol = state.transactionsBySymbolAddress[action.transaction.symbol] || {};

      const transactionToState = transactionAddressesBySymbol[action.transaction.to] || [];
      const transactionFromState = transactionAddressesBySymbol[action.transaction.from] || [];

      const getFullTransaction = (hash) => hash === action.transaction.hash ? action.transaction : state.transactions[hash];
      const sorter = (a, b) => getFullTransaction(b).blockNumber - getFullTransaction(a).blockNumber;

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
        transactionsBySymbolAddress: {
          ...state.transactionsBySymbolAddress,
          [action.transaction.symbol]: {
            ...transactionAddressesBySymbol,
            [action.transaction.to]: newTransactionTo,
            [action.transaction.from]: newTransactionFrom
          }
        }
      };
    }
    default: {
      return state;
    }
  }
}

export const selectors = {
  getTransactionsForSymbolAddress(symbol, address) {
    return store => {
      const transactionAddressesBySymbol = store.transactions.transactionsBySymbolAddress[symbol] || {};
      const hashes = transactionAddressesBySymbol[address] || [];
      return hashes.map(hash => store.transactions.transactions[hash]);
    };
  }
};
