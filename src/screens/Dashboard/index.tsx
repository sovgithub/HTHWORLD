import * as React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CurrencyButton from './CurrencyButton';
import ValueStatement from 'components/ValueStatement';
import SparkLine from 'components/SparkLine';
import GetCurrencyPrice from 'components/GetCurrencyPrice';
import GetCurrencyHistory from 'components/GetCurrencyHistory';
import {getColors, Colors} from 'styles';
import IntervalSelectionChart from 'components/IntervalSelectionChart';

enum Currencies {
  DASH = 'DASH',
  ETH = 'ETH',
  BTC = 'BTC',
  LTC = 'LTC',
  XRP = 'XRP',
};

const CurrencyList: Currencies[] = [];

for (const CurrencyItem in Currencies) {
  CurrencyList.push(CurrencyItem as Currencies);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

interface State {
  selectedCurrency: Currencies
}

export default class Dashboard extends React.Component<{}, State> {
  state = {
    selectedCurrency: Currencies.BTC
  }

  handleCurrencyChange = (selectedCurrency: Currencies) => () => this.setState({ selectedCurrency })

  triggerBasicAlert = (label: string) => () => Alert.alert('Button Clicked', label)

  render() {
    const themeColors = getColors();
    const themedStyles = getThemedStyles(themeColors);

    return (
      <View style={[styles.container, themedStyles.container]}>
        <Text style={[styles.heading, themedStyles.heading]}>Markets</Text>
        <Text style={[styles.date, themedStyles.date]}>September 2</Text>
        <View style={styles.currencyTitleContainer}>
        {CurrencyList.map((currency: Currencies) => (
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
          <GetCurrencyPrice currencies={[ this.state.selectedCurrency ]}>
            {({loaded, data}) => (
              <ValueStatement
                title={`${this.state.selectedCurrency} price`}
                value={loaded ? `$${data[this.state.selectedCurrency].USD}` : '...'}
                change="+34.55(0.23%)"
                positive={true}
              />
            )}
          </GetCurrencyPrice>
        </View>
        <View style={styles.carouselContainer}>
          <IntervalSelectionChart currency={this.state.selectedCurrency} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Send or Request Money"
            onPress={this.triggerBasicAlert('Send/Request')}
            color={themeColors.interactivePrimary}
          />
          <Button
            title="Wallet"
            onPress={this.triggerBasicAlert('Wallet')}
            color={themeColors.interactivePrimary}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    margin: 10,
    fontSize: 30,
  },
  date: {
    marginBottom: 10,
    fontSize: 20,
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
  }
});

const getThemedStyles = (colors: Colors) => {
  return {
    container: {
      backgroundColor: colors.background,
    },
    heading: {
      color: colors.textPrimary,
    },
    date: {
      color: colors.textPrimary,
    },
    text: {
      color: colors.textPrimary,
    },
  };
}
