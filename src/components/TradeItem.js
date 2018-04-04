import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import T from 'components/Typography';
import Checkbox from 'components/Checkbox';
import Input from 'components/Input';
import RoundedButton from 'components/RoundedButton';
import { formatDecimalInput } from 'lib/formatters';

const trimAddress = address => {
  if (address && address.length > 20) {
    return [
      address.substring(0, 7),
      '...',
      address.substring(address.length - 7),
    ].join('');
  } else {
    return address;
  }
};

const creation = 'Created Contract';
const send = 'Sent';
const receive = 'Received';

const otherWalletKeyForType = {
  [creation]: 'creates',
  [send]: 'to',
  [receive]: 'from',
};

const isTradeTitle = {
  [send]: 'Sold',
  [receive]: 'Bought',
};

class TradeItem extends Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
  };

  constructor(props) {
    super();

    const tradePrice = props.transaction.isTrade
      ? props.transaction.tradePrice
      : props.transaction.priceAtTimeMined * props.transaction.value;

    this.state = {
      isTrade: props.transaction.isTrade,
      tradePrice: tradePrice && tradePrice.toFixed(2),
    };
  }

  handleToggleIsTrade = () => this.setState({ isTrade: !this.state.isTrade });
  handleChangeTradePrice = tradePrice =>
    this.setState({
      tradePrice: formatDecimalInput(2)(tradePrice.replace('$', '')),
    });

  handleUpdate = () => {
    const { tradePrice, isTrade } = this.state;

    this.props.onUpdate({
      ...this.props.transaction,
      tradePrice: Number(tradePrice),
      isTrade,
    });
  };

  render() {
    const { wallet, transaction, selected } = this.props;
    const transactionType = transaction.creates
      ? creation
      : transaction.from === wallet.publicAddress ? send : receive;

    const tradeTitle = transaction.isTrade
      ? isTradeTitle[transactionType]
      : transactionType;

    const otherWalletAddress =
      transaction[otherWalletKeyForType[transactionType]];

    const date = new Date(transaction.timeMined);

    return (
      <View style={{ padding: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
            <T.Light style={{ fontWeight: '400' }}>
              {trimAddress(otherWalletAddress)}
            </T.Light>
            <T.Small style={{ fontWeight: '300' }}>
              {date.toLocaleString(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </T.Small>
          </View>
          <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
            <T.Light style={{ fontWeight: '400' }}>
              {tradeTitle.toUpperCase()}
            </T.Light>
            <T.Small style={{ fontWeight: '300' }}>
              ${this.state.tradePrice}
            </T.Small>
          </View>
        </View>
        {selected && (
          <View
            style={{
              backgroundColor: '#ccccd4',
              justifyContent: 'space-between',
              padding: 15,
              marginTop: 5,
              marginHorizontal: -15,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}
            >
              <T.Small>
                <T.SemiBold>block number: </T.SemiBold>
              </T.Small>
              <T.Small>{transaction.blockNumber}</T.Small>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}
            >
              <T.Small>
                <T.SemiBold>amount: </T.SemiBold>
              </T.Small>
              <T.Small>
                {transaction.value} {wallet.symbol}
              </T.Small>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}
            >
              <T.Small>
                <T.SemiBold>price per {wallet.symbol}: </T.SemiBold>
              </T.Small>
              <T.Small>{transaction.priceAtTimeMined}</T.Small>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 5,
              }}
            >
              <T.Small>
                <T.SemiBold>gas price: </T.SemiBold>
              </T.Small>
              <T.Small>
                {transaction.gasPrice} {wallet.symbol}
              </T.Small>
            </View>
            {(transactionType === send || transactionType === receive) && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 5,
                }}
              >
                <T.Small>
                  <T.SemiBold>This was a trade:</T.SemiBold>
                </T.Small>
                <Checkbox
                  iconStyle={{ size: 20, color: 'black' }}
                  value={this.state.isTrade}
                  onPress={this.handleToggleIsTrade}
                />
              </View>
            )}
            {this.state.isTrade && (
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                }}
              >
                <Input
                  containerStyle={{ flex: 1 }}
                  onChangeText={this.handleChangeTradePrice}
                  light={true}
                  value={
                    this.state.tradePrice ? `$${this.state.tradePrice}` : ''
                  }
                  label="trade price"
                />
              </View>
            )}
            {(transaction.isTrade !== this.state.isTrade ||
              transaction.tradePrice !== Number(this.state.tradePrice)) && (
              <RoundedButton onPress={this.handleUpdate}>Update</RoundedButton>
            )}
          </View>
        )}
      </View>
    );
  }
}

TradeItem.propTypes = {
  transaction: PropTypes.object.isRequired,
  wallet: PropTypes.object.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default TradeItem;
