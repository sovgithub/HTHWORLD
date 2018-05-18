import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, AlertIOS } from 'react-native';
import * as Animatable from 'react-native-animatable';
import InputList from './InputList';
import Keyboard from './Keyboard';
import { saveKey } from './utils';
import Button from 'components/Button';
import T from 'components/Typography';
import NavigatorService from 'lib/navigator';

const LANG_ENTER_STRING = 'Please enter a new PIN.';
const LANG_CONFIRM_STRING = 'Please confirm your PIN.';
const LANG_SUCCESS_STRING = 'Your PIN was saved successfully!';

export default class Store extends Component {
  static propTypes = {
    handleSuccess: PropTypes.func,
    pinLength: PropTypes.number,
  };

  static defaultProps = {
    handleSuccess: () => false,
    pinLength: 6,
  };

  state = {
    pin: null,
    confirmPin: null,
  };

  handleInputRef = ref => (this.inputEl = ref);

  shake = () => this.inputEl.shake(800);

  state = {
    pinValue: '',
    valid: false,
    attempts: 0,
  };

  storePin = value => {
    if (this.state.pin) {
      if (value !== this.state.pin) {
        this.shake();
        this.setState({
          pinValue: '',
          confirmPin: value,
          valid: false,
          attempts: this.state.attempts + 1,
        });
      } else {
        saveKey(value);
        this.setState({ confirmPin: value, pinValue: '', valid: true });
      }
    } else {
      this.setState({ pin: value, pinValue: '' });
    }
  };

  onSuccessHandler = () => {
    AlertIOS.alert('Successsss!');
    NavigatorService.navigate('Menu');
  };

  validatePin = value => {
    this.storePin(value);
  };

  handlePinPress = value => {
    if (value === 'DEL') {
      const pin = this.state.pinValue.slice(0, -1);
      this.setState({ pinValue: pin });
      return;
    }

    const newPin = `${this.state.pinValue}${value}`;
    if (newPin.length >= this.props.pinLength) {
      this.validatePin(newPin);
    } else {
      this.setState({ pinValue: newPin });
    }
  };

  render() {
    return (
      <Animatable.View animation="fadeInUp" style={styles.container}>
        <View style={styles.pinView}>
          <T.Heading style={styles.text}>
            {this.state.valid
              ? ''
              : !this.state.pin ? LANG_ENTER_STRING : LANG_CONFIRM_STRING}
            {this.state.pin && this.state.valid && LANG_SUCCESS_STRING}
          </T.Heading>
          <Text style={styles.pinPromptText}>
            {!this.state.pin && 'No PIN set'}
            {this.state.pin && this.state.valid && 'YAY! they matched.'}
            {this.state.pin &&
              this.state.confirmPin &&
              !this.state.valid &&
              'PIN was not the same'}
          </Text>
          <Text style={styles.pinPromptText}>
            Attempts: {this.state.attempts}
          </Text>
          {!this.state.valid && (
            <Animatable.View ref={this.handleInputRef}>
              <InputList pinLength={6} pinValue={this.state.pinValue} />
            </Animatable.View>
          )}

          {this.state.pin &&
            this.state.valid && (
              <Button
                type="primary"
                onPress={this.onSuccessHandler}
                style={styles.button}
              >
                {'Go to dashboard'}
              </Button>
            )}
        </View>
        {!this.state.valid && <Keyboard handlePinPress={this.handlePinPress} />}
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pinView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: 'rgb(239, 239, 244)',
  },
  pinKeyboard: {
    flex: -1,
    flexShrink: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pinKey: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '33.33%',
    height: 70,
    borderWidth: 1,
    borderColor: 'rgb(239, 239, 244)',
    flexGrow: 1,
    paddingTop: 8,
  },
  pinKeyEmpty: {
    backgroundColor: 'rgb(239, 239, 244)',
  },
  pinPromptText: {
    marginBottom: 10,
  },
  button: {
    padding: 10,
  },
});
