import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import T from 'components/Typography';

const RoundedButton = props => {
  return (
    <TouchableHighlight
      style={[
        styles.container,
        {
          backgroundColor: props.backgroundColor,
          borderColor: props.color,
        },
        props.style,
      ]}
      underlayColor={props.underlayColor}
      onPress={props.onPress}
    >
      <View style={{ flex: 1 }}>
        <T.Light style={[styles.text, { color: props.color }]}>
          {props.children}
        </T.Light>
      </View>
    </TouchableHighlight>
  );
};

RoundedButton.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  style: TouchableHighlight.propTypes.style,
  underlayColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

RoundedButton.defaultProps = {
  backgroundColor: 'transparent',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RoundedButton;
