import {connect} from 'react-redux';
import PortfolioChart from './PortfolioChart';
import { SYMBOL_BTC, SYMBOL_ETH } from 'containers/App/constants';
import { walletsForSymbolSelector } from 'screens/Wallet/selectors';

const mapStateToProps = (state) => {
  const {transactions, pricing} = state;
  const ethWallets = walletsForSymbolSelector(state, SYMBOL_ETH);
  const btcWallets = walletsForSymbolSelector(state, SYMBOL_BTC);
  return {
    transactions,
    wallets: [...ethWallets, btcWallets],
    pricing
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioChart);
