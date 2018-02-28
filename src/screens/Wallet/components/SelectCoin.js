import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import Button from "components/Button";
import T from "components/Typography";
import { SUPPORTED_COINS_WALLET } from "containers/App/constants";
import SelectWalletSection from "components/SelectWalletSection";
import NavigatorService from 'lib/navigator';

const LANG_NEXT_TEXT = "Next";
const LANG_CANCEL_TEXT = "Cancel";

export default class Step1 extends Component {
  static propTypes = {
    saveAndContinue: PropTypes.func.isRequired
  };

  state = {
    selectedCoin: null
  };

  handleClick = selectedCoin => {
    this.setState({ selectedCoin });
  };

  handleDone = () => {
    this.props.saveAndContinue(this.state.selectedCoin);
  };

  handleCancel = () => {
    NavigatorService.navigate("Wallet");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <T.Heading style={styles.headingStyle}>Select Coin</T.Heading>
        </View>
        <View style={styles.bodyContainer}>
          <SelectWalletSection
            wallets={SUPPORTED_COINS_WALLET.map(symbol => ({
              publicAddress: symbol,
              symbol
            }))}
            selectedAddress={this.state.selectedCoin}
            selecting={true}
            showHeader={false}
            onSelect={this.handleClick}
            onToggleSelecting={() => {}}
          />
        </View>
        <View style={styles.footerContainer}>
          <Button
            type="primary"
            disabled={!this.state.selectedCoin}
            onPress={this.handleDone}
          >
            {LANG_NEXT_TEXT}
          </Button>
          <Button
            style={styles.cancelButton}
            type="text"
            onPress={this.handleCancel}
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
