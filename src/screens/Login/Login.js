import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Config from 'react-native-config';
import LoginForm from './LoginForm';
import withDismissableKeyboard from 'hocs/withDismissableKeyboard';
import T from 'components/Typography';
import { GradientText } from 'components/GradientText.js';
import { GradientButton } from 'components/GradientButton.js';
import Card from 'components/Card.js';
import SwipableList from 'components/SwipableList.js';
import LinearGradient from 'react-native-linear-gradient';

const DismissableView = withDismissableKeyboard(View);

const COINLIST = [
  { title: 'Bitcoin' },
  { title: 'Ethereum' },
  { title: 'Litecoin' },
  { title: 'Verge' },
  { title: 'Neo' },
  { title: 'OAR' },
  { title: 'Doge Coin' },
  { title: 'Bitcoin Cash' },
];

export default class Login extends React.Component {
  static propTypes = {
    navigation: PropTypes.any,
    loginRequest: PropTypes.func.isRequired,
    login: PropTypes.shape({
      errors: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  render() {
    return (
      <KeyboardAvoidingView
        imageStyle={styles.image}
        behavior="padding"
        style={styles.container}
      >
        <LinearGradient
          start={{ x: 0.0, y: 0.1 }}
          end={{ x: 0.1, y: 1.0 }}
          colors={['#282A3A', '#151A21']}
          style={[styles.container, styles.containerGradient]}
        >
          <DismissableView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require('assets/HoardLogoWhite.png')} // eslint-disable-line no-undef
              />
              <View>
                <Text style={styles.title}>Log In</Text>
              </View>
            </View>
            {__DEV__ && (
              <View>
                <T.Small
                  style={styles.network}
                >{`Using: ${Config.ETHNET.toUpperCase()}`}</T.Small>
              </View>
            )}
            <View style={styles.formContainer}>
              <LoginForm
                navigation={this.props.navigation}
                loginRequest={this.props.loginRequest}
                errors={this.props.login.errors}
              />
            </View>
          </DismissableView>
        </LinearGradient>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  containerz: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerGradient: {
    borderRadius: 0,
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginTop: 10,
    marginRight: 10,
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
    paddingTop: 40,
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  formContainer: {
    marginBottom: 10,
  },
});
