import * as React from 'react';
import Fetch, {FetchRenderType, FetchQuery} from 'components/Fetch';

interface Props {
  children: FetchRenderType;
  currency: string;
  limit?: string;
}

interface State {
  queries: FetchQuery[];
}

interface JSONDatum {
  close: number;
}

type JSONFormatter = (json: {Data: JSONDatum[]}) => number[];

export default class GetCurrencyHistory extends React.Component<Props, State> {
  static defaultProps = {
    limit: '60',
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      queries: this.constructQueries(props.currency, props.limit)
    };
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.currency !== this.props.currency || newProps.limit !== this.props.limit) {
      this.setState({
        queries: this.constructQueries(newProps.currency, newProps.limit)
      });
    }
  }

  constructQueries = (currency: Props["currency"], limit: Props["limit"]) => [
    {name: 'fsym', value: currency},
    {name: 'tsym', value: 'USD'},
    {name: 'limit', value: limit},
    {name: 'aggregate', value: '3'}
  ];

  formatter: JSONFormatter = (json) =>
    json.Data.map((day) => day.close);

  render() {
    return (
      <Fetch
        url="https://min-api.cryptocompare.com/data/histohour"
        queries={this.state.queries}
        formatter={this.formatter}
      >
        {this.props.children}
      </Fetch>
    );
  }
}
