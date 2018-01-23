import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import SparkLine from 'components/SparkLine';
import {getColors} from 'styles';

const CurrencyOverview = ({
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
};

CurrencyOverview.propTypes = {
  amountHeld: PropTypes.number.isRequired,
  currentPrice: PropTypes.number.isRequired,
  history: PropTypes.arrayOf(PropTypes.number).isRequired,
  holdingPrice: PropTypes.number.isRequired,
  positive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

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

const getThemedStyles = (colors) => {
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
};

export default CurrencyOverview;
