import {connect} from 'react-redux';
import PortfolioChart from './PortfolioChart';
import { SYMBOL_ETH } from 'containers/App/constants';
import { walletsForSymbolSelector } from 'screens/Wallet/selectors';

const mapStateToProps = (state) => {
  const {transactions, pricing} = state;
  return {
    transactions,
    wallets: walletsForSymbolSelector(state, SYMBOL_ETH),
    pricing
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioChart);
