import { connect } from "react-redux";
import CoinInformation from "./CoinInformation";
import { getCurrencyHistory } from "sagas/pricing/actions";
import { walletSelector } from "screens/Wallet/selectors";
import { isSignedInSelector } from "containers/User/selectors";
import { sortedTransactionsForWalletSelector, sortedContactTransactionsForSymbolSelector, filterContactTransactionsByStatus } from "sagas/transactions/selectors";
import { updateTransaction, cancelContactTransaction } from "sagas/transactions/actions";
import { SYMBOL_ETH, SYMBOL_BTC } from 'containers/App/constants';
import {showReceiveModal} from 'containers/ReceiveModal/actions';
import {showSendModal} from 'containers/SendModal/actions';

const mapStateToProps = (store, ownProps) => {
  const id = ownProps.navigation.state.params.id;

  const wallet = walletSelector(store, id);
  let transactions = [];
  let contactTransactions = [];
  const isSignedIn =  isSignedInSelector(store);

  transactions = sortedTransactionsForWalletSelector(
    store,
    wallet.symbol,
    wallet.publicAddress,
    'ASC'
  );

  contactTransactions = isSignedIn
    ? sortedContactTransactionsForSymbolSelector(
        store,
        wallet.symbol,
        'ASC'
      ).filter(tx => tx.details.status === 'pending')
    : [];

  const pricing = store.pricing[wallet.symbol];

  return {
    transactions,
    contactTransactions,
    wallet,
    isSignedIn,
    pricing
  };
};

const mapDispatchToProps = {
  cancelContactTransaction,
  getCurrencyHistory,
  updateTransaction,
  showSendModal,
  showReceiveModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinInformation);
