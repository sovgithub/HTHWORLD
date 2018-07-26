import {connect} from 'react-redux';

import Wallets from './Wallets';

import {
  getCurrencyPrice
} from 'sagas/pricing/actions';

import { SUPPORTED_COINS_WALLET } from 'containers/App/constants';

import {
  allWalletsSelector,
  availableCoinsSelector,
  mnemonicPhraseSelector
} from '../selectors';
import {
  allPricesLoadedSelector,
  totalHoldingsSelector
} from 'sagas/pricing/selectors';
import { updateBalance } from '../actions';


const mapStateToProps = (state) => ({
  wallets: allWalletsSelector(state),
  hasMnemonic: !!mnemonicPhraseSelector(state),
  allPricesLoaded: allPricesLoadedSelector(state),
  totalHoldings: totalHoldingsSelector(state),
  hasAvailableCoins: availableCoinsSelector(state).length > 0,
  prices: SUPPORTED_COINS_WALLET.reduce(
    (prices, symbol) => ({
      ...prices,
      [symbol]: state.pricing &&
        state.pricing[symbol] &&
        state.pricing[symbol].price &&
        state.pricing[symbol].price.price
    }),
    {}
  )
});

const mapDispatchToProps = {
  getCurrencyPrice,
  updateBalance
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
