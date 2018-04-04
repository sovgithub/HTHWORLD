import { Text, StyleSheet } from 'react-native';

import React from 'react';

const Light = ({ style, ...otherProps }) => (
  <Text style={[styles.light, style]} {...otherProps} />
);
Light.propTypes = Text.propTypes;

const Heading = ({ style, ...otherProps }) => (
  <Text style={[styles.heading, style]} {...otherProps} />
);
Heading.propTypes = Text.propTypes;

const SubHeading = ({ style, ...otherProps }) => (
  <Text style={[styles.subheading, style]} {...otherProps} />
);
SubHeading.propTypes = Text.propTypes;

const GrayedOut = ({ style, ...otherProps }) => (
  <Text style={[styles.grayedOut, style]} {...otherProps} />
);
GrayedOut.propTypes = Text.propTypes;

const SemiBold = ({ style, ...otherProps }) => (
  <Text style={[styles.semiBold, style]} {...otherProps} />
);
SemiBold.propTypes = Text.propTypes;

const Small = ({ style, ...otherProps }) => (
  <Text style={[styles.small, style]} {...otherProps} />
);
Small.propTypes = Text.propTypes;

const ButtonText = ({ style, ...otherProps }) => (
  <Text style={[styles.small, style]} {...otherProps} />
);
ButtonText.propTypes = Text.propTypes;

const Price = ({ style, ...otherProps }) => (
  <Text style={[styles.price, style]} {...otherProps} />
);
Price.propTypes = Text.propTypes;

const PriceLarge = ({ style, ...otherProps }) => (
  <Text style={[styles.priceLarge, style]} {...otherProps} />
);
PriceLarge.propTypes = Text.propTypes;

const PriceHeading = ({ style, ...otherProps }) => (
  <Text style={[styles.priceHeading, style]} {...otherProps} />
);
PriceHeading.propTypes = Text.propTypes;

const TitleAlternate = ({ style, ...otherProps }) => (
  <Text style={[styles.titleAlternate, style]} {...otherProps} />
);
TitleAlternate.propTypes = Text.propTypes;

const SemiBoldAlternate = ({ style, ...otherProps }) => (
  <Text style={[styles.semiBoldAlternate, style]} {...otherProps} />
);
SemiBoldAlternate.propTypes = Text.propTypes;

const SubtitleAlternate = ({ style, ...otherProps }) => (
  <Text style={[styles.subtitleAlternate, style]} {...otherProps} />
);
SubtitleAlternate.propTypes = Text.propTypes;

const SmallAlternate = ({ style, ...otherProps }) => (
  <Text style={[styles.smallAlternate, style]} {...otherProps} />
);
SmallAlternate.propTypes = Text.propTypes;

const styles = StyleSheet.create({
  light: {
    fontFamily: 'OpenSans-Light',
    fontSize: 15,
    color: '#000',
    letterSpacing: 0,
  },
  heading: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 28,
    color: '#000',
    letterSpacing: -1.17,
  },
  subheading: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 18,
    color: '#000',
    letterSpacing: 0,
  },
  grayedOut: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 15,
    color: '#8F8F8F',
    letterSpacing: 0,
  },
  semiBold: {
    fontFamily: 'OpenSans-SemiBold',
  },
  small: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#000',
    letterSpacing: 0,
    lineHeight: 18,
  },
  price: {
    fontFamily: 'Exo-Light',
    fontSize: 24,
    color: '#000000',
    letterSpacing: 1,
  },
  priceLarge: {
    fontFamily: 'Exo-ExtraLight',
    fontSize: 32,
    color: '#FFFFFF',
    letterSpacing: 0,
  },
  priceHeading: {
    fontFamily: 'Exo-ExtraLight',
    fontSize: 44,
    color: '#FFFFFF',
    letterSpacing: 0,
  },
  titleAlternate: {
    fontFamily: 'Exo-Regular',
    fontSize: 20,
    color: '#000000',
    letterSpacing: 0,
    lineHeight: 24,
  },
  semiBoldAlternate: {
    fontFamily: 'Exo-SemiBold',
  },
  subtitleAlternate: {
    fontFamily: 'Exo-Regular',
    fontSize: 13,
    color: '#00EC9E',
    letterSpacing: 1,
  },
  smallAlternate: {
    fontFamily: 'Exo-Regular',
    fontSize: 12,
    color: '#000',
    letterSpacing: 1,
  },
  buttonText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    color: '#FFFFFF',
    letterSpacing: 0,
  },
});

export default {
  ButtonText,
  GrayedOut,
  Heading,
  Light,
  Price,
  PriceHeading,
  PriceLarge,
  SemiBold,
  SemiBoldAlternate,
  Small,
  SmallAlternate,
  SubHeading,
  SubtitleAlternate,
  TitleAlternate,
};
