import React from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const WalletListEntry = ({ name, symbol, balance, value, change }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.nameSub}>
          {symbol} - {balance}
        </Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.change}>{change}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default WalletListEntry;

WalletListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  left: {
    flexGrow: 2
  },
  right: {
    flexGrow: 1,
    alignItems: 'flex-end'
  },
  name: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 20,
    fontWeight: '900'
  },
  nameSub: {
    fontSize: 12
  },
  value: {
    fontSize: 30,
    fontWeight: '200'
  },
  change: {
    fontSize: 12,
    fontWeight: '900'
  }
});
