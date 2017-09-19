// @flow
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Logo from './components/Logo';
import RoundedButton from './components/RoundedButton';

export default class App extends React.Component {
  handlePress = () => Alert.alert('Pressed me!')

  render() {
    return (
      <View style={styles.container}>
        <Logo />
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <RoundedButton
          color="blue"
          onPress={this.handlePress}
        >
          Create An Account
        </RoundedButton>
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
