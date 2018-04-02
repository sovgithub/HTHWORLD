import React from 'react';
import PropTypes from 'prop-types';
import Fetch, { makeRequest } from 'components/Fetch';

const url = 'https://min-api.cryptocompare.com/data/pricemulti';

const constructQueries = currencies => [
  { name: 'fsyms', value: currencies.join(',') },
  { name: 'tsyms', value: 'USD' },
];

export async function getCurrencyPrice(currencies) {
  return makeRequest(url, constructQueries(currencies));
}

export default class GetCurrencyPrice extends React.Component {
  static propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.func, // recieves {loaded, data}
  };

  constructor(props) {
    super();
    this.state = {
      queries: constructQueries(props.currencies),
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currencies !== this.props.currencies) {
      this.setState({
        queries: constructQueries(newProps.currencies),
      });
    }
  }

  formatter = json => json;

  render() {
    return (
      <Fetch url={url} queries={this.state.queries} formatter={this.formatter}>
        {this.props.children}
      </Fetch>
    );
  }
}
