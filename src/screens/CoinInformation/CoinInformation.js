import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ValueStatement from 'components/ValueStatement';
import RoundedButton from 'components/RoundedButton';
import SectionHeader from 'components/SectionHeader';
import TradeItem from 'components/TradeItem';
import { getCoinMetadata } from 'lib/currency-metadata';
import { Intervals } from 'components/GetCurrencyHistory';
import { getColors } from 'styles';
import NavigatorService from 'lib/navigator';
import Icon from 'components/Icon';
import Card from 'components/Card';
import T from 'components/Typography';
import Scene from 'components/Scene';
import { TYPE_SEND, TYPE_REQUEST } from 'screens/SendRequest/constants';

export default class CoinInformation extends React.Component {
  static propTypes = {
    pricing: PropTypes.shape({
      price: PropTypes.shape({
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
      }),
    }).isRequired,
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        blockNumber: PropTypes.number,
        creates: PropTypes.string,
        from: PropTypes.string,
        hash: PropTypes.string,
        to: PropTypes.string,
        isTrade: PropTypes.bool,
        tradePrice: PropTypes.number,
        value: PropTypes.string,
      })
    ).isRequired,
    wallet: PropTypes.shape({
      id: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
    updateTransaction: PropTypes.func.isRequired,
    showReceiveModal: PropTypes.func.isRequired,
    showSendModal: PropTypes.func.isRequired,
    getCurrencyHistory: PropTypes.func.isRequired,
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

  handleSelect = (/* selected*/) => () => 'disabled for now';
  /* this.setState({selected: selected === this.state.selected ? null : selected});*/

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

  render() {
    const { transactions, pricing, wallet, isSignedIn } = this.props;
    const metadata = getCoinMetadata(wallet.symbol);

    return (
      <Scene>
        <ScrollView style={[styles.flex, styles.scrollView]}>
          <View style={styles.container}>
            <T.Heading style={styles.heading}>{metadata.fullName}</T.Heading>
            <Card
              cardStyle={styles.cardStyle}
              title={wallet.symbol}
              amount={(wallet.balance * pricing.price.price).toFixed(2)}
              change={`${wallet.balance.toFixed(2)} ${wallet.symbol}`}
              colors={['#2889d6', '#123665']}
            />
            <View style={styles.actionButtonContainer}>
              <TouchableOpacity
                onPress={this.handleSend}
                style={styles.actionButton}
              >
                <View style={styles.actionButtonView}>
                  <Image source={require('assets/send.png')} />
                  <T.Small style={styles.actionButtonText}>SEND</T.Small>
                </View>
              </TouchableOpacity>
              {isSignedIn && (
                <TouchableOpacity
                  onPress={this.handleRequest}
                  style={styles.actionButton}
                >
                  <View style={styles.actionButtonView}>
                    <Image source={require('assets/request.png')} />
                    <T.Small style={styles.actionButtonText}>REQUEST</T.Small>
                  </View>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={this.handleView}
                style={styles.actionButton}
              >
                <View style={styles.actionButtonView}>
                  <Image source={require('assets/scan.png')} />
                  <T.Small style={styles.actionButtonText}>VIEW</T.Small>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <SectionHeader style={styles.sectionHeader}>
              Recent Activity
            </SectionHeader>
            {transactions.map((transaction, i) => (
              <TouchableOpacity
                key={transaction.hash}
                onPress={this.handleSelect(i)}
              >
                <TradeItem
                  wallet={wallet}
                  transaction={transaction}
                  onUpdate={this.props.updateTransaction}
                  selected={this.state.selected === i}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
    width: 30,
    height: 30,
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
});
