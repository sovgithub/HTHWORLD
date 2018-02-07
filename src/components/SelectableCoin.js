import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {getCoinMetadata} from 'lib/currency-metadata';

export default function SelectableCoin({
  onPress,
  selected,
  currency,
}) {
  const metadata = getCoinMetadata(currency);
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, {backgroundColor: selected ? 'rgba(0,0,0,0.07)' : 'transparent'}]}>
        <Image style={styles.image} source={metadata.image} />
        <View>
          <Text style={styles.fullName}>{metadata.fullName}</Text>
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
    borderRadius: 10,
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
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
