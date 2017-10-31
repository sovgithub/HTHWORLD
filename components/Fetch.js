import React from 'react';
import PropTypes from 'prop-types';

export default class Fetch extends React.Component {
  static propTypes = {
    formatter: PropTypes.func,
    queries: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })),
    url: PropTypes.string.isRequired,
  }

  static defaultProps = {
    formatter: (json) => json
  }

  state = {
    loaded: false,
    data: "",
    requestNumber: 0,
  };

  componentWillMount() {
    this.makeRequest(this.props.queries, this.state.requestNumber);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.queries != newProps.queries) {
      this.setState(
        { loaded: false, requestNumber: this.state.requestNumber + 1 },
        () => this.makeRequest(newProps.queries, this.state.requestNumber)
      );
    }
  }

  makeRequest = async (queries, requestNumber) => {
    const queryString = queries.length ? `?${ queries.map((q) => `${q.name}=${q.value}`).join('&') }` : '';
    try {
      const response = await fetch(`${this.props.url}${queryString}`);
      if (this.state.requestNumber === requestNumber) {
        const json = await response.json();
        console.log(json);
        this.setState({
          loaded: true,
          data: this.props.formatter(json)
        });
      }
    }
    catch(error) {
      console.log('error! ', error);
    }
  };

  render() {
    const { loaded, data } = this.state;
    return this.props.children({ loaded, data });
  }
}
