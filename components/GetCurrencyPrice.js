import React from 'react';
import PropTypes from 'prop-types';
import Fetch from 'components/Fetch';

export default class GetCurrencyPrice extends React.Component {
  static propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.string),
  }

  constructor(props) {
    super(props);
    this.state = {
      queries: this.constructQueries(props.currencies)
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currencies !== this.props.currencies) {
      this.setState({
        queries: this.constructQueries(newProps.currencies)
      });
    }
  }

  constructQueries = (currencies) => [
    {name: 'fsyms', value: currencies.join(',')},
    {name: 'tsyms', value: 'USD'}
  ];

  formatter = (json) => json;

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
