import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DotChart from 'components/DotChart';

export default function CurrencyOverview({
  amountHeld,
  currentPrice,
  history,
  holdingPrice,
  positive,
  title,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[ styles.currentPrice, positive ? styles.positiveText : styles.negativeText ]}>
          {currentPrice}
        </Text>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.amountHeld}>{history.toString()}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.holdingPrice}>{holdingPrice}</Text>
        <Text style={styles.amountHeld}>{amountHeld}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#0f1f27',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  titleContainer: {
    flex: 1,
  },
  chartContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  priceContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    marginBottom: 5,
    color: 'white',
    fontSize: 20,
  },
  currentPrice: {
  },
  holdingPrice: {
    color: 'lightgrey',
    marginBottom: 5,
    fontSize: 20,
  },
  amountHeld: {
    color: 'lightgrey',
  },
  positiveText: {
    color: 'lightgreen'
  },
  negativeText: {
    color: 'red'
  },
});
