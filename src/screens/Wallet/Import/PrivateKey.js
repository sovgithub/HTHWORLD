import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";

import Button from "components/Button";
import Input from "components/Input";
import T from "components/Typography";

const LANG_RECOVER_TEXT = "Recover";
const LANG_CANCEL_TEXT = "Cancel";

export default class PrivateKey extends Component {
  static propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  state = {
    privateKey: ""
  };

  updateAnswer = privateKey => this.setState({ privateKey });

  handleNextButton = () => {
    this.props.onSubmit(this.state.privateKey);
  };

  render() {
    const { onCancel } = this.props;
    const { privateKey } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <T.Heading style={styles.headingStyle}>
            Input your private key
          </T.Heading>
        </View>
        <Input
          style={styles.input}
          autoCapitalize="none"
          returnKeyType="done"
          light={true}
          label={`private key`}
          value={privateKey}
          onChangeText={this.updateAnswer}
        />
        <View style={styles.footerContainer}>
          <Button
            type="primary"
            disabled={!privateKey}
            onPress={this.handleNextButton}
          >
            {LANG_RECOVER_TEXT}
          </Button>
          <Button type="text" onPress={onCancel}>
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
  footerContainer: {
    padding: 20,
    marginTop: "auto"
  },
  input: {
    margin: 20
  }
});
