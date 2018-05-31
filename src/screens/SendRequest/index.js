import { connect } from 'react-redux';
import SendRequest from './SendRequest';
import { sendFunds } from 'screens/Wallet/actions';
import { getCurrencyPrice } from 'sagas/pricing/actions';
import { allWalletsSelector } from 'screens/Wallet/selectors';
import { tradingPairSelector } from 'screens/Settings/selectors';

const mapStateToProps = state => {
  return {
    prices: Object.keys(state.pricing).reduce(
      (prices, key) => ({
        ...prices,
        [key]: state.pricing[key].price.price
      }),
      {}
    ),
    wallets: allWalletsSelector(state),
    tradingPair: tradingPairSelector(state)
  };
};

const mapDispatchToProps = {
  getCurrencyPrice,
  sendFunds,
  requestFunds(...args) {
    console.log('hey you', args);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SendRequest);
