import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
} from 'react-native';
import CurrencyOverview from 'components/CurrencyOverview';
import GetCurrencyHistory from 'components/GetCurrencyHistory';
import GetCurrencyPrice from 'components/GetCurrencyPrice';
import {getColors, Colors} from 'styles';
import { NavigationScreenProp, NavigationAction } from 'react-navigation';

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


class Wallet extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  }

  handlePress = (curr) => () => {
    this.props.navigation.navigate('CoinInformation', {coin: curr});
  }

  render() {
    const themedStyles = getThemedStyles(getColors());

    return (
      <View style={[styles.container, themedStyles.container]}>
        <GetCurrencyPrice currencies={Object.values(currencies)}>
          {({data: prices}) => (
            <View>
              {Object.values(currencies).map((curr) => (
                <GetCurrencyHistory key={curr} currency={curr} limit={'3'}>
                  {({loaded, data: history}) => {
                    const amountHeld = getRandomInt(1, 20);
                    return loaded ? (
                      <CurrencyOverview
                        amountHeld={amountHeld}
                        currentPrice={prices && prices[curr].USD}
                        history={history}
                        holdingPrice={prices && amountHeld * prices[curr].USD}
                        positive={history[0] < history[history.length - 1]}
                        title={curr}
                        onPress={this.handlePress(curr)}
                      />
                    ) : null;
                  }}
                </GetCurrencyHistory>
              ))}
            </View>
          )}
        </GetCurrencyPrice>
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
  }
}

export default Wallet;
