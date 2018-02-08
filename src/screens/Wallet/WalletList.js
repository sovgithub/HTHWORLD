import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet } from 'react-native';

const WalletList = props => {
  return (
    <ScrollView style={[props.style, styles.container]}>
      {props.children}
    </ScrollView>
  );
};

export default WalletList;

WalletList.propTypes = {
  children: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  }
});
