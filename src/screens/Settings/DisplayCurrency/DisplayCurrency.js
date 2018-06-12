import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Layout, Body } from 'components/Base';
import T from 'components/Typography';

import memoize from 'lodash/fp/memoize';

export default class DisplayCurrency extends Component {
  static propTypes = {
    tradingPairs: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string,
        image: Image.propTypes.source,
      })
    ).isRequired,
    selectedTradingPair: PropTypes.string,
    updateTradingPair: PropTypes.func.isRequired,
  };

  selectCurrency = memoize(name => () => this.props.updateTradingPair(name));

  render() {
    const { tradingPairs, selectedTradingPair } = this.props;
    return (
      <Layout preload={false}>
        <Body scrollable>
          <T.Heading style={styles.heading}>Display Currency</T.Heading>
          <T.Light style={styles.description}>
            Select your default currency display
          </T.Light>
          <View style={styles.list}>
            {tradingPairs.map(tradingPair => (
              <TouchableOpacity
                key={tradingPair.name}
                onPress={this.selectCurrency(tradingPair.name)}
              >
                <View style={styles.row}>
                  <Image source={tradingPair.image} style={styles.image} />
                  <T.Light style={styles.name}>
                    {tradingPair.name} ({tradingPair.symbol || '-'})
                  </T.Light>
                  {selectedTradingPair === tradingPair.name && (
                    <Image
                      source={require('assets/tick.png')}
                      style={styles.success}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Body>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    color: 'white',
    padding: 20,
  },
  description: {
    padding: 20,
    color: '#6e6c78',
  },
  list: {
    borderColor: 'rgba(151, 151, 151, 0.21)',
    borderStyle: 'solid',
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 20,
    padding: 20,
    borderColor: 'rgba(151, 151, 151, 0.21)',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  image: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  name: {
    flex: 1,
    textAlign: 'left',
    color: 'white',
    paddingLeft: 20,
  },
  success: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  content: {},
});
