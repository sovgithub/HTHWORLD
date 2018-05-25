import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

export const Header = ({ style, children, ...otherProps }) => (
  <View style={[styles.header, style]} {...otherProps}>
    {children}
  </View>
);

export const Body = ({ style, children, ...otherProps }) => {
  if (otherProps.scrollable) {
    return (
      <View style={[styles.body, style]} {...otherProps}>
        <ScrollView style={styles.bodyScroll}>{children}</ScrollView>
      </View>
    );
  } else {
    return (
      <View style={[styles.body, style]} {...otherProps}>
        <View style={styles.bodyScroll}>{children}</View>
      </View>
    );
  }
};

export const Footer = ({ style, children, ...otherProps }) => {
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

export const Layout = ({ style, isLoading, children, ...otherProps }) => (
  <View style={[styles.layout, style]} {...otherProps}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  layout: {},
  card: {
    margin: 5,
    shadowRadius: 7,
    shadowColor: 'rgba(0,0,0,0.75)',
    shadowOffset: { height: 2, width: 0 },
  },
  loader: {
    position: 'absolute',
    backgroundColor: '#f1c40f',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: '#3498db',
  },
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
  },
  bodyScroll: {
    flex: 1,
    padding: 10,
    backgroundColor: 'transparent',
  },
  footer: {
    backgroundColor: '#e74c3c',
  },
  text: {
    backgroundColor: '#8e44ad',
    padding: 5,
    marginBottom: 5,
    color: 'white',
  },
});
