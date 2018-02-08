/*
|--------------------------------------------------
| Mnemonic Component - connected to redux, and passes
| state & actions to ./Mnemonic component.
|--------------------------------------------------
*/
import { connect } from 'react-redux';
import { createWallet } from '../actions';

import Mnemonic from './Mnemonic';

function mapStateToProps(state) {
  return { wallet: state.wallet };
}

const mapDispatchToProps = {
  createWallet
};

export default connect(mapStateToProps, mapDispatchToProps)(Mnemonic);
