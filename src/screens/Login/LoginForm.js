/**
 *
 * Login Form
 *
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";

const LANG_SIGN_UP_TEXT = "LOG IN";

class LoginForm extends Component {
  static propTypes = {
    navigation: PropTypes.any,
    loginRequest: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    loggedIn: false,
    error: false,
    email_address: null,
    password: null
  };

  handleSignupButton = () => {
    this.props.navigation.navigate("Signup");
  };

  handleFormSubmit = () => {
    if (
      this.state.email_address &&
      this.state.email_address.length > 1 &&
      this.state.password &&
      this.state.password.length > 1
    ) {
      this.props.loginRequest({
        email_address: this.state.email_address,
        password: this.state.password
      });
    }
  };

  updateFormField = fieldName => text => {
    this.setState({ [fieldName]: text });
  };

  render() {
    const placeholderTextColor = "rgba(255,255,255,0.75)";

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="you@email.com"
          placeholderTextColor={placeholderTextColor}
          returnKeyType="next"
          keyboardType="email-address"
          onSubmitEditing={() => this.loginPasswordInput.focus()}
          onChangeText={this.updateFormField("email_address")}
        />
        <TextInput
          ref={el => (this.loginPasswordInput = el)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="password"
          placeholderTextColor={placeholderTextColor}
          returnKeyType="go"
          secureTextEntry
          onChangeText={this.updateFormField("password")}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.handleFormSubmit}
        >
          <Text style={styles.buttonText}>{LANG_SIGN_UP_TEXT}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.handleSignupButton}
          style={styles.buttonContainerAlt}
        >
          <Text style={styles.buttonTextAlt}>New to Hoard? Sign Up!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(0,0,20, 0.25)",
    marginBottom: 15,
    color: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8
  },
  buttonContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#223252",
    fontWeight: "700"
  },
  buttonContainerAlt: {
    backgroundColor: "transparent",
    paddingVertical: 10,
    marginTop: 20
  },
  buttonTextAlt: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "700"
  }
});
