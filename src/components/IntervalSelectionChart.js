import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import SparkLine from 'components/SparkLine';
import LoadingSpinner from 'components/LoadingSpinner';
import { Intervals } from 'components/GetCurrencyHistory';
import { getColors } from 'styles';

const intervalList = [
  Intervals.hour,
  Intervals.day,
  Intervals.week,
  Intervals.month,
  Intervals.year,
  Intervals.multiYear,
  Intervals.all,
];

export default class IntervalSelectionChart extends React.Component {
  static propTypes = {
    interval: PropTypes.string.isRequired,
    positive: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    history: PropTypes.arrayOf(PropTypes.number).isRequired,
    onChangeInterval: PropTypes.func.isRequired,
  };

  handlePress = selectedInterval => () => {
    this.props.onChangeInterval(selectedInterval);
  };

  render() {
    const themeColors = getColors();
    const themedStyles = getThemedStyles(themeColors);

    return (
      <View style={styles.container}>
        {this.props.loading ? (
          <LoadingSpinner />
        ) : (
          <SparkLine positive={this.props.positive}>
            {this.props.history}
          </SparkLine>
        )}
        <View style={styles.intervalListContainer}>
          {intervalList.map(interval => (
            <TouchableHighlight
              key={interval}
              style={styles.interval}
              onPress={this.handlePress(interval)}
            >
              <View>
                <Text style={[styles.intervalText, themedStyles.text]}>
                  {interval}
                </Text>
                <View
                  style={[
                    styles.intervalBorder,
                    themedStyles.intervalBorder,
                    { borderWidth: this.props.interval === interval ? 2 : 0 },
                  ]}
                />
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    width: '100%',
  },
  intervalListContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 10,
  },
  interval: {
    flex: 1,
  },
  intervalText: {
    textAlign: 'center',
    marginBottom: 5,
  },
  intervalBorder: {
    borderStyle: 'solid',
    borderRadius: 2,
  },
});

const getThemedStyles = colors => {
  return {
    intervalBorder: {
      borderColor: colors.interactivePrimary,
    },
    text: {
      color: colors.textPrimary,
    },
  };
};
