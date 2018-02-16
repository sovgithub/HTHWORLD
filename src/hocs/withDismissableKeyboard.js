import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function withDismissableKeyboard(WrappedComponent) {
  return function DismissKeyboard(props) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <WrappedComponent {...props} />
      </TouchableWithoutFeedback>
    );
  };
}
