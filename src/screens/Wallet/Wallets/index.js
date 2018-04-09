import {connect} from 'react-redux';

import Wallets from './Wallets';

import {
  getCurrencyPrice
} from 'sagas/pricing/actions';

import {
  allWalletsSelector,
  availableCoinsSelector,
  mnemonicPhraseSelector
} from '../selectors';
import { updateBalance } from '../actions';


const mapStateToProps = (state) => ({
  wallets: allWalletsSelector(state),
  hasMnemonic: !!mnemonicPhraseSelector(state),
  hasAvailableCoins: availableCoinsSelector(state).length > 0,
  prices: Object.keys(state.pricing).reduce(
    (prices, key) => ({
      ...prices,
      [key]: state.pricing[key].price.price
    }),
    {}
  )
});

const mapDispatchToProps = {
  getCurrencyPrice,
  updateBalance
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
