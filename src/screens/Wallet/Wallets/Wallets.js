import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Button from 'components/Button';
import T from 'components/Typography';
import WalletListEntry from './WalletListEntry';
import PortfolioChart from 'containers/PortfolioChart';
import { Layout, Body } from 'components/Base';
import { getCoinMetadata } from 'lib/currency-metadata';
import { SUPPORTED_COINS_WALLET } from 'containers/App/constants';

class Wallet extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
    wallets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    hasMnemonic: PropTypes.bool,
    hasAvailableCoins: PropTypes.bool,
    prices: PropTypes.objectOf(PropTypes.number),
    getCurrencyPrice: PropTypes.func.isRequired,
  };

  componentDidMount() {
    SUPPORTED_COINS_WALLET.map(symbol => this.props.getCurrencyPrice(symbol));
  }

  handleNavigateToCoinInfo = (id, coin) => () => {
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 20,
            alignItems: 'center',
          }}
        >
          <TouchableHighlight onPress={this.flipCards}>
            <Image source={require('assets/flip.png')} />
          </TouchableHighlight>
          <T.Small style={{ color: 'white' }}>My Holdings</T.Small>
        </View>
        <ScrollView contentContainerStyle={styles.scrollview} bounces={false}>
          {this.props.wallets.map(wallet => {
            const { balance, symbol, publicAddress, id, imported } = wallet;
            const price = this.props.prices[symbol];

            return (
              <WalletListEntry
                key={id}
                name={getCoinMetadata(symbol).fullName}
                symbol={symbol}
                balance={balance}
                change={'0%'}
                publicAddress={publicAddress}
                imported={imported}
                onPress={this.handleNavigateToCoinInfo(id, symbol)}
                value={(Number(price) * Number(balance)).toFixed(2)}
              />
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
});

export default Wallet;
