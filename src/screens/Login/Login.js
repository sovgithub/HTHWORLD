import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet, Text, Image, View } from 'react-native';
import Config from 'react-native-config';
import T from 'components/Typography';
import LoadingSpinner from 'components/LoadingSpinner';

import { Layout, Body, Header, Footer } from 'components/Layout';
import _ from 'lodash';

import Button from 'components/Button';
import Input from 'components/Input';
import NavigatorService from 'lib/navigator';

const LANG_SIGN_UP_TEXT = 'LOG IN';

export default class Login extends Component {
  static propTypes = {
    hasMnemonic: PropTypes.bool.isRequired,
    navigation: PropTypes.any,
    loginRequest: PropTypes.func.isRequired,
    appReady: PropTypes.bool.isRequired,
    login: PropTypes.shape({
      errors: PropTypes.arrayOf(PropTypes.object),
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
        errorMessage: props.login.errors && props.login.errors[0] && props.login.errors[0].message
      };
    }
    return null;
  }

  handleSignupButton = () => {
    NavigatorService.navigate('Signup');
  };

  handleBypassButton = () => {
    if (this.props.hasMnemonic) {
      NavigatorService.resetReplace('Login', 'Menu');
    } else {
      NavigatorService.navigate('Mnemonic');
    }
  };

  handleFormSubmit = () => {
    this.setState({errorMessage: ''}, () => {
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
    if (!this.props.appReady) {
      return <LoadingSpinner />;
    }

    return (
      <Layout preload={false} keyboard>
        <Body scrollable style={styles.body}>
          <Header style={{ alignItems: 'center' }}>
            <Image
              style={styles.logo}
              source={require('assets/hoard_circle_logo.png')} // eslint-disable-line no-undef
            />
            <Text style={styles.title}>Log In</Text>
            {__DEV__ && (
              <View>
                <T.Small
                  style={styles.network}
                >{`Using: ${Config.ETHNET.toUpperCase()}`}</T.Small>
              </View>
            )}
          </Header>
          <Body>
            {this.state.errorMessage &&
              <View style={styles.errorMessageContainer}>
                <T.Light style={styles.errorMessage}>{this.state.errorMessage}</T.Light>
              </View>
            }
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
          </Body>
          <Footer>
            <Button type="text" onPress={this.handleSignupButton}>
              New to Hoard? Sign Up!
            </Button>
            <Button
              type="base"
              disabled={!this.state.password && !this.state.username_or_email}
              loading={this.state.loading}
              onPress={this.handleFormSubmit}
              style={styles.buttonContainerAlt}
            >
              {LANG_SIGN_UP_TEXT}
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
  container: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 20,
  },
  containerGradient: {
    borderRadius: 0,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    alignContent: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginTop: 10,
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
    fontWeight: 'bold'
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
  imageView: {
    flex: 1,
    flexShrink: 1,
    paddingTop: 40,
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  buttonContainerAlt: {
    marginVertical: 20,
  },
});
