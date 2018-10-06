import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Linking,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import SectionHeader from 'components/SectionHeader';
import TradeItem from 'components/TradeItem';
import { getCoinMetadata } from 'lib/currency-metadata';
import { Intervals } from 'components/GetCurrencyHistory';
import NavigatorService from 'lib/navigator';
import { Try } from "components/Conditional";
import Card from 'components/Card';
import T from 'components/Typography';
import Scene from 'components/Scene';
import Swipeable from 'react-native-swipeable';
import { TYPE_SEND, TYPE_REQUEST } from 'screens/SendRequest/constants';
import { SYMBOL_BTC, SYMBOL_ETH, SYMBOL_BOAR, SYMBOL_HTH } from 'containers/App/constants';
import Config from 'react-native-config';

const commonTransactionProps = {
  type: PropTypes.oneOf([TYPE_SEND, TYPE_REQUEST]).isRequired,
  date: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  amount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  price: PropTypes.number,
};

export default class CoinInformation extends React.Component {
  static propTypes = {
    pricing: PropTypes.shape({
      price: PropTypes.shape({
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    }).isRequired,
    contactTransactions: PropTypes.arrayOf(
      PropTypes.shape({
        ...commonTransactionProps,
        details: PropTypes.shape({
          uid: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        ...commonTransactionProps,
        details: PropTypes.shape({
          hash: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    wallet: PropTypes.shape({
      id: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
    isSignedIn: PropTypes.bool,
    updateTransaction: PropTypes.func.isRequired,
    showReceiveModal: PropTypes.func.isRequired,
    showSendModal: PropTypes.func.isRequired,
    getCurrencyHistory: PropTypes.func.isRequired,
    cancelContactTransaction: PropTypes.func.isRequired,
  };

  state = {
    selected: null,
  };

  componentWillUpdate(props) {
    if (
      props.pricing != this.props.pricing ||
      props.transactions.length != this.props.transactions.length ||
      props.wallet != this.props.wallet
    ) {
      return true;
    }

    return false;
  }

  componentWillMount() {
    this.props.navigation.setParams({
      title: this.props.wallet.symbol,
      leftAction: 'back',
    });
    this.props.getCurrencyHistory(this.props.wallet.symbol, {
      limit: 2,
      interval: Intervals.all,
    });
  }

  handleCancelContactTransaction = transaction => () =>
    this.props.cancelContactTransaction(transaction);

  handleSelect = (selectedHash) => () => {
    const selectedTx = this.props.transactions.find(tx => tx.details.hash === selectedHash);
    let to;
    if (selectedTx.symbol === SYMBOL_BTC,) {
      if (Config.CURRENCY_NETWORK_TYPE === 'main') {
        to = `https://live.blockcypher.com/btc/tx/${selectedTx.details.hash}`;
      } else {
        to = `https://live.blockcypher.com/btc-testnet/tx/${selectedTx.details.hash}`;
              }  
   if (selectedTx.symbol === SYMBOL_HTH,) {
      if (Config.CURRENCY_NETWORK_TYPE === 'main') {
        to = `https://explorer.hthcoin.world/tx/${selectedTx.detail.hash};

    }
    if ([SYMBOL_ETH, SYMBOL_BOAR].includes(selectedTx.symbol)) {
      if (Config.CURRENCY_NETWORK_TYPE === 'main') {
        to = `https://etherscan.io/tx/${selectedTx.details.hash}`;
      } else {
        to = `https://ropsten.etherscan.io/tx/${selectedTx.details.hash}`;
      }
    }

    if (to) {
      Linking.openURL(to).catch(err => {
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.error('An error occurred', err);
        }
      });
    }
  }

  handleView = () => {
    NavigatorService.navigate('ViewAddress', {
      wallet: this.props.wallet.id,
    });
  };

  handleRequest = () => {
    NavigatorService.navigate('SendRequest', {
      type: TYPE_REQUEST,
      wallet: this.props.wallet.id,
    });
  };

  handleSend = () => {
    NavigatorService.navigate('SendRequest', {
      type: TYPE_SEND,
      wallet: this.props.wallet.id,
    });
  };

  renderHeader = () => {
    const { pricing, wallet, isSignedIn, contactTransactions } = this.props;
    const metadata = getCoinMetadata(wallet.symbol);
    const price = pricing.price.price || 0;

    return (
      <View style={styles.container}>
        <T.Heading style={styles.heading}>{metadata.fullName}</T.Heading>
        <Card
          icon={metadata.icon}
          colors={metadata.colors}
          title={wallet.balance.toFixed(2)}
          walletsToChart={[wallet]}
          subtitle={`$${(wallet.balance * price).toFixed(2)}`}
        />
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            onPress={this.handleSend}
            style={styles.actionButton}
          >
            <View style={styles.actionButtonView}>
              <Image style={styles.image} source={require('assets/send.png')} />
              <T.Small style={styles.actionButtonText}>SEND</T.Small>
            </View>
          </TouchableOpacity>
          <Try condition={isSignedIn}>
            <TouchableOpacity
              onPress={this.handleRequest}
              style={styles.actionButton}
            >
              <View style={styles.actionButtonView}>
                <Image style={styles.image} source={require('assets/request.png')} />
                <T.Small style={styles.actionButtonText}>REQUEST</T.Small>
              </View>
            </TouchableOpacity>
          </Try>
          <TouchableOpacity
            onPress={this.handleView}
            style={styles.actionButton}
          >
            <View style={styles.actionButtonView}>
              <Image style={styles.image} source={require('assets/scan.png')} />
              <T.Small style={styles.actionButtonText}>VIEW</T.Small>
            </View>
          </TouchableOpacity>
        </View>
        <Try condition={contactTransactions.length > 0}>
          <Fragment>
            <SectionHeader style={styles.sectionHeader}>
              Pending Transactions
            </SectionHeader>
            <View style={styles.contactTransactionsContainer}>
              {contactTransactions.map((item) => (
                <Swipeable
                  key={item.details.uid}
                  rightButtons={[
                    <TouchableOpacity
                      onPress={this.handleCancelContactTransaction(item)}
                      style={styles.walletAction}
                      key={'actionCancel'}
                    >
                      <View style={styles.walletActionContainer}>
                        <Image style={styles.walletActionImage} source={require('assets/cancel.png')} />
                        <Text style={styles.walletActionText}>CANCEL</Text>
                      </View>
                    </TouchableOpacity>
                  ]}
                  rightButtonWidth={95}
                >
                  <TradeItem
                    wallet={wallet}
                    transaction={item}
                    onUpdate={this.props.updateTransaction}
                    selected={this.state.selected === item.details.uid}
                  />
                </Swipeable>
              ))}
            </View>
          </Fragment>
        </Try>

        <SectionHeader style={styles.sectionHeader}>
          Recent Activity
        </SectionHeader>
      </View>
    );
  }

  render() {
    const { transactions, wallet } = this.props;

    return (
      <Scene>
        <FlatList
          style={[styles.flex, styles.scrollView]}
          ListHeaderComponent={this.renderHeader}
          data={transactions}
          keyExtractor={t => t.details.hash}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={this.handleSelect(item.details.hash)}
            >
              <TradeItem
                wallet={wallet}
                transaction={item}
                onUpdate={this.props.updateTransaction}
                selected={this.state.selected === item.details.hash}
              />
            </TouchableOpacity>
          )}
        />
      </Scene>
    );
  }
}

const buttonBackgroundColor = 'rgba(255,255,255, 0.05)';
const buttonTextColor = 'white';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'transparent',
  },
  container: {
    paddingTop: 40,
    padding: 15,
    flexDirection: 'column',
  },
  heading: {
    marginBottom: 20,
    color: 'white',
  },
  cardStyle: {
    width: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 30,
  },
  image: {
    width: 25,
    height: 25,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  holdings: {
    marginVertical: 40,
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  actionButton: {
    flex: 1,
    justifyContent: 'center',
  },
  actionButtonView: {
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#707c98',
  },
  contactTransactionsContainer: {
    marginHorizontal: -15,
    marginBottom: 20
  },
  walletAction: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 15,
  },
  walletActionContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    width: 75,
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
