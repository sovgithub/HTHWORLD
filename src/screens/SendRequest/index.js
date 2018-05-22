import { connect } from 'react-redux';
import SendRequest from './SendRequest';
import { sendFunds } from 'screens/Wallet/actions';
import { allWalletsSelector } from 'screens/Wallet/selectors';

const mapStateToProps = state => {
  return {
    wallets: allWalletsSelector(state),
  };
};

const mapDispatchToProps = {
  sendFunds,
  requestFunds(...args) {
    console.log('hey you', args);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SendRequest);
