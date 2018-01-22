import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import SparkLine from 'components/SparkLine';
import GetCurrencyHistory, { Intervals } from 'components/GetCurrencyHistory';
import { getColors } from 'styles';

const intervalList = [
  Intervals.hour,
  Intervals.day,
  Intervals.week,
  Intervals.month,
  Intervals.year,
  Intervals.multiYear,
  Intervals.all
];


export default class IntervalSelectionChart extends React.Component {
  static propTypes = {
    currency: PropTypes.string.isRequired,
  };

  state = {
    selectedInterval: Intervals.hour,
  }

  handlePress = (selectedInterval) => () => {
    this.setState({selectedInterval});
  }

  render() {
    const themeColors = getColors();
    const themedStyles = getThemedStyles(themeColors);
    const {selectedInterval} = this.state;

    return (
        <View style={styles.container}>
        <GetCurrencyHistory currency={this.props.currency} interval={this.state.selectedInterval}>
          {({loaded, data}) => {
            return loaded
              ? <SparkLine positive={data[0] < data[data.length - 1]}>{data}</SparkLine>
              : <Text style={themedStyles.text}>...</Text>
          }}
        </GetCurrencyHistory>
        <View style={styles.intervalListContainer}>
          {intervalList.map((interval) => (
            <TouchableHighlight
              key={interval}
              style={styles.interval}
              onPress={this.handlePress(interval)}
            >
              <View>
                <Text style={[styles.intervalText, themedStyles.text]}>{interval}</Text>
                <View style={[
                  styles.intervalBorder,
                  themedStyles.intervalBorder,
                  {borderWidth: selectedInterval === interval ? 2 : 0}
                ]} />
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
    marginBottom: 10
  },
  intervalListContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  interval: {
    flex: 1
  },
  intervalText: {
    textAlign: 'center',
    marginBottom: 5
  },
  intervalBorder: {
    borderStyle: 'solid',
    borderRadius: 2
  },
});

const getThemedStyles = (colors) => {
  return {
    intervalBorder: {
      borderColor: colors.interactivePrimary,
    },
    text: {
      color: colors.textPrimary
    }
  };
}
