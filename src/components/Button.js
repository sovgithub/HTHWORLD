import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

export default class Button extends Component {
  static propTypes = {
    style: View.propTypes.style,
    onPress: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]).isRequired
  };

  static defaultProps = {
    style: {}
  };

  render() {
    let buttonContent;
    if (typeof this.props.children === 'string') {
      buttonContent = (
        <Text style={styles.buttonText}>{this.props.children}</Text>
      );
    } else {
      buttonContent = this.props.children;
    }

    return (
      <TouchableOpacity
        style={[styles.buttonContainer, this.props.style]}
        onPress={this.props.onPress}
      >
        {buttonContent}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    marginBottom: 30
  },
  buttonText: {
    textAlign: 'center',
    color: '#223252',
    fontWeight: '700'
  }
});
