/**
 * Custom Drawer Menu
 */

import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { DrawerItems } from "react-navigation";
import {
  ScrollView,
  View,
  Button,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import { unsetUser } from "screens/User/actions";
import { getColors } from "styles";

class SideMenu extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    unsetUser: PropTypes.func.isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.imageView}
          imageStyle={styles.image}
          source={
            require("assets/BackgroundBlue.png") // eslint-disable-line no-undef
          }
        >
          <ScrollView style={{ paddingTop: 40 }}>
            <View style={{ backgroundColor: "transparent", flex: 1 }}>
              <View style={{ alignSelf: "flex-end" }}>
                <Button
                  title="X"
                  onPress={() => this.props.navigation.navigate("DrawerClose")}
                  color={
                    getColors().menu // eslint-disable-line react/prop-types
                  }
                />
              </View>
              <DrawerItems {...this.props} />
            </View>
          </ScrollView>
          <View style={styles.footerContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.unsetUser()}
            >
              <Text style={styles.buttonText}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { unsetUser })(SideMenu);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  footerContainer: {
    padding: 20
  },
  imageView: {
    flex: 1
  },
  image: {
    width: null,
    height: null,
    resizeMode: "cover"
  },
  buttonContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10
  },
  buttonText: {
    textAlign: "center",
    color: "#223252",
    fontWeight: "700"
  }
});
