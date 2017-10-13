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

const currencies = {
  DASH: 'DASH',
  ETH: 'ETH',
  BTC: 'BTC',
  LTC: 'LTC',
  XRP: 'XRP',
};

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
          <ValueStatement
            title={`${this.state.selectedCurrency} price`}
            value="$12,084.94"
            change="+34.55(0.23%)"
            positive={true}
          />
          <ValueStatement
            title="Your Holdings"
            value="$124.94"
            change="-3.55(0.02%)"
            positive={false}
          />
        </View>
        <View style={styles.carouselContainer}>
          <Text style={styles.text}>Carousel section</Text>
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
    marginTop: 100,
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
