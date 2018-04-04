import React from "react";
import PropTypes from "prop-types";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import Button from "components/Button";
import T from "components/Typography";
import WalletListEntry from "./WalletListEntry";
import PortfolioChart from 'containers/PortfolioChart';

class Wallet extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired,
    wallets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    prices: PropTypes.objectOf(PropTypes.number),
    getCurrencyPrice: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.wallets.map(
      ({symbol}) => this.props.getCurrencyPrice(symbol)
    );
  }

  handleNavigateToCoinInfo = (address, coin) => () => {
    this.props.navigation.navigate("CoinInformation", { address, coin });
  };

  handleWalletGenerate = () => {
    this.props.navigation.navigate("Mnemonic");
  };

  handleWalletRecover = () => {
    this.props.navigation.navigate("Recover");
  };

  render() {
    const totalPrice = this.props.wallets.reduce(
      (total, wallet) => (wallet.balance * this.props.prices[wallet.symbol]) + total,
      0
    );

    return (
      <ImageBackground
        style={styles.container}
        imageStyle={styles.backgroundImage}
        source={require("assets/BackgroundBlue.png")}
      >
        <ScrollView
          style={[styles.transparentBackground, styles.container]}
          contentContainerStyle={[styles.transparentBackground, styles.container]}
          bounces={false}
        >
          <View
            style={[
              styles.tranparentBackground,
              styles.headingContainer
            ]}
          >
            <View style={styles.currentBalance}>
              <T.Small style={styles.text}>Current Balance</T.Small>
              <T.PriceLarge style={styles.text}>
                ${totalPrice.toFixed(2)}
              </T.PriceLarge>
            </View>
            <PortfolioChart />
            <View style={[styles.container, {marginTop: 20}]}>
              <View style={styles.pagerContainer}>
                <View
                  style={[styles.pagerIndicator, styles.pagerIndicatorSelected]}
                />
                <View style={styles.pagerIndicator} />
                <View style={styles.pagerIndicator} />
              </View>
            </View>
          </View>
          <View
            style={[
              styles.walletContainer,
              styles.container
            ]}
          >
            <View style={styles.walletHeadingContainer}>
              <T.SubHeading style={styles.walletHeading}>Holdings</T.SubHeading>
            </View>
            {this.props.wallets.map((wallet, i) => {
              const { balance, symbol, publicAddress } = wallet;
              const price = this.props.prices[symbol];

              return (
                <WalletListEntry
                  key={`wallet-${i}`}
                  name={`My ${symbol} Wallet`}
                  symbol={symbol}
                  balance={balance}
                  change={"0%"}
                  publicAddress={publicAddress}
                  onPress={this.handleNavigateToCoinInfo(publicAddress, symbol)}
                  value={(Number(price) * Number(balance)).toFixed(2)}
                />
              );
            })}
            {this.props.wallets.length === 0 && (
              <T.SubHeading style={styles.emptyText}>
                Create or recover a wallet!
              </T.SubHeading>
            )}
            <View style={styles.footerContainer}>
              <Button
                style={styles.buttonLeft}
                type="secondary"
                onPress={this.handleWalletGenerate}
              >
                Create
              </Button>
              <Button
                style={styles.buttonRight}
                type="secondary"
                onPress={this.handleWalletRecover}
              >
                Recover
              </Button>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headingContainer: {
    minHeight: 200,
    alignItems: 'center',
    marginTop: 40
  },
  backgroundImage: {
    width: null,
    height: null,
    resizeMode: "cover"
  },
  transparentBackground: {
    backgroundColor: "transparent"
  },
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  currentBalance: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  text: {
    color: "white"
  },
  positive: {
    color: "#00EC5F"
  },
  pagerContainer: {
    marginTop: "auto",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  pagerIndicator: {
    margin: 2,
    width: 7,
    height: 7,
    backgroundColor: "transparent",
    borderRadius: 10,
    borderColor: "#00EC5F",
    borderWidth: 1,
    borderStyle: "solid"
  },
  pagerIndicatorSelected: {
    margin: 2,
    width: 14,
    height: 7,
    backgroundColor: "#00EC5F",
    borderRadius: 10,
    borderColor: "#00EC5F",
    borderWidth: 1,
    borderStyle: "solid"
  },
  walletContainer: {
    backgroundColor: "white",
    marginBottom: 'auto',
  },
  walletHeadingContainer: {
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: "solid",
    borderColor: "#f7f7f7"
  },
  walletHeading: {
    fontWeight: "bold"
  },
  emptyText: {
    padding: 20
  },
  footerContainer: {
    flexDirection: "row",
    padding: 15
  },
  buttonLeft: {
    flex: 1,
    marginRight: 7.5
  },
  buttonRight: {
    flex: 1,
    marginLeft: 7.5
  }
});

export default Wallet;
