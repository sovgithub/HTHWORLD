import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {getColors, Colors} from 'styles';

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
  const themedStyles = getThemedStyles(getColors());
  return (
    <View style={styles.container}>
      <Text style={themedStyles.title}>{title}</Text>
      <Text style={[styles.value, themedStyles.value]}>{value}</Text>
      <Text style={[positive ? themedStyles.changePositive : themedStyles.changeNegative ]}>
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
  value: {
    fontSize: 30,
  },
});

const getThemedStyles = (colors: Colors) => {
  return {
    title: {
      color: colors.textSecondary,
    },
    value: {
      color: colors.textPrimary,
    },
    changePositive: {
      color: colors.textPositive,
    },
    changeNegative: {
      color: colors.textNegative,
    },
  };
}

export default ValueStatement;
