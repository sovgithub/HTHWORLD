import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import T from 'components/Typography';

const SectionHeader = ({ children }) => (
  <View style={styles.container}>
    <T.SubHeading style={styles.heading}>{children}</T.SubHeading>
  </View>
);

SectionHeader.propTypes = {
  children: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderBottomWidth: StyleSheet.hairline,
    borderColor: 'lightgrey',
    borderStyle: 'solid',
  },
  heading: {
    fontWeight: '700',
  },
});

export default SectionHeader;
