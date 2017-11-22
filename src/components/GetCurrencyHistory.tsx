import * as React from 'react';
import Fetch, {FetchRenderType, FetchQuery} from 'components/Fetch';

export enum Intervals {
  hour = '1H',
  day = '1D',
  week = '1W',
  month = '1M',
  year = '1Y',
  multiYear = '5Y',
  all = 'ALL'
}

interface Props {
  children: FetchRenderType;
  currency: string;
  interval?: Intervals;
  limit?: string;
}

interface State {
  queries: FetchQuery[];
  url: string;
}

interface JSONDatum {
  close: number;
}

type JSONFormatter = (json: {Data: JSONDatum[]}) => number[];

export default class GetCurrencyHistory extends React.Component<Props, State> {
  static defaultProps = {
    interval: Intervals.hour,
    limit: '60',
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      queries: this.constructQueries(props.currency, props.limit, props.interval),
      url: this.getUrl(props.interval)
    };
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.currency !== this.props.currency || newProps.limit !== this.props.limit || newProps.interval !== this.props.interval) {
      this.setState({
        queries: this.constructQueries(newProps.currency, newProps.limit, newProps.interval),
        url: this.getUrl(newProps.interval)
      });
    }
  }

  getAggregateValue = (interval: Intervals) => {
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

  constructQueries = (currency: Props["currency"], limit: Props["limit"], interval: Props["interval"]) => [
    {name: 'fsym', value: currency},
    {name: 'tsym', value: 'USD'},
    {name: 'limit', value: limit},
    {name: 'aggregate', value: this.getAggregateValue(interval)}
  ];

  getUrl = (interval: Intervals) => {
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

  formatter: JSONFormatter = (json) =>
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
