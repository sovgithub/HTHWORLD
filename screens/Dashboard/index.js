import React from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class Dashboard extends React.Component {
  triggerBasicAlert = (label) => () => Alert.alert('Button Clicked', label)

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Currency Markets</Text>
        <Text style={styles.date}>September 2</Text>
        <View style={styles.carouselContainer}>
          <Text style={styles.text}>Carousel section</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Send or Request Money" onPress={this.triggerBasicAlert('Send/Request')}/>
          <Button title="Wallet" onPress={this.triggerBasicAlert('Wallet')}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1F27',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    marginTop: 100,
    margin: 10,
    fontSize: 30,
    color: 'white',
  },
  date: {
    marginBottom: 10,
    fontSize: 20,
    color: 'white',
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 'auto',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
});
