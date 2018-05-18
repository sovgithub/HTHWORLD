import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";
import PropTypes from "prop-types";
import createStyles, { dimensions, colors, padding, typography } from 'styles';

import Button from "components/Button";
import T from "components/Typography";

export default class Type extends Component {
  static propTypes = {
    saveAndContinue: PropTypes.func.isRequired,
    newMnemonicType: PropTypes.string.isRequired,
    existingMnemonicType: PropTypes.string.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('assets/droplet.png')}
          />
        </View>
        <View style={styles.bodyContainer}>
          <T.Heading style={styles.heading}>
            Create New Mnemonic
          </T.Heading>
          <T.Light style={styles.content}>
            We will walk you through the process of generating a new mnemonic phrase.
            This 12 word list will allow you to generate recover your wallets in the
            future.
          </T.Light>
          <View style={styles.buttonsContainer}>
            <Button
              style={styles.generateButton}
              onPress={this.props.saveAndContinue(this.props.newMnemonicType)}
            >
              Let's Get Started!
            </Button>
            <Button
              type="text"
              style={styles.recoverButton}
              onPress={this.props.saveAndContinue(this.props.existingMnemonicType)}
            >
              Actually, I've Done This Before
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const imageWidth = dimensions.width * 0.40;
const imageHeight = imageWidth * 1.0989010989;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: padding.md,
    paddingBottom: padding.xl,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: padding.lg,
  },
  image: {
    height: imageHeight,
    width: imageWidth,
    resizeMode: 'contain',
  },
  bodyContainer: {
    flex: 1
  },
  heading: {
    color: colors.white,
    paddingBottom: padding.md,
    textAlign: 'center',
  },
  content: {
    color: colors.white,
    textAlign: 'center',
    fontFamily: typography.family.primary,
    lineHeight: typography.lineHeight.normal,
    fontSize: typography.size.md,
    fontWeight: typography.weight.thin,
  },
  buttonsContainer: {
    marginTop: 'auto'
  },
  generateButton: {
    marginBottom: padding.lg,
  },
  recoverButton: {
  },
});
