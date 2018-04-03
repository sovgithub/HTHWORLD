/*
|--------------------------------------------------
| Wallet - connected to redux, and passes
| state & actions to ./Wallet component.
|--------------------------------------------------
*/
import { connect } from 'react-redux';
import { allWalletsSelector } from './selectors';
import { updateBalance } from './actions';

import Wallets from './Wallets';

function mapStateToProps(state) {
  return { wallets: allWalletsSelector(state) };
}

const mapDispatchToProps = {
  updateBalance
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
