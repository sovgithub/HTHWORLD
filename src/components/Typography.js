import {
  Text,
  StyleSheet,
} from "react-native";

import React from "react";

const Light = ({style, ...otherProps}) => (
  <Text style={[styles.light, style]} {...otherProps} />
);
Light.propTypes = Text.propTypes;

const Heading = ({style, ...otherProps}) => (
  <Text style={[styles.heading, style]} {...otherProps} />
);
Heading.propTypes = Text.propTypes;

const SubHeading = ({style, ...otherProps}) => (
  <Text style={[styles.subheading, style]} {...otherProps} />
);
SubHeading.propTypes = Text.propTypes;

const GrayedOut = ({style, ...otherProps}) => (
  <Text style={[styles.grayedOut, style]} {...otherProps} />
);
GrayedOut.propTypes = Text.propTypes;

const SemiBold = ({style, ...otherProps}) => (
  <Text style={[styles.semiBold, style]} {...otherProps} />
);
SemiBold.propTypes = Text.propTypes;

const Small = ({style, ...otherProps}) => (
  <Text style={[styles.small, style]} {...otherProps} />
);
Small.propTypes = Text.propTypes;

const ButtonText = ({style, ...otherProps}) => (
  <Text style={[styles.small, style]} {...otherProps} />
);
ButtonText.propTypes = Text.propTypes;

const styles = StyleSheet.create({
  light: {
    fontFamily: 'OpenSans-Light',
    fontSize: 15,
    color: '#000',
    letterSpacing: 0
  },
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 28,
    color: '#000',
    letterSpacing: -1.17
  },
  subheading: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: '#000',
    letterSpacing: 0
  },
  grayedOut: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    color: '#8F8F8F',
    letterSpacing: 0
  },
  semiBold: {
    fontFamily: 'OpenSans-SemiBold'
  },
  small: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#000',
    letterSpacing: 0,
    lineHeight: 18
  },
  buttonText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: '#FFFFFF',
    letterSpacing: 0
  }
});


export default {
  Light,
  Heading,
  SubHeading,
  GrayedOut,
  SemiBold,
  Small,
  ButtonText
};
