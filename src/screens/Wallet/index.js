import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import CurrencyOverview from 'components/CurrencyOverview';
import LoadingSpinner from 'components/LoadingSpinner';
import {getCurrencyHistory} from 'components/GetCurrencyHistory';
import {getCurrencyPrice} from 'components/GetCurrencyPrice';
import {getColors} from 'styles';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

const createInitialCurrencyState = () => {
  return {
    priceLoaded: false,
    historyLoaded: false,
    price: '',
    history: [],
    amountHeld: getRandomInt(1, 20)
  };
};

class Wallet extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    currencies: {
      DASH: createInitialCurrencyState(),
      ETH: createInitialCurrencyState(),
      BTC: createInitialCurrencyState(),
      LTC: createInitialCurrencyState(),
      XRP: createInitialCurrencyState(),
    }
  }

  componentDidMount() {
    const listOfCurrencies = Object.keys(this.state.currencies);

    getCurrencyPrice(listOfCurrencies).then((prices) => {
      const oldState = this.state;
      const oldCurrenciesState = oldState.currencies;
      const newCurrenciesState = {};

      listOfCurrencies.map((currencyName) => {
        newCurrenciesState[currencyName] = {
          ...oldCurrenciesState[currencyName],
          priceLoaded: true,
          price: prices[currencyName].USD
        };
      });

      const newState = {
        ...oldState,
        currencies: newCurrenciesState
      };

      this.setState(newState);
    });

    listOfCurrencies.map((currencyName) => {
      getCurrencyHistory(currencyName, '3').then((history) => {
        const oldState = this.state;
        const oldCurrenciesState = oldState.currencies;
        const newState = {
          ...oldState,
          currencies: {
            ...oldCurrenciesState,
            [currencyName]: {
              ...oldCurrenciesState[currencyName],
              historyLoaded: true,
              history
            }
          }
        };

        this.setState(newState);
      });
    });
  }

  handlePress = (curr) => () => {
    this.props.navigation.navigate('CoinInformation', {coin: curr});
  }

  render() {
    const themedStyles = getThemedStyles(getColors());

    const { currencies } = this.state;
    const listOfCurrencies = Object.keys(currencies);

    const allLoaded = listOfCurrencies.reduce(
      (memo, currencyName) => {
        const currency = currencies[currencyName];
        return memo && currency.priceLoaded && currency.historyLoaded;
      },
      true
    );

    return (
      <View style={[styles.container, themedStyles.container]}>
        {allLoaded
          ? (
            <View>
              {listOfCurrencies.map((currencyName) => {
                const {
                  amountHeld,
                  history,
                  price,
                } = currencies[currencyName];

                return (
                  <CurrencyOverview
                    key={currencyName}
                    amountHeld={amountHeld}
                    currentPrice={price}
                    history={history}
                    holdingPrice={amountHeld * price}
                    positive={history[0] < history[history.length - 1]}
                    title={currencyName}
                    onPress={this.handlePress(currencyName)}
                  />
                );
              })}
            </View>
          )
          : <LoadingSpinner />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const getThemedStyles = (colors) => {
  return {
    container: {
      backgroundColor: colors.background,
    },
  };
};

export default Wallet;
