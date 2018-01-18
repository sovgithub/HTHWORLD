import * as React from 'react';
import { Alert, Button, ImageBackground, StatusBar, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Header from 'components/Header';
import RoundedButton from 'components/RoundedButton';
import {getColors, Colors, setTheme, getTheme, Theme} from 'styles';

import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'oar-dev01.auth0.com', clientId: 'JW1RZB9vvkqyq7vyphEo1X7fHTxDXGmm' });

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

interface State {
  currentTheme: Theme;
  loading: boolean;
}

export default class Landing extends React.Component<Props, State> {
  state = {
    currentTheme: getTheme(),
    loading: false
  };

  handlePress = (initialScreen: string) => async () => {
    this.setState({loading: true});
    try {
      const credentials = await auth0
        .webAuth
        .authorize({scope: 'openid email', audience: 'https://oar-dev01.auth0.com/userinfo', initialScreen});
      console.log(credentials);
      console.log(JSON.stringify({
        access_token: credentials.accessToken,
        id_token: credentials.idToken
      }));
      this.props.navigation.navigate('Dashboard');
    }
    catch (error) {
      console.log(error);
      this.setState({loading: false})
    }
  }

  handleThemeSwitch = () => {
    this.setState({
      currentTheme: setTheme(
        getTheme() === Theme.light ? Theme.dark : Theme.light
      )
    })
  }

  render() {
    const themeColors = getColors();
    const themedStyles = getThemedStyles(getColors());

    return (
      <ImageBackground style={styles.imageView} imageStyle={styles.image} source={require('assets/landing_bg.png')}>
        <StatusBar barStyle={this.state.currentTheme === Theme.light ? 'dark-content' : 'light-content'} />
        <Header style={StyleSheet.flatten(styles.contentContainer)}  />
        {this.state.loading
          ? (<Text>...</Text>)
          : (
            <View style={styles.actionsContainer}>
              <RoundedButton
                color={themeColors.textPrimary}
                onPress={this.handlePress('signUp')}
              >
                Create An Account
              </RoundedButton>
              <View style={styles.signInContainer}>
                <Text style={[styles.signInPrompt, themedStyles.signInPrompt]}>Have an account?</Text>
                <TouchableHighlight onPress={this.handlePress('login')}>
                  <Text style={[styles.signInButton, themedStyles.signInButton]}> Sign in!</Text>
                </TouchableHighlight>
              </View>
              <Button title={`switch theme from ${this.state.currentTheme}`} onPress={this.handleThemeSwitch} color={themeColors.interactivePrimaryText} />
            </View>
          )
        }
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  imageView: {
    flex: 1,
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 100,
  },
  actionsContainer: {
    marginTop: 'auto',
    width: '100%',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  signInPrompt: {
    backgroundColor: 'transparent',
    fontWeight: 'bold',
  },
  signInButton: {
    fontWeight: 'bold',
  }
});

const getThemedStyles = (colors: Colors) => {
  return {
    signInButton: {
      color: colors.textPrimary
    },
    signInPrompt: {
      color: colors.textSecondary
    }
  };
};
