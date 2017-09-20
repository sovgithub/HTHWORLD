// @flow
import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Header from './components/Header';
import RoundedButton from './components/RoundedButton';

export default class App extends React.Component {
  handlePress = () => Alert.alert('Pressed me!')

  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b2026',
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
    fontWeight: 'bold',
    color: 'lightblue',
  },
  signInButton: {
    fontWeight: 'bold',
    color: 'white',
  }
});
