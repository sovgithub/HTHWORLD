import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Button from 'components/Button';
import Card from 'components/Card';
import WalletListEntry, { ENTRY_STATUS } from './WalletListEntry';
import { Layout } from 'components/Base';
import { getCoinMetadata } from 'lib/currency-metadata';
import Storage from 'lib/storage';
import { SUPPORTED_COINS_WALLET } from 'containers/App/constants';
import { TYPE_SEND, TYPE_REQUEST } from 'screens/SendRequest/constants';
import { dimensions } from 'styles';
import Swipeable from 'react-native-swipeable';
import NavigatorService from 'lib/navigator';
import Config from 'react-native-config';
import T from 'components/Typography';


class SwipableItem extends React.Component {
  static propTypes = {
    isSignedIn: PropTypes.bool,
    wallet_id: PropTypes.string,
    onSwipeStart: PropTypes.func,
    children: PropTypes.node,
  };

  handleView = () => {
    NavigatorService.navigate('ViewAddress', {
      wallet: this.props.wallet_id,
    });
  };

  handleRequest = () => {
    NavigatorService.navigate('SendRequest', {
      type: TYPE_REQUEST,
      wallet: this.props.wallet_id,
    });
  };

  handlePay = () => {
    NavigatorService.navigate('SendRequest', {
      type: TYPE_SEND,
      wallet: this.props.wallet_id,
    });
  };

  render() {
    const PAY_ICON = require('assets/send.png');
    const REQUEST_ICON = require('assets/request.png');
    const VIEW_ICON = require('assets/scan.png');

    const numButtons = this.props.isSignedIn ? 3 : 2;
    const horizontalPaddingList = 40;
    const horizontalPaddingImage = 20;
    const imageWidth = 30;
    const offset = horizontalPaddingImage + horizontalPaddingList + imageWidth;
    const buttonWidth = (dimensions.width - offset) / numButtons;

    const rightButtons = [
      <TouchableOpacity
        onPress={this.handlePay}
        style={styles.walletAction}
        key={'actionPay'}
      >
        <View style={styles.walletActionContainer}>
          <Image style={styles.walletActionImage} source={PAY_ICON} />
          <Text style={styles.walletActionText}>PAY</Text>
        </View>
      </TouchableOpacity>,

      this.props.isSignedIn && (
        <TouchableOpacity
          onPress={this.handleRequest}
          style={styles.walletAction}
          key={'actionRequest'}
        >
          <View style={styles.walletActionContainer}>
            <Image style={styles.walletActionImage} source={REQUEST_ICON} />
            <Text style={styles.walletActionText}>REQUEST</Text>
          </View>
        </TouchableOpacity>
      ),

      <TouchableOpacity
        onPress={this.handleView}
        style={styles.walletAction}
        key={'actionView'}
      >
        <View style={styles.walletActionContainer}>
          <Image style={styles.walletActionImage} source={VIEW_ICON} />
          <Text style={styles.walletActionText}>VIEW</Text>
        </View>
      </TouchableOpacity>,
    ].filter(v => v);

    return (
      <Swipeable
        onSwipeStart={this.props.onSwipeStart}
        rightButtons={rightButtons}
        rightButtonWidth={buttonWidth}
      >
        {this.props.children}
      </Swipeable>
    );
  }
}

const HAS_DISMISSED_TESTNET_MODAL_STORAGE_KEY = 'HAS_DISMISSED_TESTNET_MODAL_STORAGE_KEY';

class Wallet extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    wallets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    hasMnemonic: PropTypes.bool,
    isSignedIn: PropTypes.bool,
    hasAvailableCoins: PropTypes.bool,
    totalHoldings: PropTypes.number,
    prices: PropTypes.objectOf(
      PropTypes.shape({
        price: PropTypes.number,
        requesting: PropTypes.bool,
        successful: PropTypes.bool,
      })
    ),
    getCurrencyPrice: PropTypes.func.isRequired,
  };

  state = {
    swipedWallet: null,
    hasDismissedModal: Config.CURRENCY_NETWORK_TYPE === 'main',
    fetchingModalState: true,
  };

  componentDidMount() {
    if (Config.CURRENCY_NETWORK_TYPE !== 'main') {
      Storage.get(HAS_DISMISSED_TESTNET_MODAL_STORAGE_KEY).then(
        value => {
          let hasDismissedModal = false;
          if (value) {
            hasDismissedModal = value;
          }

          this.setState({
            hasDismissedModal,
            fetchingModalState: false
          });
        }
      );
    }

    SUPPORTED_COINS_WALLET.map(symbol => this.props.getCurrencyPrice(symbol));
  }

  handleNavigateToCoinInfo = (id, coin) => () => {
    if (this.state.swipedWallet) {
      this.state.swipedWallet.recenter();
    }
    this.props.navigation.navigate('CoinInformation', { id, coin });
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

  handleWalletSwipe = (evt, gestureState, swipedWallet) => {
    if (this.state.swipedWallet) {
      this.state.swipedWallet.recenter();
    }
    this.setState({ swipedWallet });
  };

  handleScroll = () => {
    if (this.state.swipedWallet) {
      this.state.swipedWallet.recenter();
      this.setState({ swipedWallet: null });
    }
  };

  handleDismissTestnetWarning = async () => {
    await Storage.set(HAS_DISMISSED_TESTNET_MODAL_STORAGE_KEY, true);

    this.setState({
      hasDismissedModal: true
    });
  }

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
        text: 'Make Mnemonic',
      });
    }

    return (
      <View style={styles.footerContainer}>
        {buttons.map(({ style, type, onPress, text, ...rest }) => (
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
    return (
      <Layout>
        <Card
          colors={['#00A073', '#007982']}
          title="My Balance"
          subtitle={`$${this.props.totalHoldings.toFixed(2)}`}
          walletsToChart={this.props.wallets}
          style={{
            maxHeight: 180,
            margin: 20,
          }}
        />
        <ScrollView
          contentContainerStyle={styles.scrollview}
          onScroll={this.handleScroll}
          bounces={false}
        >
          {this.props.wallets.map(wallet => {
            const {
              balance,
              balance_requesting,
              balance_successful,
              symbol,
              publicAddress,
              id,
              imported,
            } = wallet;

            const {
              requesting: price_requesting,
              successful: price_successful,
              price,
            } = this.props.prices[symbol];

            const balanceStatus = balance_requesting
              ? ENTRY_STATUS.LOADING
              : balance_successful
                ? ENTRY_STATUS.SUCCESSFUL
                : ENTRY_STATUS.ERROR;
            const priceStatus = price_requesting
              ? ENTRY_STATUS.LOADING
              : price_successful
                ? ENTRY_STATUS.SUCCESSFUL
                : ENTRY_STATUS.ERROR;

            return (
              <SwipableItem
                key={id}
                wallet_id={id}
                onSwipeStart={this.handleWalletSwipe}
                isSignedIn={this.props.isSignedIn}
              >
                <WalletListEntry
                  name={getCoinMetadata(symbol).fullName}
                  symbol={symbol}
                  balance={balance}
                  balanceStatus={balanceStatus}
                  change={'0%'}
                  price={price}
                  priceStatus={priceStatus}
                  publicAddress={publicAddress}
                  imported={imported}
                  onPress={this.handleNavigateToCoinInfo(id, symbol)}
                />
              </SwipableItem>
            );
          })}
        </ScrollView>
        {!this.state.hasDismissedModal && !this.state.fetchingModalState && (
          <View style={styles.testnetWarning}>
            <View style={styles.testnetTop}>
              <View style={styles.testnetIconWrapper}>
                <Text style={styles.testnetIcon}>!</Text>
              </View>
              <View style={styles.testnetBody}>
                <T.SubHeading style={styles.testnetHeader}>Do Not Use Real Cryptocurrency</T.SubHeading>
                <T.Light style={styles.testnetContent}>
                  The Hoard beta app is a testnet beta app.
                  If you use real cryptocurrency, you will lose it.
                </T.Light>
              </View>
            </View>
            <TouchableOpacity
              style={styles.testnetBottom}
              onPress={this.handleDismissTestnetWarning}
            >
              <T.SubHeading style={styles.testnetButton}>Dismiss</T.SubHeading>
            </TouchableOpacity>
          </View>
        )}
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  footerContainer: {
    marginTop: 'auto',
    padding: 15,
  },
  walletAction: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginVertical: 10,
  },
  walletActionContainer: {
    margin: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletActionImage: {
    height: 20,
    width: 20,
    marginBottom: 5,
  },
  walletActionText: {
    color: '#fff',
    fontSize: 12,
  },
  testnetWarning: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    left: 10,
    padding: 20,
    backgroundColor: '#ff6161',
    borderRadius: 5,
  },
  testnetTop: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  testnetBottom: {
    paddingTop: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    marginTop: 15
  },
  testnetIconWrapper: {
    height: 40,
    width: 40,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
    borderWidth: 2,
    borderColor: 'white',
  },
  testnetIcon: {
    color: 'white',
    fontSize: 28,
    textAlign: 'center',
  },
  testnetBody: {
    flex: 1
  },
  testnetHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  testnetContent: {
    fontSize: 12,
    color: 'white',
  },
  testnetButton: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default Wallet;
