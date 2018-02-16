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
import SignupForm from "./SignupForm";
import withDismissableKeyboard from "hocs/withDismissableKeyboard";

const DismissableView = withDismissableKeyboard(View);

export default class Signup extends React.Component {
  static propTypes = {
    navigation: PropTypes.any,
    signupRequest: PropTypes.func.isRequired
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
            source={require("assets/BackgroundBlue.png")}
          >
            <View style={styles.logoContainer}>
              <Image
                style={styles.logo}
                source={require("assets/HoardLogoWhite.png")}
              />
              <Text style={styles.title}>Sign Up</Text>
            </View>
            <View style={styles.formContainer}>
              <SignupForm
                navigation={this.props.navigation}
                signupRequest={this.props.signupRequest}
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
