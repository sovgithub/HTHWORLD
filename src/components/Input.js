import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput } from 'react-native';

export default class Input extends Component {
  static propTypes = {
    autoCapitalize: PropTypes.oneOf([
      'none',
      'sentences',
      'words',
      'characters'
    ]),
    placeholder: PropTypes.string,
    style: TextInput.propTypes.style,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func
  };

  static defaultProps = {
    placeholder: '',
    autoCapitalize: 'none',
    style: {},
    onSubmitEditing: () => false
  };

  state = { active: false };

  inputRef = null;
  setupInputRef = input => (this.inputRef = input);

  handleFocus = () =>
    this.setState({
      active: true
    });

  handleBlur = () =>
    this.setState({
      active: false
    });

  render() {
    const activeStyle = this.state.active
      ? styles.input_active
      : styles.input_inactive;

    return (
      <TextInput
        style={[styles.input, activeStyle, this.props.style]}
        placeholderTextColor={placeholderTextColor}
        value={this.props.value}
        placeholder={this.props.placeholder}
        autoCapitalize={this.props.autoCapitalize}
        onChangeText={this.props.onChangeText}
        onSubmitEditing={this.props.onSubmitEditing}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        underlineColorAndroid="transparent"
        ref={this.setupInputRef}
      />
    );
  }
}

const placeholderTextColor = 'rgba(255,255,255,0.5)';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    backgroundColor: 'rgba(0,0,20, 0.25)',
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8
  },
  input_active: {
    borderColor: 'rgba(255,255,255, 1)',
    color: '#fff'
  },
  input_inactive: {
    borderColor: 'rgba(255,255,255, 0.25)'
  }
});
