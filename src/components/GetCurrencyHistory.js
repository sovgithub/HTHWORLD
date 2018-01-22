import React from 'react';
import PropTypes from 'prop-types';
import Fetch from 'components/Fetch';

export const Intervals = {
  hour: '1H',
  day: '1D',
  week: '1W',
  month: '1M',
  year: '1Y',
  multiYear: '5Y',
  all: 'ALL'
};

export default class GetCurrencyHistory extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired, // recieves {loaded: bool, data: any}
    currency: PropTypes.string.isRequired,
    interval: PropTypes.oneOf(Object.values(Intervals)),
    limit: PropTypes.string,
  };

  static defaultProps = {
    interval: Intervals.hour,
    limit: '60',
  }

  constructor(props) {
    super();
    this.state = {
      queries: this.constructQueries(props.currency, props.limit, props.interval),
      url: this.getUrl(props.interval)
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currency !== this.props.currency || newProps.limit !== this.props.limit || newProps.interval !== this.props.interval) {
      this.setState({
        queries: this.constructQueries(newProps.currency, newProps.limit, newProps.interval),
        url: this.getUrl(newProps.interval)
      });
    }
  }

  getAggregateValue = (interval) => {
    switch(interval) {
    case Intervals.hour:
    case Intervals.day:
      return 1;
    case Intervals.week:
      return 7;
    case Intervals.month:
      return 30;
    case Intervals.year:
      return 365;
    case Intervals.multiYear:
      return 1825;
    case Intervals.all:
    default:
      return 2000;
    }
  }

  constructQueries = (currency, limit, interval) => [
    {name: 'fsym', value: currency},
    {name: 'tsym', value: 'USD'},
    {name: 'limit', value: limit},
    {name: 'aggregate', value: this.getAggregateValue(interval)}
  ];

  getUrl = (interval) => {
    switch(interval) {
    case Intervals.hour:
      return "https://min-api.cryptocompare.com/data/histohour";
    case Intervals.day:
    case Intervals.week:
    case Intervals.month:
    case Intervals.year:
    case Intervals.multiYear:
    case Intervals.all:
    default:
      return "https://min-api.cryptocompare.com/data/histoday";
    }
  }

  formatter = (json) =>
    json.Data.map((day) => day.close);

  render() {
    const {children, interval} = this.props;
    const {queries, url} = this.state;
    return (
      <Fetch
        url={url}
        queries={queries}
        formatter={this.formatter}
      >
        {children}
      </Fetch>
    );
  }
}
