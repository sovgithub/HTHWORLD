/**
 *
 * SignUp Component
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

const LANG_SIGN_UP_TEXT = "Sign Up";

class SignUpForm extends Component {
  static propTypes = {
    navigation: PropTypes.any,
    signupRequest: PropTypes.func.isRequired
  };

  state = {
    loading: false,
    loggedIn: false,
    error: false,
    first_name: null,
    last_name: null,
    phone_number: null,
    email_address: null,
    password: null
  };

  handleLogInButton = () => {
    this.props.navigation.navigate("Login");
  };

  handleFormSubmit = () => {
    const userSignupData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number,
      email_address: this.state.email_address,
      password: this.state.password
    };

    this.props.signupRequest(userSignupData);
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
          autoCorrect={false}
          placeholder="First Name"
          placeholderTextColor={placeholderTextColor}
          returnKeyType="next"
          onSubmitEditing={() => this.signupLastNameInput.focus()}
          onChangeText={this.updateFormField("first_name")}
        />
        <TextInput
          ref={el => (this.signupLastNameInput = el)}
          style={styles.input}
          autoCorrect={false}
          placeholder="Last Name"
          placeholderTextColor={placeholderTextColor}
          returnKeyType="next"
          onSubmitEditing={() => this.signupPhoneNumberInput.focus()}
          onChangeText={this.updateFormField("last_name")}
        />
        <TextInput
          ref={el => (this.signupPhoneNumberInput = el)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Phone: 1-555-555-5555"
          placeholderTextColor={placeholderTextColor}
          returnKeyType="next"
          keyboardType="numeric"
          onSubmitEditing={() => this.signupEmailAddressInput.focus()}
          onChangeText={this.updateFormField("phone_number")}
        />
        <TextInput
          ref={el => (this.signupEmailAddressInput = el)}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="you@email.com"
          placeholderTextColor={placeholderTextColor}
          returnKeyType="next"
          keyboardType="email-address"
          onSubmitEditing={() => this.signupPasswordInput.focus()}
          onChangeText={this.updateFormField("email_address")}
        />
        <TextInput
          ref={el => (this.signupPasswordInput = el)}
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
          style={styles.buttonContainerAlt}
          onPress={this.handleLogInButton}
        >
          <Text style={styles.buttonTextAlt}>
            Already have an account? Log In!
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignUpForm;

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
