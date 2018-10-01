import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, Image, View } from 'react-native';
import { getNetworkForCoin } from 'lib/currency-metadata';
import T from 'components/Typography';
import { Try } from 'components/Conditional';

import { Layout, Body, Header, Footer } from 'components/Base';
import _ from 'lodash';

import Button from 'components/Button';
import Input from 'components/Input';
import NavigatorService from 'lib/navigator';

const LANG_SIGN_UP_TEXT = 'NEXT';

export default class Login extends Component {
  static propTypes = {
    hasMnemonic: PropTypes.bool.isRequired,
    navigation: PropTypes.any,
    loginRequest: PropTypes.func.isRequired,
    appReady: PropTypes.bool.isRequired,
    login: PropTypes.shape({
      error: PropTypes.string,
    }),
  };

  state = {
    loading: false,
    loggedIn: false,
    error: false,
    errorMessage: '',
    username_or_email: null,
    password: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (state.loading && !props.login.requesting && !props.login.successful) {
      return {
        loading: false,
        error: true,
        errorMessage: props.login.error,
      };
    }
    return null;
  }

  handleSignupButton = () => {
    NavigatorService.navigate('Signup');
  };

  handleCantLogIn = () => {
    NavigatorService.navigate('Forgot');
  };

  handleBypassButton = () => {
    if (this.props.hasMnemonic) {
      NavigatorService.resetReplace('Login', 'Menu');
    } else {
      NavigatorService.navigate('Mnemonic');
    }
  };

  handleFormSubmit = () => {
    this.setState({ errorMessage: '' }, () => {
      if (
        this.state.username_or_email &&
        this.state.username_or_email.length > 1 &&
        this.state.password &&
        this.state.password.length > 1
      ) {
        this.setState({ loading: true }, () =>
          this.props.loginRequest({
            username_or_email: this.state.username_or_email,
            password: this.state.password,
          })
        );
      }
    });
  };

  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text });
  };

  safeFocus = element => _.invoke(element, 'inputRef.focus');

  render() {
    return (
      <Layout contentReady={this.props.appReady} keyboard>
        <Body scrollable style={styles.body} navigationOffset={80}>
          <Header style={{ alignItems: 'center', marginTop: -40}}>
            <Image
              style={styles.logo}
              source={require('assets/hoard_circle_logo.png')} // eslint-disable-line no-undef
            />
            <Text style={styles.title}>Log In</Text>
            <Try condition={__DEV__}>
              <View>
                <T.Small style={styles.network}>{`Using: ${getNetworkForCoin(
                  'ETH'
                ).toUpperCase()}`}</T.Small>
              </View>
            </Try>
          </Header>
          <Body>
            <Try condition={!!this.state.errorMessage}>
              <View style={styles.errorMessageContainer}>
                <T.Light style={styles.errorMessage}>
                  {this.state.errorMessage}
                </T.Light>
              </View>
            </Try>
            <Input
              placeholder="Username or Email"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              keyboardType="email-address"
              editable={!this.state.loading}
              onSubmitEditing={() => this.safeFocus(this.loginPasswordInput)}
              onChangeText={this.updateFormField('username_or_email')}
              value={this.state.username_or_email || ''}
              type="underline"
            />
            <Input
              ref={el => (this.loginPasswordInput = el)}
              placeholder="Password"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="go"
              keyboardType="default"
              editable={!this.state.loading}
              secureTextEntry
              onSubmitEditing={this.handleFormSubmit}
              onChangeText={this.updateFormField('password')}
              value={this.state.password || ''}
              type="underline"
            />

            <Button type="text" onPress={this.handleCantLogIn} style={styles.buttonContainerAlt}>
              {`Can't log in?`}
            </Button>
          </Body>
          <Footer>
            <Button
              type="base"
              disabled={!this.state.password && !this.state.username_or_email}
              loading={this.state.loading}
              onPress={this.handleFormSubmit}
              style={styles.buttonContainerAlt}
            >
              {LANG_SIGN_UP_TEXT}
            </Button>
            <Button type="text" onPress={this.handleSignupButton} style={styles.buttonContainerAlt}>
              New to Hoard? Sign Up!
            </Button>
            <Button type="text" onPress={this.handleBypassButton}>
              No thanks, I just want to use the wallet
            </Button>
          </Footer>
        </Body>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginRight: 10,
  },
  errorMessageContainer: {
    backgroundColor: '#ff6161',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 20,
  },
  errorMessage: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 40,
    fontWeight: '100',
    textAlign: 'center',
  },
  network: {
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainerAlt: {
    marginVertical: 20,
  },
});
