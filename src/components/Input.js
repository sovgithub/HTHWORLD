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
    keyboardType: PropTypes.oneOf(['numeric', 'default']),
    light: PropTypes.bool,
    placeholder: PropTypes.string,
    style: TextInput.propTypes.style,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onSubmitEditing: PropTypes.func,
    onEndEditing: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    placeholder: '',
    autoCapitalize: 'none',
    keyboardType: 'default',
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
      ? this.props.light ? styles.input_active_light : styles.input_active
      : this.props.light ? styles.input_inactive_light : styles.input_inactive;

    const inputColors = this.props.light
      ? styles.input_light
      : styles.input_dark;

    const placeholderTextColor = this.props.light
      ? placeholderTextColorLight
      : placeholderTextColorDark;

    return (
      <TextInput
        style={[styles.input, inputColors, activeStyle, this.props.style]}
        placeholderTextColor={placeholderTextColor}
        value={this.props.value}
        placeholder={this.props.placeholder}
        autoCapitalize={this.props.autoCapitalize}
        keyboardType={this.props.keyboardType}
        onChangeText={this.props.onChangeText}
        onSubmitEditing={this.props.onSubmitEditing}
        onEndEditing={this.props.onEndEditing}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        underlineColorAndroid="transparent"
        ref={this.setupInputRef}
      />
    );
  }
}

const placeholderTextColorDark = 'rgba(255,255,255,0.5)';
const placeholderTextColorLight = 'rgba(0,0,0,0.4)';

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8
  },
  input_dark: {
    backgroundColor: 'rgba(0,0,20, 0.25)',
    color: '#fff'
  },
  input_active: {
    borderColor: 'rgba(255,255,255, 1)',
    color: '#fff'
  },
  input_inactive: {
    borderColor: 'rgba(255,255,255, 0.25)'
  },
  input_light: {
    backgroundColor: 'rgba(0,0,20, 0.05)',
    color: '#000'
  },
  input_active_light: {
    borderColor: 'rgba(0,0,0, 1)',
    color: '#000'
  },
  input_inactive_light: {
    borderColor: 'rgba(0,0,0, 0.4)'
  }
});
