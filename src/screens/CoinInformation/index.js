import { connect } from "react-redux";
import CoinInformation from "./CoinInformation";
import { getCurrencyHistory } from "sagas/pricing/actions";
import { walletSelector } from "screens/Wallet/selectors";
import { selectors as transactionSelectors } from "sagas/transactions/reducer";
import { updateTransaction } from "sagas/transactions/actions";
import { SYMBOL_ETH, SYMBOL_BTC } from 'containers/App/constants';
import {showReceiveModal} from 'containers/ReceiveModal/actions';
import {showSendModal} from 'containers/SendModal/actions';

const mapStateToProps = (store, ownProps) => {
  const id = ownProps.navigation.state.params.id;

  const wallet = walletSelector(store, id);
  let transactions = [];

  if ([SYMBOL_BTC, SYMBOL_ETH].includes(wallet.symbol)) {
    transactions = transactionSelectors.getTransactionsForAddress(wallet.publicAddress)(
      store
    );
  }

  const pricing = store.pricing[wallet.symbol];

  return {
    transactions,
    wallet,
    pricing
  };
};

const mapDispatchToProps = {
  getCurrencyHistory,
  updateTransaction,
  showSendModal,
  showReceiveModal
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinInformation);
