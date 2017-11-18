import * as React from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Header from 'components/Header';
import RoundedButton from 'components/RoundedButton';

import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'oar-dev01.auth0.com', clientId: 'JW1RZB9vvkqyq7vyphEo1X7fHTxDXGmm' });

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

export default class Landing extends React.Component<Props, void> {
  handlePress = (initialScreen: string) => async () => {
    try {
      const credentials = await auth0
        .webAuth
        .authorize({scope: 'openid email', audience: 'https://oar-dev01.auth0.com/userinfo', initialScreen});
      console.log(credentials);
      console.log(JSON.stringify({
        access_token: credentials.accessToken,
        id_token: credentials.idToken
      }));
      this.props.navigation.navigate('Referral');
    }
    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Image style={styles.backgroundImage} source={require('assets/landing_bg.png')}>
        <StatusBar barStyle="light-content" />
        <Header style={StyleSheet.flatten(styles.contentContainer)}  />
        <View style={styles.actionsContainer}>
          <RoundedButton
            color="white"
            onPress={this.handlePress('signUp')}
          >
            Create An Account
          </RoundedButton>
          <View style={styles.signInContainer}>
            <Text style={styles.signInPrompt}>Have an account?</Text>
            <TouchableHighlight onPress={this.handlePress('login')}>
              <Text style={styles.signInButton}> Sign in!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
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
    color: 'lightblue',
  },
  signInButton: {
    fontWeight: 'bold',
    color: 'white',
  }
});
