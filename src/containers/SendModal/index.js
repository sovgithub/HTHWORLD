import {connect} from 'react-redux';
import {hideSendModal} from './actions';
import SendModal from './SendModal';
import {sendFunds} from 'screens/Wallet/actions';
import { allWalletsSelector } from 'screens/Wallet/selectors';

const mapStateToProps = (state) => {
  return {
    wallets: allWalletsSelector(state),
    show: state.sendModal.show
  };
};

const mapDispatchToProps = {
  hideSendModal,
  sendFunds
};

export default connect(mapStateToProps, mapDispatchToProps)(SendModal);
