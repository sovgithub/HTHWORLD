import {connect} from 'react-redux';

import {
  getCurrencyPrice
} from 'sagas/pricing/actions';
import Wallets from './Wallets';


const mapStateToProps = ({pricing}) => ({
  prices: Object.keys(pricing).reduce(
    (prices, key) => ({
      ...prices,
      [key]: pricing[key].price.price
    }),
    {}
  )
});

const mapDispatchToProps = {
  getCurrencyPrice
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallets);
