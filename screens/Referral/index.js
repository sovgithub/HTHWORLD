// @flow
import React from 'react';
import { Alert, Image, StatusBar, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Header from 'components/Header';

export default function Referral() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header
        style={StyleSheet.flatten(styles.header)}
        textColor="blue"
        showSubtitle={false}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.textContent, styles.greeting]}>
          Fantastic work, Watson!
        </Text>
        <Text style={[styles.textContent, styles.placeInLine]}>
          There are currently <Text style={styles.bold}>4233,333</Text> people ahead of you.
          Skip the line by referring friends.
        </Text>
        <Text style={[styles.textContent, styles.referralLink]}>
          Your link: https://dev.hoardinvest.com
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  textContent: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'grey',
  },
  bold: {
    fontWeight: 'bold',
    fontStyle: 'normal',
  },
  greeting: {
    fontSize: 20,
    paddingBottom: 30,
  },
  placeInLine: {
    fontSize: 20,
    paddingBottom: 30,
  },
  referralLink: {
    fontSize: 15,
  },
});
