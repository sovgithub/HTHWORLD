import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';
import { getCurrencyHistory, Intervals } from 'components/GetCurrencyHistory';
import LoadingSpinner from 'components/LoadingSpinner';
import { SYMBOL_ETH } from 'containers/App/constants';

import {
  transformIntoRunningTotal,
  mergeTimeValueLists
} from './helpers';

/**
   Shows a chart of your portfolio price over time.

   This price is determined by collating the price of
   trades into and out of fiat, the amount of a coin
   that is held over time, and the price of that coin
   as it fluctuates across time.

   Currently, only ethereum has history tracking enabled,
   so the portfolio chart only takes ethereum into account
**/
export default class PortfolioChart extends Component {
  static propTypes = {
    transactions: PropTypes.shape({
      fiatTrades: PropTypes.arrayOf(PropTypes.string).isRequired,
      transactions: PropTypes.objectOf(PropTypes.shape({
        priceAtTimeMined: PropTypes.number.isRequired,
        timeMined: PropTypes.number.isRequired,
        from: PropTypes.string,
        to: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })).isRequired,
      transactionsByAddress: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string).isRequired),
    }).isRequired,
    wallet: PropTypes.shape({
      walletAddresses: PropTypes.arrayOf(PropTypes.string).isRequired,
      wallets: PropTypes.objectOf(PropTypes.shape({
        symbol: PropTypes.string,
        publicAddress: PropTypes.string,
      })).isRequired
    }).isRequired
  };

  state = {
    data: [],
    height: 0,
    width: 0
  };

  componentDidMount() {
    const {transactions, wallet} = this.props;

    if (!this.isRenderable()) {
      return;
    }

    const { initialPortfolioPrice, timeUSD } = this.getTimeUSD(transactions, wallet.wallets);

    const { timeCoin, timePrices } = this.getTimeCoin(transactions, wallet);

    const minimumTimes = [];
    if (timeCoin[0]) {
      minimumTimes.push(timeCoin[0].time);
    }
    if (timeUSD[0]) {
      minimumTimes.push(timeUSD[0].time);
    }

    const minimumTime = Math.min(...minimumTimes.filter(v => v!== undefined));

    const initialOne = {time: minimumTime, value: initialPortfolioPrice};

    // i want 100 points;
    // now - initialTime / ms in day / 100
    // this will get us the aggregate number for the history request
    const aggregate = Math.round(((Date.now() - initialOne.time) / 86400000) / 100);

    getCurrencyHistory(SYMBOL_ETH, 100, Intervals.day, aggregate, (json) => json.Data.map(v => ({time: v.time * 1000, value: v.close})))

      .then((resp) => {
        const totalPrices = [...resp, ...timePrices].sort((a, b) => a.time - b.time);
        const slicePricesBeforeCoinsIndex = timeCoin[0] ? totalPrices.findIndex(value => value.time >= timeCoin[0].time) : 0;

        const realValues = mergeTimeValueLists(
          { list: timeCoin }, // add
          {
            list: totalPrices.slice(slicePricesBeforeCoinsIndex >= 0 ? slicePricesBeforeCoinsIndex : totalPrices.length),
            sameTimeValueResolver: (a, b) => a > b ? a : b,
            aOnBResolver: (a, b) => a * b,
            defaultItem: {time: 0, value: 1}
          }, // multiply
          {
            list: [
              initialOne, ...timeUSD
            ],
            sameTimeValueResolver: (a, b) => b
          } // add
        );
        const data = realValues.map(v => ({
          x: new Date(v.time),
          y: v.value,
        }));
        this.setState({data});
      })
      .catch((e) => console.log('error in fetching history', e)); // eslint-disable-line no-console
  }

  getTimeUSD = (transactions, wallets) => {
    const runningTotal = transformIntoRunningTotal(transactions.fiatTrades.map(
      hash => {
        const transaction = transactions.transactions[hash];
        return wallets[transaction.to] ? -transaction.tradePrice : transaction.tradePrice;
      }
    ));


    // get the usd i must have started with to make these trades
    const {initialPortfolioPrice} = runningTotal
      .reduce(({initialPortfolioPrice, prevValue}, newValue) => {
        const difference = newValue - prevValue;
        return {
          initialPortfolioPrice: difference < 0
            ? initialPortfolioPrice - difference
            : initialPortfolioPrice,
          prevValue: newValue
        };
      }, {initialPortfolioPrice: 0, prevValue: 0})
    ;

    return {
      timeUSD: transactions.fiatTrades.map(
        (hash, i) => ({
          time: transactions.transactions[hash].timeMined,
          value: runningTotal[i] + initialPortfolioPrice
        })
      ),
      initialPortfolioPrice
    };
  }

  getTimeCoin = (transactions, wallet) => {
    const timePrices = [];

    const listOfTimesCoins = wallet.walletAddresses
      .map(a => wallet.wallets[a])
      .reduce((ws, w) => w.symbol === SYMBOL_ETH ? [...ws, w.publicAddress] : ws, [])
      .reduce((ws, w) => {
        const transactionsForThisWallet = transactions.transactionsByAddress[w];
        const adjustedValues = transactionsForThisWallet.map(t => {
          const transaction = transactions.transactions[t];
          const value = transaction.from === w ? -Number(transaction.value) : Number(transaction.value);
          return value;
        });
        const runningTotalForThisWallet = transformIntoRunningTotal(adjustedValues);

        return [
          ...ws,
          {
            list: runningTotalForThisWallet.map((value, i) => {
              const transaction = transactions.transactions[transactionsForThisWallet[i]];
              const time = transaction.timeMined;

              timePrices.push({time, value: transaction.priceAtTimeMined});

              return {
                time,
                value
              };
            }),
            sameTimeValueResolver: (a, b) => b
          }
        ];

      }, []);

    const timeCoin = mergeTimeValueLists(...listOfTimesCoins).sort((a, b) => a.time - b.time);
    return {timeCoin, timePrices: timePrices.sort((a, b) => a.time - b.time)};
  }

  isRenderable = () => {
    const listOfTransactions = this.props.wallet.walletAddresses
      .reduce(
        (fullTransactionsList, address) => {
          const wallet = this.props.wallet.wallets[address];
          if (wallet && wallet.symbol === SYMBOL_ETH) {
            const transactions = this.props.transactions.transactionsByAddress[address];

            if (transactions) {
              return [
                ...fullTransactionsList,
                ...transactions
              ];
            }
          }

          return fullTransactionsList;
        },
        []
      );

    return listOfTransactions.length > 1;
  }

  render = () => {
    const { data } = this.state;

    if (!this.isRenderable()) {
      return null;
    }
    const newTheme = {
      ...VictoryTheme.grayscale,
      axis: {
        ...VictoryTheme.grayscale.axis,
        style: {
          ...VictoryTheme.grayscale.axis.style,
          tickLabels: { fill: 'grey' },
          axis: {
            ...VictoryTheme.grayscale.axis.style.axis,
            stroke: 'grey'
          },
        }
      }
    };

    return data.length
      ? (
        <VictoryChart
          scale={{x: 'time'}}
          theme={newTheme}
        >
          <VictoryLine
            padding={{top: 20, bottom: 20}}
            interpolation="natural"
            style={{
              axis: { stroke: 'red' },
              data: { stroke: data[0].y < data[data.length-1].y ? "#00EC5F" : '#C30072' }
            }}
            data={data}
          />
        </VictoryChart>
      )
      : (
        <View style={{padding: 50}}>
          <LoadingSpinner />
        </View>
      );
  }
}
