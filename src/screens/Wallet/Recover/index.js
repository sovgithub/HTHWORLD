/*
|--------------------------------------------------
| Recover Component - connected to redux, and passes
| state & actions to ./Recover component.
|--------------------------------------------------
*/
import { connect } from 'react-redux';
import { createWallet } from '../actions';

import Recover from './Recover';

function mapStateToProps(state) {
  return { wallet: state.wallet };
}

const mapDispatchToProps = {
  createWallet
};

export default connect(mapStateToProps, mapDispatchToProps)(Recover);
