import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import T from 'components/Typography';
import WalletList from './WalletList';
import WalletListEntry from './WalletListEntry';
import { getColors } from 'styles';
import Button from 'components/Button';

class Wallet extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired
    }).isRequired,
    wallet: PropTypes.shape({
      wallets: PropTypes.object.isRequired
    }).isRequired,
    prices: PropTypes.objectOf(PropTypes.number),
    getCurrencyPrice: PropTypes.func.isRequired
  };

  componentDidMount() {
    const walletList = this.props.wallet.wallets;
    Object.keys(walletList).map(wallet =>
      this.props.getCurrencyPrice(
        walletList[wallet].symbol
      )
    );
  }

  handleWalletGenerate = () => {
    this.props.navigation.navigate('Mnemonic');
  };

  handleWalletRecover = () => {
    this.props.navigation.navigate('Recover');
  };

  render() {
    const themedStyles = getThemedStyles(getColors());

    const walletList = this.props.wallet.wallets;

    return (
      <View style={[styles.container, themedStyles.container]}>
        <WalletList style={styles.walletList}>
          {Object.keys(walletList).map((wallet, i) => {
            const {
              balance,
              symbol,
              publicAddress
            } = walletList[wallet];
            const price = this.props.prices[symbol];

            return (
              <WalletListEntry
                key={`wallet-${i}`}
                name={`My ${symbol} Wallet`}
                symbol={symbol}
                balance={balance}
                publicAddress={publicAddress}
                value={(price * balance).toFixed(2)}
              />
            );
          })}
          {Object.keys(walletList).length === 0 && (
            <T.Heading>Create or recover a wallet!</T.Heading>
          )}
        </WalletList>

        <View style={styles.footerContainer}>
          <Button style={styles.buttonLeft} type="secondary" onPress={this.handleWalletGenerate}>
            Create
          </Button>
          <Button style={styles.buttonRight} type="secondary" onPress={this.handleWalletRecover}>
            Recover
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
  walletList: {
    backgroundColor: 'white'
  },
  footerContainer: {
    flexDirection: 'row',
    padding: 20
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

const getThemedStyles = colors => {
  return {
    container: {
      backgroundColor: colors.background
    }
  };
};

export default Wallet;
