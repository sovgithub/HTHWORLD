import * as React from 'react';
import { View, Text } from 'react-native';

interface Props {
  coin: string;
  date: string;
  numCoins: number;
  pricePerCoin: number;
  totalPrice: number;
  type: 'buy' | 'sell';
}

const TradeItem: React.SFC<Props> = ({
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

export default TradeItem;
