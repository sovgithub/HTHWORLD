import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

export default function DotChart({positive, children}) {
  const totalWidth = Dimensions.get('window').width;
  const maxValue = Math.max(...children);
  const minValue = Math.min(...children);
  const range = maxValue - minValue;
  return (
    <View style={styles.container}>
    {children.map((value, index) => (
      <View
      key={index}
          style={[
            styles.dot,
            positive ? styles.dotPositive : styles.dotNegative,
            {
              height: `${( ( (value - minValue) * 98 ) / range ) + 2}%`,
              width: (totalWidth / children.length) - 4,
            }
          ]}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  dot: {
    marginRight: 2,
    marginLeft: 2,
  },
  dotPositive: {
    backgroundColor: 'green'
  },
  dotNegative: {
    backgroundColor: 'red'
  },
});
