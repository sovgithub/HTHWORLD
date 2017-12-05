import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import SparkLine from 'components/SparkLine';
import {getColors, Colors} from 'styles';

interface Props {
  amountHeld: number;
  currentPrice: number;
  history: number[];
  holdingPrice: number;
  positive: boolean;
  title: string;
  onPress: (e: any) => void
}

const CurrencyOverview: React.SFC<Props> = ({
  amountHeld,
  currentPrice,
  history,
  holdingPrice,
  positive,
  title,
  onPress,
}) => {
  const themedStyles = getThemedStyles(getColors());

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.container, themedStyles.container]}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, themedStyles.title]}>{title}</Text>
          <Text style={[ styles.currentPrice, positive ? themedStyles.positiveText : themedStyles.negativeText ]}>
            {currentPrice}
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <SparkLine positive={positive}>{history}</SparkLine>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.holdingPrice, themedStyles.holdingPrice]}>{holdingPrice}</Text>
          <Text style={[styles.amountHeld, themedStyles.amountHeld]}>{amountHeld}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
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
    fontSize: 20,
  },
  currentPrice: {
  },
  holdingPrice: {
    marginBottom: 5,
    fontSize: 20,
  },
  amountHeld: {
  },
});

const getThemedStyles = (colors: Colors) => {
  return {
    container: {
      backgroundColor: colors.background,
    },
    title: {
      color: colors.textPrimary,
    },
    holdingPrice: {
      color: colors.textSecondary,
    },
    amountHeld: {
      color: colors.textSecondary,
    },
    positiveText: {
      color: colors.textPositive,
    },
    negativeText: {
      color: colors.textNegative,
    },
  };
}

export default CurrencyOverview;
