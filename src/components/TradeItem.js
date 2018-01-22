import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

const TradeItem = ({
  coin,
  date,
  numCoins,
  pricePerCoin,
  totalPrice,
  type,
}) => (
  <View style={{flexDirection: 'row'}}>
    <View>
      <Text>{type === 'buy' ? 'Bought' : 'Sold'}</Text>
      <Text>{date}</Text>
    </View>
    <View>
      <Text>${totalPrice}</Text>
      <Text>{numCoins} {coin} at ${pricePerCoin}</Text>
    </View>
    <View>
      <Text>></Text>
    </View>
  </View>
);

TradeItem.propTypes = {
  coin: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  numCoins: PropTypes.number.isRequired,
  pricePerCoin: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  type: PropTypes.oneOf(['buy', 'sell']).isRequired,
};

export default TradeItem;
