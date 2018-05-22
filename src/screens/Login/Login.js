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
import createStyles, { colors, gradients, typography } from 'styles';
import LinearGradient from 'react-native-linear-gradient';

const DismissableView = withDismissableKeyboard(View);

const styless = createStyles();

const customStyles = createStyles({
  header: {
    fontSize: typography.size.lg,
    color: colors.darkPink,
  },
});

export default class Login extends React.Component {
  static propTypes = {
    hasMnemonic: PropTypes.bool.isRequired,
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
        <DismissableView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require('assets/hoard_circle_logo.png')} // eslint-disable-line no-undef
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
              hasMnemonic={this.props.hasMnemonic}
              errors={this.props.login.errors}
            />
          </View>
        </DismissableView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerGradient: {
    borderRadius: 0,
  },

  logoContainer: {
    alignItems: 'center',
    flexGrow: 1,
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
