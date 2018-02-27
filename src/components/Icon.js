import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

const defaultIconStyles = {
  size: 40,
  color: '#FFFFFF'
};

export default class CustomIcon extends Component {
  static propTypes = {
    style: PropTypes.object,
    icon: PropTypes.string.isRequired
  };

  static defaultProps = {
    style: {}
  };

  render() {
    const styles = { ...defaultIconStyles, ...this.props.style };
    return <Icon name={this.props.icon} {...styles} />;
  }
}
