/**
 *
 * Login Form
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Error from 'components/notifications/Error';
import Button from 'components/Button';
import Input from 'components/Input';

const LANG_SIGN_UP_TEXT = 'LOG IN';

class LoginForm extends Component {
  static propTypes = {
    navigation: PropTypes.any,
    loginRequest: PropTypes.func.isRequired,
    errors: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string
    }))
  };

  state = {
    loading: false,
    loggedIn: false,
    error: false,
    email_address: null,
    password: null
  };

  handleSignupButton = () => {
    this.props.navigation.navigate('Signup');
  };

  handleBypassButton = () => {
    if (this.props.hasMnemonic) {
      this.props.navigation.navigate('Menu');
    } else {
      this.props.navigation.navigate('Mnemonic');
    }
  };

  handleFormSubmit = () => {
    if (
      this.state.email_address &&
      this.state.email_address.length > 1 &&
      this.state.password &&
      this.state.password.length > 1
    ) {
      this.props.loginRequest({
        email_address: this.state.email_address,
        password: this.state.password
      });
    }
  };

  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text });
  };

  render() {
    const { errors } = this.props;
    return (
      <View style={styles.container}>
        {errors.map(error => {
          return (
            <Error
              key={`error-${error.code}`}
              title="Oops!"
              message={error.message}
            />
          );
        })}
        <Input
          style={styles.input}
          label="Email"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          keyboardType="email-address"
          onSubmitEditing={() => this.loginPasswordInput.focus()}
          onChangeText={this.updateFormField('email_address')}
          value={this.state.email_address || ''}
        />
        <Input
          ref={el => (this.loginPasswordInput = el)}
          label="Password"
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="go"
          keyboardType="default"
          secureTextEntry
          onChangeText={this.updateFormField('password')}
          value={this.state.password || ''}
        />
        <Button style={styles.buttonContainer} onPress={this.handleFormSubmit}>
          {LANG_SIGN_UP_TEXT}
        </Button>
        <TouchableOpacity
          onPress={this.handleSignupButton}
          style={styles.buttonContainerAlt}
        >
          <Text style={styles.buttonTextAlt}>New to Hoard? Sign Up!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleBypassButton}
          style={styles.buttonContainerBypass}
        >
          <Text style={styles.buttonTextBypass}>
            No thanks, I just want to use the wallet
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(0,0,20, 0.25)',
    marginBottom: 15,
    color: '#fff',
    paddingHorizontal: 10,
    borderRadius: 8
  },
  buttonContainer: {
    marginBottom: 10
  },
  buttonContainerAlt: {
    backgroundColor: 'transparent',
    paddingVertical: 10
  },
  buttonTextAlt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700'
  },
  buttonContainerBypass: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    marginTop: 50
  },
  buttonTextBypass: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500'
  }
});
