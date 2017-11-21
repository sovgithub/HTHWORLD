import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  GestureResponderEvent,
} from 'react-native';
import {getColors, Colors} from 'styles';

interface Props {
  children: string;
  selected: boolean;
  onPress: (event: GestureResponderEvent) => any;
}

const CurrencyButton: React.SFC<Props> = ({children, selected, onPress}) => {
  const themedStyles = getThemedStyles(getColors());

  const containerStyles: any[] = [styles.container];
  const textStyles: any[] = [styles.text, themedStyles.text];
  if (selected) {
    containerStyles.push(themedStyles.containerSelected);
    textStyles.push(themedStyles.textSelected);
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
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const getThemedStyles = (colors: Colors) => {
  return {
    containerSelected: {
      backgroundColor: colors.interactivePrimary,
    },
    text: {
      color: colors.textSecondary,
    },
    textSelected: {
      color: colors.textPrimary,
    },
  };
}

export default CurrencyButton;
