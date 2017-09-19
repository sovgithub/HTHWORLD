// @flow
import React from 'react';
import { Alert, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Logo from './components/Logo';
import RoundedButton from './components/RoundedButton';

export default class App extends React.Component {
  handlePress = () => Alert.alert('Pressed me!')

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Logo />
          <Text style={styles.header}>Hoard</Text>
          <Text style={styles.subtitle}>Digital currency for everyone</Text>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  header: {
    fontSize: 70,
    fontWeight: '100',
    color: 'white',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '100',
    fontStyle: 'italic',
    color: 'white',
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
