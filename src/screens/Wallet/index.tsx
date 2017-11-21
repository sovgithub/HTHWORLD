import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import CurrencyOverview from 'components/CurrencyOverview';
import GetCurrencyHistory from 'components/GetCurrencyHistory';
import GetCurrencyPrice from 'components/GetCurrencyPrice';

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

const Wallet: React.SFC<void> = () => {
  return (
    <View style={styles.container}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f1f27',
    flex: 1,
  },
});

export default Wallet;