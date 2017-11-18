import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  children: string;
  selected: boolean;
  onPress: (event: GestureResponderEvent) => any;
}

const CurrencyButton: React.SFC<Props> = ({children, selected, onPress}) => {
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
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'grey',
  },
  textSelected: {
    color: 'white',
  },
});

export default CurrencyButton;
