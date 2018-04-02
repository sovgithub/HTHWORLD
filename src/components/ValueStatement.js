import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { getColors } from 'styles';

const ValueStatement = ({ title, value, change, positive }) => {
  const themedStyles = getThemedStyles(getColors());
  return (
    <View style={styles.container}>
      <Text style={themedStyles.title}>{title}</Text>
      <Text style={[styles.value, themedStyles.value]}>{value}</Text>
      <Text
        style={[
          positive ? themedStyles.changePositive : themedStyles.changeNegative,
        ]}
      >
        {change}
      </Text>
    </View>
  );
};

ValueStatement.propTypes = {
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
