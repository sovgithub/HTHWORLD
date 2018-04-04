import { connect } from "react-redux";
import CoinInformation from "./CoinInformation";
import { getCurrencyHistory } from "sagas/pricing/actions";
import { selectors as walletSelectors } from "screens/Wallet/reducer";
import { selectors as transactionSelectors } from "sagas/transactions/reducer";
import { updateTransaction } from "sagas/transactions/actions";

const mapStateToProps = (store, ownProps) => {
  const address = ownProps.navigation.state.params.address;

  const wallet = walletSelectors.getWallet(address)(store);
  const transactions = transactionSelectors.getTransactionsForAddress(address)(
    store
  );

  const pricing = store.pricing[wallet.symbol];

  return {
    transactions,
    wallet,
    pricing
  };
};

const mapDispatchToProps = {
  getCurrencyHistory,
  updateTransaction
};

export default connect(mapStateToProps, mapDispatchToProps)(CoinInformation);
