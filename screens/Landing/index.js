// @flow
import React from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Header from 'components/Header';
import RoundedButton from 'components/RoundedButton';

import Auth0 from 'react-native-auth0';
const auth0 = new Auth0({ domain: 'hoard.auth0.com', clientId: 'rFNquw0t3kVJLCJWCfzUxJPtXY09a6TT' });

export default class Landing extends React.Component {
  handlePress = () => auth0
    .webAuth
    .authorize({scope: 'openid email', audience: 'https://hoard.auth0.com/userinfo'})
    .then(credentials => {
      console.log(credentials);
      this.props.navigation.navigate('Referral')
    })
    .catch(error => console.log(error));

  render() {
    return (
      <Image style={styles.backgroundImage} source={require('assets/landing_bg.png')}>
        <StatusBar barStyle="light-content" />
        <Header style={StyleSheet.flatten(styles.contentContainer)}  />
        <View style={styles.actionsContainer}>
          <RoundedButton
            color="white"
            onPress={this.handlePress}
          >
            Create An Account
          </RoundedButton>
          <View style={styles.signInContainer}>
            <Text style={styles.signInPrompt}>Have an account?</Text>
            <TouchableHighlight onPress={this.handlePress}>
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
