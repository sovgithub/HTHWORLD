/*
|--------------------------------------------------
| Wallet - connected to redux, and passes
| state & actions to ./Wallet component.
|--------------------------------------------------
*/
import { connect } from 'react-redux';
import { updateBalance } from './actions';

import Wallets from './Wallets';

function mapStateToProps(state) {
  return { wallet: state.wallet };
}

const mapDispatchToProps = {
  updateBalance
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
