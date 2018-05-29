import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { Layout, Body, Header, Footer } from 'components/Layout';
import { colors } from 'styles';
import Input from 'components/Input';
import Button from 'components/Button';
import T from 'components/Typography';

const LANG_SIGN_UP_TEXT = 'Next';

export default class Signup extends Component {
  static propTypes = {
    navigation: PropTypes.any,
    signupRequest: PropTypes.func.isRequired,
  };

  state = {
    loading: false,
    loggedIn: false,
    error: false,
    username: null,
    email_address: null,
    password: null,
  };

  handleLogInButton = () => {
    this.props.navigation.navigate('Login');
  };

  handleFormSubmit = () => {
    const userSignupData = {
      first_name: '',
      last_name: '',
      phone_number: '',
      email_address: this.state.email_address,
      username: this.state.username,
      password: this.state.password,
    };

    this.props.signupRequest(userSignupData);
  };

  updateFormField = fieldName => text => {
    let nextState;

    if (fieldName === 'passwordConfirmation') {
      nextState = {
        ...nextState,
        ...{ passwordsMatch: this.state.password === text },
      };
    }

    nextState = { ...nextState, ...{ [fieldName]: text } };
    this.setState(nextState);
  };

  safeFocus = element => _.invoke(element, 'inputRef.focus');

  render() {
    const nextEnabled =
      this.state.email_address &&
      this.state.username &&
      this.state.passwordsMatch;

    const placeholderTextColor = 'rgba(255,255,255,0.75)';

    return (
      <Layout preload={false} keyboard>
        <Body scrollable>
          <Header>
            <T.Heading style={styles.headingText}>Your Information</T.Heading>
            <T.SubHeading style={styles.subHeadingText}>
              Enter your personal information
            </T.SubHeading>
          </Header>
          <Body>
            <Input
              ref={el => (this.signupEmailAddressInput = el)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="you@email.com"
              placeholderTextColor={placeholderTextColor}
              returnKeyType="next"
              keyboardType="email-address"
              onSubmitEditing={() => this.safeFocus(this.signupUsernameInput)}
              onChangeText={this.updateFormField('email_address')}
              value={this.state.email_address || ''}
              type="underline"
              style={styles.input}
            />
            <Input
              ref={el => (this.signupUsernameInput = el)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Username"
              placeholderTextColor={placeholderTextColor}
              returnKeyType="next"
              onSubmitEditing={() => this.safeFocus(this.signupPasswordInput)}
              onChangeText={this.updateFormField('username')}
              value={this.state.username || ''}
              type="underline"
              style={styles.input}
            />
            <Input
              ref={el => (this.signupPasswordInput = el)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              placeholderTextColor={placeholderTextColor}
              returnKeyType="go"
              secureTextEntry
              onSubmitEditing={() =>
                this.safeFocus(this.signupPasswordConfirmationInput)
              }
              onChangeText={this.updateFormField('password')}
              value={this.state.password || ''}
              type="underline"
              style={styles.input}
            />
            <Input
              style={
                'passwordsMatch' in this.state
                  ? this.state.passwordsMatch
                    ? styles.inputSuccess
                    : styles.inputError
                  : {}
              }
              ref={el => (this.signupPasswordConfirmationInput = el)}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Re-enter Password"
              placeholderTextColor={placeholderTextColor}
              returnKeyType="go"
              secureTextEntry
              onSubmitEditing={this.handleFormSubmit}
              onChangeText={this.updateFormField('passwordConfirmation')}
              value={this.state.passwordConfirmation || ''}
              type="underline"
            />
            {'passwordsMatch' in this.state &&
              !this.state.passwordsMatch && (
                <Text style={styles.inputErrorText}>
                  Your passwords do not match
                </Text>
              )}
          </Body>
          <Footer>
            <Button
              type="primary"
              onPress={this.handleFormSubmit}
              disabled={!nextEnabled}
            >
              {LANG_SIGN_UP_TEXT}
            </Button>
            <TouchableOpacity
              style={styles.buttonContainerAlt}
              onPress={this.handleLogInButton}
            >
              <Text style={styles.buttonTextAlt}>
                Already have an account? Log In!
              </Text>
            </TouchableOpacity>
          </Footer>
        </Body>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  input: {
    marginBottom: 15,
  },
  inputSuccess: {
    borderBottomColor: 'green',
  },
  inputError: {
    borderBottomColor: 'red',
  },
  inputErrorText: {
    color: colors.error,
  },
  buttonContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#223252',
    fontWeight: '700',
  },
  buttonContainerAlt: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonTextAlt: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: '700',
  },
  headingText: {
    color: colors.white,
    marginTop: 25,
    marginBottom: 25,
  },
  subHeadingText: {
    color: colors.white,
    marginBottom: 15,
  },
});
