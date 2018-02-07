import {connect} from 'react-redux';
import {hideSendModal} from './actions';
import SendModal from './SendModal';
import {sendFunds} from 'screens/Wallet/actions';

const mapStateToProps = (state) => {
  const addresses = state.wallet.walletAddresses;

  return {
    wallets: addresses.map(
      (address) => state.wallet.wallets[address]
    ),
    show: state.sendModal.show
  };
};

const mapDispatchToProps = {
  hideSendModal,
  sendFunds
};

export default connect(mapStateToProps, mapDispatchToProps)(SendModal);
