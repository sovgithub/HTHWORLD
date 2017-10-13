import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CurrencyButton from './CurrencyButton';
import ValueStatement from 'components/ValueStatement';
import DotChart from 'components/DotChart';
import GetCurrencyPrice from 'components/GetCurrencyPrice';
import GetCurrencyHistory from 'components/GetCurrencyHistory';

const currencies = {
  DASH: 'DASH',
  ETH: 'ETH',
  BTC: 'BTC',
  LTC: 'LTC',
  XRP: 'XRP',
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default class Dashboard extends React.Component {
  state = {
    selectedCurrency: currencies.BTC
  }

  handleCurrencyChange = selectedCurrency => () => this.setState({ selectedCurrency })

  triggerBasicAlert = (label) => () => Alert.alert('Button Clicked', label)

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Currency Markets</Text>
        <Text style={styles.date}>September 2</Text>
        <View style={styles.currencyTitleContainer}>
          {Object.values(currencies).map((currency) => (
            <CurrencyButton
              key={currency}
              onPress={this.handleCurrencyChange(currency)}
              selected={currency === this.state.selectedCurrency}
            >
              {currency}
            </CurrencyButton>
          ))}
        </View>
        <View style={styles.pricingContainer}>
          <GetCurrencyPrice currency={this.state.selectedCurrency}>
            {({loaded, data}) => (
              <ValueStatement
                title={`${this.state.selectedCurrency} price`}
                value={loaded ? `$${data}` : '... loading ...'}
                change="+34.55(0.23%)"
                positive={true}
              />
            )}
          </GetCurrencyPrice>
          <ValueStatement
            title="Your Holdings"
            value="$124.94"
            change="-3.55(0.02%)"
            positive={false}
          />
        </View>
        <View style={styles.carouselContainer}>
          <GetCurrencyHistory currency={this.state.selectedCurrency}>
            {({loaded, data}) => {
              return loaded
                ? <DotChart positive={true}>{data}</DotChart>
                : <Text style={styles.text}>Loading...</Text>
            }}
          </GetCurrencyHistory>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Send or Request Money" onPress={this.triggerBasicAlert('Send/Request')}/>
          <Button title="Wallet" onPress={this.triggerBasicAlert('Wallet')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1F27',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    margin: 10,
    fontSize: 30,
    color: 'white',
  },
  date: {
    marginBottom: 10,
    fontSize: 20,
    color: 'white',
  },
  currencyTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pricingContainer: {
    flexDirection: 'row',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
