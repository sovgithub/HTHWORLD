import React from 'react';
import PropTypes from 'prop-types';

export default class GetCurrencyHistory extends React.Component {
  static propTypes = {
    currency: PropTypes.string,
    limit: PropTypes.number,
  }

  static defaultProps = {
    limit: 60,
  }

  state = {
    loaded: false,
    data: [],
    requestNumber: 0,
  }


  componentWillMount() {
    this.makeRequest(this.props.currency, this.state.requestNumber);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.currency != newProps.currency) {
      this.setState({loaded: false, requestNumber: this.state.requestNumber + 1}, () => {
        this.makeRequest(newProps.currency, this.state.requestNumber);
      })
    }
  }

  makeRequest = (currency, requestNumber) => {
    fetch(`https://min-api.cryptocompare.com/data/histohour?fsym=${currency}&tsym=USD&limit=${this.props.limit}&aggregate=3`)
      .then((response) => {
        if (this.state.requestNumber === requestNumber) {
          return response.json()
            .then((json) => {
              console.log(json);
              this.setState({
                loaded: true,
                data: json.Data.map((day) => day.close)
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
