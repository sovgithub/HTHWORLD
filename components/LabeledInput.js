// @flow
import React from 'react';
import {
  StyleSheet,
  TextInput
} from 'react-native';

type Props = {
  activeColor?: string,
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters',
  inactiveColor?: string,
  placeholder?: string,
  style?: {[string]: any},
  value?: string,
  onChangeText: () => mixed,
  onSubmitEditing: () => mixed
};

export default class LabeledInput extends React.Component<Props> {
  state = { active: false }

  inputRef = null
  setupInputRef = (input) => this.inputRef = input

  toggleFocus = () => this.setState({ active: !this.state.active })

  render() {
    const {
      activeColor,
      autoCapitalize,
      inactiveColor,
      placeholder,
      style,
      value,
      onChangeText,
      onSubmitEditing
    } = this.props;

    const color = this.state.active ? activeColor : inactiveColor;

    return (
      <TextInput
        style={[
          styles.textInput,
          {
            borderBottomColor: color,
            color
          },
          style
        ]}
        value={value}
        placeholder={placeholder}
        autoCapitalize={autoCapitalize}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        onFocus={this.toggleFocus}
        onBlur={this.toggleFocus}
        ref={this.setupInputRef}
      />
    );
  }
}

LabeledInput.defaultProps = {
  activeColor: 'white',
  inactiveColor: 'grey',
  placeholder: 'text',
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    height: 50,
    textAlign: 'center',
  },
});
