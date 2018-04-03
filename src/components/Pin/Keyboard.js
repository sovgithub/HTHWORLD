import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Key from './Key';

const KEYS = [
  { value: '1', label: '1' },
  { value: '2', label: '2', label2: 'DEF' },
  { value: '3', label: '3', label2: 'DEF' },
  { value: '4', label: '4', label2: 'GHI' },
  { value: '5', label: '5', label2: 'JKL' },
  { value: '6', label: '6', label2: 'MNO' },
  { value: '7', label: '7', label2: 'PQRS' },
  { value: '8', label: '8', label2: 'TUV' },
  { value: '9', label: '9', label2: 'WXYZ' },
  { value: '', label: '' },
  { value: '0', label: '0' },
  { value: 'DEL', label: '', icon: 'md-backspace' },
];

export default class Keyboard extends Component {
  static propTypes = {
    handlePinPress: PropTypes.func.isRequired,
  };

  render() {
    return (
      <View style={styles.keyboard}>
        {KEYS.map((k, i) => {
          return (
            <Key
              key={`pinKey-${i}`}
              handlePinPress={this.props.handlePinPress}
              label={k.label}
              value={k.value}
              label2={k.label2}
              icon={k.icon}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: -1,
    flexShrink: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
