/*
 Usage:
   <GradientButton
     style={{ fontSize: 40 }}
     gradient={['#8900E4', '#DD007B']}
   >
     Create New Wallet
   </GradientButton>
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export const GradientButton = props => {
  return (
    <TouchableOpacity style={styles.button}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={props.gradient}
        style={styles.buttonGradient}
      >
        <Text {...props} style={styles.buttonText} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  button: {},
  buttonGradient: {
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderRadius: 50,
  },
});

export default GradientButton;
