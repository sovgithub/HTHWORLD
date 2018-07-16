import { connect } from 'react-redux';
import CurrencyModal from './CurrencyModal';
import { allWalletsSelector } from 'screens/Wallet/selectors';
import { selectors as transactionSelectors } from "sagas/transactions/reducer";

const mapStateToProps = state => {
  const wallets = allWalletsSelector(state);
  const mostUsedWallet = wallets.reduce(
    (previouslyMostUsed, wallet) => {
      const transactions = transactionSelectors.getTransactionsForSymbolAddress(wallet.symbol, wallet.publicAddress)(state);
      if (transactions && transactions.length > previouslyMostUsed.count) {
        return {wallet, count: transactions.length};
      }
      return previouslyMostUsed;
    },
    {wallet: undefined, count: 0}
  ).wallet;

  return {
    wallets,
    mostUsedWallet
  };
};

export default connect(mapStateToProps)(CurrencyModal);
