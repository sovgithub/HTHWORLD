import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';
import { getColors } from 'styles';
import T from 'components/Typography';

const ValueStatement = ({ title, value, change, positive, style }) => {
  const themedStyles = getThemedStyles(getColors());
  return (
    <View style={[styles.container, style]}>
      <T.Light style={themedStyles.title}>{title}</T.Light>
      <T.PriceLarge style={[styles.value, themedStyles.value]}>
        {value}
      </T.PriceLarge>
      <T.SubtitleAlternate
        style={[
          positive ? themedStyles.changePositive : themedStyles.changeNegative,
        ]}
      >
        {change}
      </T.SubtitleAlternate>
    </View>
  );
};

ValueStatement.propTypes = {
  style: ViewPropTypes.style,
  change: PropTypes.string.isRequired,
  positive: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  value: {
    fontSize: 30,
  },
});

const getThemedStyles = colors => {
  return {
    title: {
      color: colors.textSecondary,
    },
    value: {
      color: colors.textPrimary,
    },
    changePositive: {
      color: colors.textPositive,
    },
    changeNegative: {
      color: colors.textNegative,
    },
  };
};

export default ValueStatement;
