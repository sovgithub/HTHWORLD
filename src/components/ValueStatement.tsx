import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

interface Props {
  change: string;
  positive: boolean;
  title: string;
  value: string;
}

const ValueStatement: React.SFC<Props> = ({
  title,
  value,
  change,
  positive,
})  => {
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

export default ValueStatement;