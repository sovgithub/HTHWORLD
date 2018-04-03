import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Input from './Input';

export default class InputList extends Component {
  static propTypes = {
    pinValue: PropTypes.string,
    pinLength: PropTypes.number,
  };

  render() {
    return (
      <View
        style={{
          flex: -1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {this.renderPinInputs()}
      </View>
    );
  }

  renderPinInputs() {
    let pills = [];

    for (var i = 0; i < this.props.pinLength; i++) {
      pills.push(this.renderPill(i + 1));
    }

    return pills;
  }

  renderPill(index) {
    return <Input key={index} hasValue={this.props.pinValue.length >= index} />;
  }
}
