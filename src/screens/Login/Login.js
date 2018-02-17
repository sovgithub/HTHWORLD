import React from "react";
import PropTypes from "prop-types";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  View,
  KeyboardAvoidingView
} from "react-native";
import LoginForm from "./LoginForm";
import withDismissableKeyboard from "hocs/withDismissableKeyboard";

const DismissableView = withDismissableKeyboard(View);

export default class Login extends React.Component {
  static propTypes = {
    navigation: PropTypes.any,
    loginRequest: PropTypes.func.isRequired,
    login: PropTypes.shape({
      errors: PropTypes.arrayOf(PropTypes.object)
    })
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
          <ImageBackground
            style={styles.imageView}
            imageStyle={styles.image}
            source={require("assets/BackgroundBlue.png")} // eslint-disable-line no-undef
          >
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("assets/HoardLogoWhite.png")} // eslint-disable-line no-undef
              />
              <Text style={styles.title}>Log In</Text>
            </View>
            <View style={styles.formContainer}>
              <LoginForm
                navigation={this.props.navigation}
                loginRequest={this.props.loginRequest}
                errors={this.props.login.errors}
              />
            </View>
          </ImageBackground>
        </DismissableView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1
  },
  logoContainer: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignContent: "center"
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    marginTop: 10,
    marginRight: 10
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 40,
    fontWeight: "100",
    textAlign: "center"
  },
  subtext: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
    textAlign: "center"
  },
  imageView: {
    flex: 1,
    paddingTop: 40
  },
  image: {
    width: null,
    height: null,
    resizeMode: "cover"
  },
  formContainer: {
    marginBottom: 10
  }
});
