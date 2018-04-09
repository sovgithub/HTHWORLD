import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SelectableImageRow({
  onPress,
  selected,
  image,
  title,
  subtitle,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          { backgroundColor: selected ? 'rgba(0,0,0,0.07)' : 'transparent' },
        ]}
      >
        <Image style={styles.image} source={image} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.coinName}>{subtitle}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

SelectableImageRow.propTypes = {
  image: Image.propTypes.source,
  selected: PropTypes.bool.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
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
    borderRadius: 15,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '100',
  },
});
