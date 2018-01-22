import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TextInput
} from 'react-native';
import {getColors} from 'styles';

export default class LabeledInput extends React.Component {
  static propTypes = {
    activeColor: PropTypes.string.isRequired,
    autoCapitalize: PropTypes.oneOf(['none', 'sentences', 'words', 'characters']),
    inactiveColor: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func.isRequired,
  }

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

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    height: 50,
    textAlign: 'center',
  },
});
