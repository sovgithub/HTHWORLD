import * as React from 'react';
import Fetch, {FetchRenderType, FetchQuery} from 'components/Fetch';

interface Props {
  currencies: string[];
  children: FetchRenderType;
}

interface State {
  queries: FetchQuery[];
}

export default class GetCurrencyPrice extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      queries: this.constructQueries(props.currencies)
    };
  }

  componentWillReceiveProps(newProps: Props) {
    if (newProps.currencies !== this.props.currencies) {
      this.setState({
        queries: this.constructQueries(newProps.currencies)
      });
    }
  }

  constructQueries = (currencies: Props["currencies"]) => [
    {name: 'fsyms', value: currencies.join(',')},
    {name: 'tsyms', value: 'USD'}
  ];

  formatter: (json: any) => any = (json) => json;

  render() {
    return (
      <Fetch
        url="https://min-api.cryptocompare.com/data/pricemulti"
        queries={this.state.queries}
        formatter={this.formatter}
      >
        {this.props.children}
      </Fetch>
    );
  }
}
