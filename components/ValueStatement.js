import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default function ValueStatement({
  title,
  value,
  change,
  positive,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={[ styles.change, positive ? styles.changePositive : styles.changeNegative ]}>
        {change}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    color: 'lightblue',
  },
  value: {
    fontSize: 30,
    color: 'white',
  },
  change: {},
  changePositive: {
    color: 'green',
  },
  changeNegative: {
    color: 'red',
  },
});
