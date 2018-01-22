import React from 'react';
import PropTypes from 'prop-types';

export default class Fetch extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired, // recieves {loaded: boolean, data: any}
    queries: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      })
    ),
    url: PropTypes.string.isRequired,
    formatter: PropTypes.func.isRequired,
  };

  static defaultProps = {
    formatter: (json) => json
  };

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

  makeQueryString = (queries) => {
    if (queries && queries.length) {
      return `?${ queries.map((q) => `${q.name}=${q.value}`).join('&') }`;
    }

    return '';
  }

  makeRequest = async (queries, requestNumber) => {
    try {
      const response = await fetch(`${this.props.url}${this.makeQueryString(queries)}`);
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
