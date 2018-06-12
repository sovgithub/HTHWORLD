import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ViewPropTypes } from 'react-native';

const Footer = ({ style, children, ...otherProps }) => {
  const stylesFromProps = {
    ...(otherProps.push && {
      marginTop: 'auto',
    }),
  };
  return (
    <View style={[styles.footer, stylesFromProps, style]} {...otherProps}>
      {children}
    </View>
  );
};

Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  footer: { marginBottom: 20 },
});

export default Footer;
