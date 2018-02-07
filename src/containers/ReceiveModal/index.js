import {connect} from 'react-redux';
import {hideReceiveModal} from './actions';
import ReceiveModal from './ReceiveModal';

const mapStateToProps = (state) => {
  const addresses = state.wallet.walletAddresses;

  return {
    wallets: addresses.map(
      (address) => state.wallet.wallets[address]
    ),
    show: state.receiveModal.show
  };
};

const mapDispatchToProps = {
  hideReceiveModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveModal);
