import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import Config from 'react-native-config';
import LoginForm from './LoginForm';
import withDismissableKeyboard from 'hocs/withDismissableKeyboard';
import T from 'components/Typography';
import ErrorBoundary from 'components/ErrorBoundary';
import Fabric from 'react-native-fabric';
var { Crashlytics } = Fabric;
const DismissableView = withDismissableKeyboard(View);

export default class Login extends React.Component {
  static propTypes = {
    navigation: PropTypes.any,
    loginRequest: PropTypes.func.isRequired,
    login: PropTypes.shape({
      errors: PropTypes.arrayOf(PropTypes.object),
    }),
  };

  crash() {
    throw new Error('Oops');
    return;
    Crashlytics.setUserName('megaman');

    Crashlytics.setUserEmail('user@email.com');

    Crashlytics.setUserIdentifier('1234');

    Crashlytics.setBool('has_posted', true);

    Crashlytics.setString('organization', 'Acme. Corp');

    // Forces a native crash for testing
    Crashlytics.crash();

    // Due to differences in primitive types between iOS and Android I've exposed a setNumber function vs. setInt, setFloat, setDouble, setLong, etc
    Crashlytics.setNumber('post_count', 5);

    // Record a non-fatal JS error only on Android
    Crashlytics.logException('');

    // Record a non-fatal JS error only on iOS
    Crashlytics.recordError('something went wrong!');
  }

  render() {
    return (
      <ErrorBoundary>
        <KeyboardAvoidingView
          imageStyle={styles.image}
          behavior="padding"
          style={styles.container}
        >
          <DismissableView style={styles.container}>
            <StatusBar barStyle="light-content" />
            <ImageBackground
              style={styles.imageView}
              imageStyle={styles.image}
              source={require('assets/BackgroundBlue.png')} // eslint-disable-line no-undef
            >
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('assets/HoardLogoWhite.png')} // eslint-disable-line no-undef
                />
                <View>
                  <Text style={styles.title}>Log In Soon</Text>
                  <Button onPress={this.crash} title="Crash" />
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
            </ImageBackground>
          </DismissableView>
        </KeyboardAvoidingView>
      </ErrorBoundary>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
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
