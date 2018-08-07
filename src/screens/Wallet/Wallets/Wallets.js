import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Button from 'components/Button';
import Card from 'components/Card';
import T from 'components/Typography';
import WalletListEntry from './WalletListEntry';
import PortfolioChart from 'containers/PortfolioChart';
import { Layout, Body } from 'components/Base';
import { getCoinMetadata } from 'lib/currency-metadata';
import { SUPPORTED_COINS_WALLET } from 'containers/App/constants';
import { TYPE_SEND, TYPE_REQUEST } from 'screens/SendRequest/constants';
import { dimensions } from 'styles';
import Swipeable from 'react-native-swipeable';
import NavigatorService from 'lib/navigator';

class SwipableItem extends React.Component {
  static propTypes = {
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

    const horizontalPaddingList = 40;
    const horizontalPaddingImage = 20;
    const imageWidth = 30;
    const offset = horizontalPaddingImage + horizontalPaddingList + imageWidth;
    const buttonWidth = (dimensions.width - offset) / 3;

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

      <TouchableOpacity
        onPress={this.handleRequest}
        style={styles.walletAction}
        key={'actionRequest'}
      >
        <View style={styles.walletActionContainer}>
          <Image style={styles.walletActionImage} source={REQUEST_ICON} />
          <Text style={styles.walletActionText}>REQUEST</Text>
        </View>
      </TouchableOpacity>,

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
    ];

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

class Wallet extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    wallets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    hasMnemonic: PropTypes.bool,
    hasAvailableCoins: PropTypes.bool,
    totalHoldings: PropTypes.number,
    prices: PropTypes.objectOf(PropTypes.number),
    getCurrencyPrice: PropTypes.func.isRequired,
  };

  state = {
    swipedWallet: null
  };

  componentDidMount() {
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
    this.setState({swipedWallet});
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
        <ScrollView contentContainerStyle={styles.scrollview} bounces={false}>
          {this.props.wallets.map(wallet => {
            const { balance, symbol, publicAddress, id, imported } = wallet;
            const price = this.props.prices[symbol];
            return (
              <SwipableItem key={id} wallet_id={id} onSwipeStart={this.handleWalletSwipe}>
                <WalletListEntry
                  name={getCoinMetadata(symbol).fullName}
                  symbol={symbol}
                  balance={balance}
                  change={'0%'}
                  price={price}
                  publicAddress={publicAddress}
                  imported={imported}
                  onPress={this.handleNavigateToCoinInfo(id, symbol)}
                  value={(Number(price) * Number(balance)).toFixed(2)}
                />
              </SwipableItem>
            );
          })}
        </ScrollView>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flexGrow: 1,
  },
  headingContainer: {
    minHeight: 200,
    alignItems: 'center',
  },
  backgroundImage: {
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentBalance: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
  },
  positive: {
    color: '#00EC5F',
  },
  pagerContainer: {
    marginTop: 'auto',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pagerIndicator: {
    margin: 2,
    width: 7,
    height: 7,
    backgroundColor: 'transparent',
    borderRadius: 10,
    borderColor: '#00EC5F',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  pagerIndicatorSelected: {
    margin: 2,
    width: 14,
    height: 7,
    backgroundColor: '#00EC5F',
    borderRadius: 10,
    borderColor: '#00EC5F',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  walletContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 'auto',
  },
  walletHeadingContainer: {
    padding: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderColor: '#f7f7f7',
  },
  walletHeading: {
    fontWeight: 'bold',
  },
  emptyText: {
    padding: 20,
  },
  footerContainer: {
    marginTop: 'auto',
    padding: 15,
  },
  buttonLeft: {
    flex: 1,
    marginRight: 7.5,
  },
  buttonRight: {
    flex: 1,
    marginLeft: 7.5,
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
});

export default Wallet;
