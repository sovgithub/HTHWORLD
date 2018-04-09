import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

import Button from "components/Button";
import T from "components/Typography";

const LANG_CANCEL_TEXT = "Cancel";

export default class Type extends Component {
  static propTypes = {
    saveAndContinue: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <T.Heading style={styles.headingStyle}>
            Create New Mnemonic
          </T.Heading>
        </View>
        <View style={styles.bodyContainer}>
          {this.props.options.map(({ title, value }) => (
            <Button
              key={value}
              type="primary"
              style={styles.button}
              onPress={this.props.saveAndContinue(value)}
            >
              {title}
            </Button>
          ))}
        </View>
        <View style={styles.footerContainer}>
          <Button
            style={styles.cancelButton}
            type="text"
            onPress={this.props.goBack}
          >
            {LANG_CANCEL_TEXT}
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#223252"
  },
  headingStyle: {
    color: "#ffffff"
  },
  bodyContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 0
  },
  button: {
    marginBottom: 20
  },
  footerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10
  },
  cancelButton: {
    marginTop: 10,
    paddingVertical: 10
  }
});
