import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Button,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {getColors} from 'styles';
import IntervalSelectionChart from 'components/IntervalSelectionChart';
import ValueStatement from 'components/ValueStatement';
import RoundedButton from 'components/RoundedButton';
import SectionHeader from 'components/SectionHeader';
import InfoItem from 'components/InfoItem';
import TradeItem from 'components/TradeItem';

export default class CoinInformation extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  };

  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.coin
  })

  handleBuy = () => Alert.alert('Buying is not enabled at this time')
  handleSell = () => Alert.alert('Selling is not enabled at this time')

  render() {
    const coin = this.props.navigation.state.params.coin;
    return (
      <ScrollView style={{flex: 1, marginTop: 10}}>
        <View style={{flexDirection: 'row'}}>
          <ValueStatement
            title={`${coin} Price`}
            value="xxxxx"
            change="x%"
            positive={true}
          />
          <ValueStatement
            title={`${coin} Balance`}
            value="xxxxx"
            change="x%"
            positive={true}
          />
        </View>
        <View style={{height: 250}}>
          <IntervalSelectionChart currency={coin} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <RoundedButton style={{flex: 1}} onPress={this.handleBuy}>Buy</RoundedButton>
          <RoundedButton style={{flex: 1}} onPress={this.handleSell}>Sell</RoundedButton>
        </View>
        <View>
          <SectionHeader>Your Position</SectionHeader>
          <InfoItem label={`${coin} `} value="323.200" />
          <InfoItem label="Total Value" value="$4000" />
          <InfoItem label="Avg Cost" value="$40" />
          <InfoItem label="Total Return" value="+240%" />
        </View>
        <View>
          <SectionHeader>Stats</SectionHeader>
          <InfoItem label="24hr High" value="$4000" />
          <InfoItem label="24hr Low" value="$40" />
          <InfoItem label="24hr Value" value="+240%" />
        </View>
        <View>
          <SectionHeader>Trades</SectionHeader>
          <TradeItem
            coin={coin}
            date="Nov 12, 2017"
            numCoins={12.3}
            pricePerCoin={20}
            totalPrice={246}
            type="buy"
          />
          <TradeItem
            coin={coin}
            date="Nov 13, 2017"
            numCoins={12.3}
            pricePerCoin={20}
            totalPrice={246}
            type="sell"
          />
          <TradeItem
            coin={coin}
            date="Nov 14, 2017"
            numCoins={12.3}
            pricePerCoin={20}
            totalPrice={246}
            type="buy"
          />
          <TradeItem
            coin={coin}
            date="Nov 15, 2017"
            numCoins={12.3}
            pricePerCoin={20}
            totalPrice={246}
            type="sell"
          />
        </View>
      </ScrollView>
    );
  }
}
