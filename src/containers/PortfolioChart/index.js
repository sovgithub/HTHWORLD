import {connect} from 'react-redux';
import PortfolioChart from './PortfolioChart';
import { SYMBOL_BTC, SYMBOL_ETH, SYMBOL_BOAR } from 'containers/App/constants';
import { walletsForSymbolSelector } from 'screens/Wallet/selectors';
import { selectors as transactionSelectors } from 'sagas/transactions/reducer';

const mapStateToProps = (state, ownProps) => {
  const { wallets } = ownProps;
  let transactionsToCoalesce;
  if ( wallets && wallets.length ) {
    transactionsToCoalesce = wallets.map(({symbol, publicAddress}) => ({
      symbol,
      address: publicAddress,
      transactions: transactionSelectors.getTransactionsForSymbolAddress(symbol, publicAddress)(state).sort((a, b) => a.timeMined - b.timeMined)
    }));
  }

  return {
    transactionsToCoalesce: transactionsToCoalesce,
    fiatTrades: state.transactions.fiatTrades.reduce(
      (fiatTrades, hash) => {
        let validWalletTrade = false;

        for (const wallet of wallets) {
          const transactionsForWallet = transactionSelectors.getTransactionsForSymbolAddress(wallet.symbol, wallet.publicAddress)(state);

          validWalletTrade = !!transactionsForWallet.find(
            tx => tx.hash === hash
          );

          if (validWalletTrade) {
            break;
          }
        }

        if (validWalletTrade) {
          const transaction = state.transactions.transactions[hash];
          return [
            ...fiatTrades,
            transaction
          ];
        }

        return fiatTrades;
      },
      []
    )
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioChart);
