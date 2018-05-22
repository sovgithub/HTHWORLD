import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import SVG, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

export default class Input extends Component {
  static propTypes = {
    hasValue: PropTypes.bool,
  };

  render() {
    return (
      <View style={{marginRight: '14'}}>
      <SVG
        height="35"
        width="35"
      >
        <Defs>
          <LinearGradient id="grad" y1="4.5" x1="0" y2="30.5" x2="0">
            <Stop offset="0" stopColor="rgb(153,47,238)" />
            <Stop offset="1" stopColor="rgb(230,34,131)" />
          </LinearGradient>
        </Defs>
        <Circle
          cx="17.5"
          cy="17.5"
          r="13"
          stroke="url(#grad)"
          strokeWidth="1"
          fill={this.props.hasValue ? "url(#grad)" : "transparent"}
        />
      </SVG>
      </View>
    );
  }
}
