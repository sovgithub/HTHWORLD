import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';

const Header = ({ style, children, ...otherProps }) => (
  <View style={[styles.header, style]} {...otherProps}>
    {children}
  </View>
);
Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  header: {},
});

export default Header;
