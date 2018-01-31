import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function SelectableCoin({
  onPress,
  selected,
  currency,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {backgroundColor: selected ? 'lightgrey' : 'transparent'}]}>
        <View style={styles.image}/>
        <View>
          <Text style={styles.fullName}>{currency}</Text>
          <Text style={styles.coinName}>{currency}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

SelectableCoin.propTypes = {
  currency: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'grey',
    marginRight: 10,
  },
  fullName: {
    fontSize: 20,
    fontWeight: '500',
  },
  coinName: {
    fontSize: 14,
    fontWeight: '100',
  },
});
