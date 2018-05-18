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
import MenuHeader from 'components/MenuHeader';
import Scene from 'components/Scene';

class Wallet extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired,
    wallets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    hasMnemonic: PropTypes.bool,
    hasAvailableCoins: PropTypes.bool,
    prices: PropTypes.objectOf(PropTypes.number),
    getCurrencyPrice: PropTypes.func.isRequired
  };

  componentDidMount() {
    if (!this.props.hasMnemonic) {
      this.handleMnemonicGenerate();
    }

    this.props.wallets.map(
      ({symbol}) => this.props.getCurrencyPrice(symbol)
    );
  }

  handleNavigateToCoinInfo = (id, coin) => () => {
    this.props.navigation.navigate("CoinInformation", { id, coin });
  };

  handleMnemonicGenerate = () => {
    this.props.navigation.navigate('Mnemonic');
  };

  handleWalletTrack = () => {
    this.props.navigation.navigate('Track');
  };

  handleWalletImport = () => {
    this.props.navigation.navigate('Import');
  };

  renderActionButtons() {
    const buttons = [];

    if (this.props.hasMnemonic) {
      if (this.props.hasAvailableCoins) {
        buttons.push({
          type: 'base',
          onPress: this.handleWalletTrack,
          text: 'Track Coin',
        });
      }

      // disabled for MVP
      /* buttons.push({
       *   type: 'text',
       *   onPress: this.handleWalletImport,
       *   text: 'import wallet',
       *   style: {
       *     marginTop: 20,
       *     marginBottom: 5
       *   }
       * });*/
    } else {
      buttons.push({
        type: 'secondary',
        onPress: this.handleMnemonicGenerate,
        text: 'Make Mnemonic'
      });
    }

    return (
      <View style={styles.footerContainer}>
        {buttons.map(({style, type, onPress, text, ...rest}) => (
          <Button
            key={text}
            style={style}
            type={type}
            onPress={onPress}
            {...rest}
          >
            {text}
          </Button>
        ))}
      </View>
    );
  }

  render() {
    const totalPrice = this.props.wallets.reduce(
      (total, wallet) => (wallet.balance * this.props.prices[wallet.symbol]) + total,
      0
    );

    return (
      <Scene>
        <MenuHeader
          title="My Wallet"
          rightAction="menu"
        />
        <ScrollView
          contentContainerStyle={styles.scrollview}
          bounces={false}
        >
          <View
            style={[
              styles.tranparentBackground,
              styles.headingContainer
            ]}
          >
            <View style={[ styles.currentBalance, styles.transparentBackground ]}>
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
            ]}
          >
            <View style={styles.walletHeadingContainer}>
              <T.SubHeading style={styles.walletHeading}>Holdings</T.SubHeading>
            </View>
            {this.props.wallets.map((wallet) => {
              const { balance, symbol, publicAddress, id, imported } = wallet;
              const price = this.props.prices[symbol];

              return (
                <WalletListEntry
                  key={id}
                  name={`My ${symbol} Wallet`}
                  symbol={symbol}
                  balance={balance}
                  change={"0%"}
                  publicAddress={publicAddress}
                  imported={imported}
                  onPress={this.handleNavigateToCoinInfo(id, symbol)}
                  value={(Number(price) * Number(balance)).toFixed(2)}
                />
              );
            })}
            {this.props.wallets.length === 0 && (
              <T.SubHeading style={styles.emptyText}>
                Create or recover a wallet!
              </T.SubHeading>
            )}
            {this.renderActionButtons()}
          </View>
        </ScrollView>
      </Scene>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollview: {
    flexGrow: 1
  },
  headingContainer: {
    minHeight: 200,
    alignItems: 'center',
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
    flex: 1,
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
    marginTop: 'auto',
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
