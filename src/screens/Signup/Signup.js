import React from 'react';
import PropTypes from 'prop-types';
import {
  StatusBar,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import SignupForm from './SignupForm';
import withDismissableKeyboard from 'hocs/withDismissableKeyboard';

const DismissableView = withDismissableKeyboard(View);

export default class Signup extends React.Component {
  static propTypes = {
    navigation: PropTypes.any,
    signupRequest: PropTypes.func.isRequired,
  };

  render() {
    return (
      <KeyboardAvoidingView
        imageStyle={styles.image}
        behavior="padding"
        style={styles.container}
      >
        <DismissableView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <SignupForm
            navigation={this.props.navigation}
            signupRequest={this.props.signupRequest}
          />
        </DismissableView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  title: {
    color: '#fff',
    marginTop: 10,
    fontSize: 40,
    fontWeight: '100',
    textAlign: 'center',
  },
  subtext: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  imageView: {
    flex: 1,
    paddingTop: 40,
  },
  image: {
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});
