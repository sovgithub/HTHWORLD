// @flow
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

type Props = {
  backgroundColor?: string,
  children: string,
  color?: string,
  style?: {[string]: any},
  underlayColor?: string,
  onPress: () => mixed
};

export default function RoundedButton(props: Props) {
  return (
    <TouchableHighlight
      style={[
        styles.container,
        {
          backgroundColor: props.backgroundColor,
          borderColor: props.color
        },
        props.style
      ]}
      underlayColor={props.underlayColor}
      onPress={props.onPress}
    >
    <Text style={[styles.text, {color: props.color}]}>{props.children}</Text>
    </TouchableHighlight>
  )
}

RoundedButton.defaultProps = {
  backgroundColor: 'transparent',
  color: 'red',
  underlayColor: 'lightblue'
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 100,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});
