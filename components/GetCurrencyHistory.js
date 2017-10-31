import React from 'react';
import PropTypes from 'prop-types';
import Fetch from 'components/Fetch';

export default class GetCurrencyHistory extends React.Component {
  static propTypes = {
    currency: PropTypes.string,
    limit: PropTypes.string,
  }

  static defaultProps = {
    limit: '60',
  }

  constructor(props) {
    super(props);
    this.state = {
      queries: this.constructQueries(props.currency, props.limit)
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currency !== this.props.currency || newProps.limit !== this.props.limit) {
      this.setState({
        queries: this.constructQueries(newProps.currency, newProps.limit)
      });
    }
  }

  constructQueries = (currency, limit) => [
    {name: 'fsym', value: currency},
    {name: 'tsym', value: 'USD'},
    {name: 'limit', value: limit},
    {name: 'aggregate', value: '3'}
  ];

  formatter = (json) =>
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
