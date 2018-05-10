import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import ValueStatement from "components/ValueStatement";
import RoundedButton from "components/RoundedButton";
import SectionHeader from "components/SectionHeader";
import TradeItem from "components/TradeItem";
import { getCoinMetadata } from "lib/currency-metadata";
import { Intervals } from "components/GetCurrencyHistory";
import { getColors } from "styles";
import NavigatorService from "lib/navigator";
import Icon from "components/Icon";

export default class CoinInformation extends React.Component {
  static propTypes = {
    pricing: PropTypes.shape({
      price: PropTypes.shape({
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired
      })
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
        value: PropTypes.string
      })
    ).isRequired,
    wallet: PropTypes.shape({
      id: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired
    }),
    updateTransaction: PropTypes.func.isRequired,
    showReceiveModal: PropTypes.func.isRequired,
    showSendModal: PropTypes.func.isRequired,
    getCurrencyHistory: PropTypes.func.isRequired
  };

  state = {
    selected: null
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.state.params.coin,
    headerTintColor: getColors().textPrimary,
    headerStyle: { backgroundColor: getColors().background },
    headerRight: (
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20
        }}
        onPress={() => NavigatorService.navigate("DrawerOpen")}
      >
        <Icon icon="ios-menu-outline" style={{ size: 25 }} />
      </TouchableOpacity>
    )
  });

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
    this.props.getCurrencyHistory(this.props.wallet.symbol, {
      limit: 2,
      interval: Intervals.all
    });
  }

  handleSelect = (selected) => () =>
    this.setState({selected: selected === this.state.selected ? null : selected});

  handleBuy = () => this.props.showReceiveModal(this.props.wallet.id);
  handleSell = () => this.props.showSendModal(this.props.wallet.id);

  render() {
    const { transactions, pricing, wallet } = this.props;
    const metadata = getCoinMetadata(wallet.symbol);

    return (
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          <View style={styles.flex}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={metadata.image} />
            </View>
          </View>
          <ValueStatement
            style={styles.holdings}
            title="Holdings"
            value={`$${wallet.balance * pricing.price.price}`}
            change={`${wallet.balance} ${wallet.symbol}`}
            positive={true}
          />
          <View style={styles.actionButtonContainer}>
            <RoundedButton
              style={[styles.actionButton, styles.actionButtonLeft]}
              backgroundColor={buttonBackgroundColor}
              color={buttonTextColor}
              onPress={this.handleBuy}
            >
              Deposit
            </RoundedButton>
            <RoundedButton
              style={[styles.actionButton, styles.actionButtonRight]}
              backgroundColor={buttonBackgroundColor}
              color={buttonTextColor}
              onPress={this.handleSell}
            >
              Withdraw
            </RoundedButton>
          </View>
        </View>
        <View>
          <SectionHeader>Activity</SectionHeader>
          {transactions.map((transaction, i) => (
            <TouchableOpacity key={transaction.hash} onPress={this.handleSelect(i)}>
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
    );
  }
}

const buttonBackgroundColor = "rgba(255,255,255, 0.05)";
const buttonTextColor = "white";

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    paddingTop: 40,
    padding: 20,
    backgroundColor: "#202d48",
    flexDirection: "column",
    alignItems: "center"
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: "contain"
  },
  holdings: {
    marginVertical: 40
  },
  actionButtonContainer: {
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    borderWidth: 0
  },
  actionButtonLeft: {
    marginRight: 5
  },
  actionButtonRight: {
    marginLeft: 5
  }
});
