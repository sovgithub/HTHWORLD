// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Logo from './components/Logo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
