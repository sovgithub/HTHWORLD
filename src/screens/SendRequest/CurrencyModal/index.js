import { connect } from 'react-redux';
import CurrencyModal from './CurrencyModal';
import { allWalletsSelector } from 'screens/Wallet/selectors';

const mapStateToProps = state => {
  return {
    wallets: allWalletsSelector(state)
  };
};

export default connect(mapStateToProps)(CurrencyModal);
