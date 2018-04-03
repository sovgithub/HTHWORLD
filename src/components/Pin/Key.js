import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'components/Icon';

export default class Key extends Component {
  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    label2: PropTypes.string,
    icon: PropTypes.string,
    handlePinPress: PropTypes.func,
  };

  handlePinPress = () => {
    this.props.handlePinPress(this.props.value);
  };

  render() {
    if (!this.props.label && this.props.label2 && !this.props.value) {
      return <View style={styles.keyEmpty} />;
    }
    return (
      <TouchableOpacity
        style={[styles.key, this.props.label.length == 0 && styles.keyEmpty]}
        onPress={this.handlePinPress}
      >
        {this.props.icon && (
          <Icon
            icon={this.props.icon}
            style={{ position: 'absolute', color: '#333' }}
          />
        )}
        <Text style={{ fontSize: 26 }}>{this.props.label}</Text>
        <Text style={{ fontSize: 12 }}>{this.props.label2}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  key: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '33.33%',
    height: 70,
    borderWidth: 1,
    borderColor: 'rgb(239, 239, 244)',
    flexGrow: 1,
    paddingTop: 8,
  },
  keyEmpty: {
    backgroundColor: 'rgb(239, 239, 244)',
  },
});
