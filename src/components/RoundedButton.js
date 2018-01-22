import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

const RoundedButton = (props) => {
  return (
    <TouchableHighlight
      style={[
        styles.container,
        {
          backgroundColor: props.backgroundColor,
          borderColor: props.color
        },
        props.style
      ]}
      underlayColor={props.underlayColor}
      onPress={props.onPress}
    >
    <Text style={[styles.text, {color: props.color}]}>{props.children}</Text>
    </TouchableHighlight>
  );
};

RoundedButton.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  style: PropTypes.object,
  underlayColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

RoundedButton.defaultProps = {
  backgroundColor: 'transparent',
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 30,
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  }
});

export default RoundedButton;
