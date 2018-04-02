export const CONVERT_CURRENCY_ERROR_EXISTENCE =
  'ERROR: you must pass both a source and destination keys as a parameter';
export const CONVERT_CURRENCY_ERROR_PAIR =
  'ERROR: you must trade with a common trading pair';
export const CONVERT_CURRENCY_ERROR_PRICE =
  'ERROR: source and destination must both contain both a price at which to trade';
export const CONVERT_CURRENCY_ERROR_AMOUNT_MISSING =
  'ERROR: both source and destination must contain an amount key';
export const CONVERT_CURRENCY_ERROR_SOLVE_FOR_MISSING =
  "ERROR: either source and destination must have SOLVE_FOR as the value for the 'amount' key";
export const CONVERT_CURRENCY_ERROR_SOLVE_FOR_BOTH =
  "ERROR: source and destination cannot both have SOLVE_FOR as the value for the 'amount' key";

export const SOLVE_FOR = 'CONVERT_CURRENCY_SOLVE_FOR_X';

export function convertCurrency(params) {
  if (!params) {
    return CONVERT_CURRENCY_ERROR_EXISTENCE;
  }

  const { source, destination } = params;

  if (!source || !destination) {
    return CONVERT_CURRENCY_ERROR_EXISTENCE;
  }
  if (!source.pair || !destination.pair || source.pair !== destination.pair) {
    return CONVERT_CURRENCY_ERROR_PAIR;
  }
  if (!destination.price || !source.price) {
    return CONVERT_CURRENCY_ERROR_PRICE;
  }
  if (
    !Object.keys(destination).includes('amount') ||
    !Object.keys(source).includes('amount')
  ) {
    return CONVERT_CURRENCY_ERROR_AMOUNT_MISSING;
  }
  if (destination.amount !== SOLVE_FOR && source.amount !== SOLVE_FOR) {
    return CONVERT_CURRENCY_ERROR_SOLVE_FOR_MISSING;
  }
  if (destination.amount === SOLVE_FOR && source.amount === SOLVE_FOR) {
    return CONVERT_CURRENCY_ERROR_SOLVE_FOR_BOTH;
  }

  const solveSource = source.amount === SOLVE_FOR;

  const known = solveSource ? destination : source;
  const X = solveSource ? source : destination;

  const tradingPairCost = known.price * known.amount;
  const xAmount = tradingPairCost / X.price;

  const sourceAmount = solveSource ? xAmount : known.amount;
  const destinationAmount = solveSource ? known.amount : xAmount;

  return {
    source: {
      ...source,
      amount: sourceAmount,
    },
    destination: {
      ...destination,
      amount: destinationAmount,
    },
    totalCost: tradingPairCost,
  };
}
