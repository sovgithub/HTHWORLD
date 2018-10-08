import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import Swiper from 'components/Swiper';
import T from 'components/Typography';

const Intro = props => (
  <View style={styles.container}>
    <Swiper onFinished={() => props.navigation.navigate('Menu')}>
      <View style={styles.slide}>
        <T.Heading style={styles.heading}>Smaug Protocol</T.Heading>
        <T.Small style={styles.small}>
          Enterprise class 2nd layer cross-chain exchange engine to facilitate
          instant and atomic transactions.
        </T.Small>
      </View>
      <View style={styles.slide}>
        <T.Heading style={styles.heading}>Active Oracle</T.Heading>
        <T.Small style={styles.small}>
          Multi-chain explorer monitoring real-time on-chain transactions and
          balances for Masternodes.
        </T.Small>
      </View>
      <View style={styles.slide}>
        <T.Heading style={styles.heading}>HTH Node</T.Heading>
        <T.Small style={styles.small}>
          Masternode network providing adjudication, verification, and
          governance across channels.
        </T.Small>
      </View>
    </Swiper>
  </View>
);

Intro.propTypes = {
  navigation: PropTypes.object
};

export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slide: {
    flex: 1, // Take up all screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#1B273F',
    padding: 20
  },
  heading: {
    color: '#ffffff',
    fontWeight: '200',
    padding: 20,
    lineHeight: 10
  },
  small: {
    color: '#ffffff',
    lineHeight: 26
  }
});
