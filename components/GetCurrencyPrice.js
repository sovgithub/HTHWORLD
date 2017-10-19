import React from 'react';
import PropTypes from 'prop-types';

export default class GetCurrencyPrice extends React.Component {
  static propTypes = {
    currencies: PropTypes.arrayOf(PropTypes.string),
  }

  state = {
    loaded: false,
    data: "",
    requestNumber: 0,
  }

  componentWillMount() {
    this.makeRequest(this.props.currencies, this.state.requestNumber);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.currencies != newProps.currencies) {
      this.setState({loaded: false, requestNumber: this.state.requestNumber + 1}, () => {
        this.makeRequest(newProps.currencies, this.state.requestNumber);
      })
    }
  }

  makeRequest = (currencies, requestNumber) => {
    fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${currencies.join(',')}&tsyms=USD`)
      .then((response) => {
        if (this.state.requestNumber === requestNumber) {
          return response.json()
            .then((json) => {
              console.log(json);
              this.setState({
                loaded: true,
                data: json
              });
            });
        }
      })
      .catch((error) => console.log('error! ', error));
  }

  render() {
    const { loaded, data } = this.state;
    return this.props.children({ loaded, data });
  }
}
