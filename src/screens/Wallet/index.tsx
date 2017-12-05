import * as React from 'react';
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

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

interface Props {
  navigation: NavigationScreenProp<any, NavigationAction>
}

class Wallet extends React.Component<Props, {}> {
  handlePress = (curr: string) => () => {
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

const getThemedStyles = (colors: Colors) => {
  return {
    container: {
      backgroundColor: colors.background,
    },
  }
}

export default Wallet;
