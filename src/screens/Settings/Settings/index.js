import { connect } from 'react-redux';

import Settings from './Settings';
import {tradingPairSelector} from '../selectors';

const mapStateToProps = (state) => {
  return {
    selectedTradingPair: tradingPairSelector(state)
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
