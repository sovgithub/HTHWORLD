/*
  Usage:
  <GradientText
    style={{ fontSize: 40 }}
    gradient={['#8900E4', '#DD007B']}
  >
    Create New Wallet
  </GradientText>
 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Text, MaskedViewIOS } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

export const GradientText = props => {
  return (
    <MaskedViewIOS maskElement={<Text {...props} />}>
      <LinearGradient
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 1 }}
        colors={props.gradient}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedViewIOS>
  );
};
