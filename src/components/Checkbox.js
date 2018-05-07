import React from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  View,
  TouchableHighlight,
  ViewPropTypes,
} from 'react-native';
import Icon from 'components/Icon';

const PLATFORM_ICONS = {
  ios: {
    checked: 'ios-checkbox-outline',
    unchecked: 'ios-square-outline',
  },
  android: {
    checked: 'md-checkbox-outline',
    unchecked: 'md-square-outline-blank',
  },
}[Platform.OS];

export default function Checkbox(props) {
  const icon = props.value ? PLATFORM_ICONS.checked : PLATFORM_ICONS.unchecked;
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View style={props.style}>
        <Icon style={props.iconStyle} icon={icon} />
      </View>
    </TouchableHighlight>
  );
}

Checkbox.propTypes = {
  iconStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  value: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
};
