import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import T from 'components/Typography';
import SelectableCoin from 'components/SelectableCoin';
import {getCoinMetadata} from 'lib/currency-metadata';

export default class SelectWalletSection extends Component {
  static propTypes = {
    wallets: PropTypes.arrayOf(PropTypes.shape({
      publicAddress: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired
    })).isRequired,
    selectedAddress: PropTypes.string,
    showHeader: PropTypes.bool,
    title: PropTypes.string,
    selecting: PropTypes.bool.isRequired,
    children: PropTypes.node,
    onSelect: PropTypes.func.isRequired,
    onToggleSelecting: PropTypes.func.isRequired
  }

  static defaultProps = {
    showHeader: true
  }

  handleSelectCoin = (value) => () => this.props.onSelect(value);

  render() {
    const {showHeader, wallets, selectedAddress, selecting, children, title} = this.props;

    const selectedWallet = wallets.find((wallet) => wallet.publicAddress === selectedAddress);

    if (!wallets.length) {
      return <T.GrayedOut>You have not yet created any wallets</T.GrayedOut>;
    }

    return selecting
      ? (
        <View>
          {showHeader &&
            <T.SubHeading style={styles.subheading}>Select cryptocurrency</T.SubHeading>
          }
          <ScrollView bounces={false}>
            {wallets.map((wallet) => (
              <SelectableCoin
                key={wallet.publicAddress}
                onPress={this.handleSelectCoin(wallet.publicAddress)}
                selected={selectedAddress === wallet.publicAddress}
                currency={wallet.symbol}
              />
            ))}
          </ScrollView>
        </View>
      )
      : (
        <View>
          {showHeader &&
            <View style={styles.subheadingContainer}>
              <T.SubHeading style={styles.subheading}>
                {selectedAddress ? title : 'No Wallet Selected'}
              </T.SubHeading>
              <TouchableOpacity onPress={this.props.onToggleSelecting}>
                <View style={styles.changeCoin}>
                  <T.Small>Change</T.Small>
                  {selectedAddress &&
                    <Image style={styles.coinImage} source={getCoinMetadata(selectedWallet.symbol).image}/>
                  }
                </View>
              </TouchableOpacity>
            </View>
          }
          {selectedAddress && (<View>{children}</View>)}
        </View>
      );
  }
}

const styles = StyleSheet.create({
  subheading: {
    justifyContent: 'center',
  },
  subheadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  changeCoin: {
    alignItems: 'center',
  },
  coinImage: {
    margin: 10,
    resizeMode: 'cover',
  },
});
