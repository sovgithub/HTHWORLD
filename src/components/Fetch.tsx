import * as React from 'react';

export interface FetchQuery {
  name: string;
  value: string
}

interface Props {
  children: FetchRenderType;
  queries?: FetchQuery[];
  url: string;
  formatter: (json: any) => any;
}

interface FetchArguments {
  loaded: boolean;
  data: any;
}

type State = FetchArguments & {
  requestNumber: number;
}

export type FetchRenderType = (props: FetchArguments) => React.ReactNode;

export default class Fetch extends React.Component<Props, State> {
  static defaultProps = {
    formatter: (json: any) => json
  }

  state = {
    loaded: false,
    data: "",
    requestNumber: 0,
  };

  componentWillMount() {
    this.makeRequest(this.props.queries, this.state.requestNumber);
  }

  componentWillReceiveProps(newProps: Props) {
    if (this.props.queries != newProps.queries) {
      this.setState(
        { loaded: false, requestNumber: this.state.requestNumber + 1 },
        () => this.makeRequest(newProps.queries, this.state.requestNumber)
      );
    }
  }

  makeQueryString: (queries: Props["queries"]) => string = (queries) => {
    if (queries && queries.length) {
      return `?${ queries.map((q) => `${q.name}=${q.value}`).join('&') }`;
    }

    return '';
  }

  makeRequest = async (queries: Props["queries"], requestNumber: State["requestNumber"]) => {
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
