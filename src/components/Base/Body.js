import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  View,
  ViewPropTypes,
  Platform,
} from 'react-native';

const Body = ({ style, children, ...otherProps }) => {
  if (otherProps.scrollable) {
    const dismissKeyboard = otherProps.dismissKeyboard;
    const dismissMode = Platform.OS === 'ios' ? 'on-drag' : 'none';
    return (
      <ScrollView
        bounces={otherProps.bounces}
        style={[styles.body, style]}
        keyboardShouldPersistTaps={dismissKeyboard}
        keyboardDismissMode={dismissMode}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    );
  } else {
    return (
      <View style={[styles.body, style]} {...otherProps}>
        {children}
      </View>
    );
  }
};

Body.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default Body;
