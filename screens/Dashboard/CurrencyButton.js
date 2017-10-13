import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default function CurrencyButton({children, selected, onPress}) {
  const containerStyles = [styles.container];
  const textStyles = [styles.text];
  if (selected) {
    containerStyles.push(styles.containerSelected);
    textStyles.push(styles.textSelected);
  }
  return (
    <TouchableHighlight style={containerStyles} onPress={onPress}>
      <Text style={textStyles}>{children}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5,
    padding: 5,
    borderRadius: 5,
  },
  containerSelected: {
    backgroundColor: 'lightblue',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  },
  textSelected: {
    color: 'white',
  },
});
