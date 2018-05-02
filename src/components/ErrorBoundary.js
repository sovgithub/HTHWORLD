import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch = (error, errorInfo) => catchFunc(error, errorInfo, this);

  render() {
    if (this.state.errorInfo) {
      return handleError(this);
    }
    // Normally, just render children
    return this.props.children;
  }
}

export const withErrorBoundary = WrappedComponent =>
  class extends Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }

    componentDidCatch = (error, errorInfo) => catchFunc(error, errorInfo, this);

    render() {
      if (this.state.errorInfo) {
        return handleError(this);
      }
      // Normally, just render children
      return <WrappedComponent {...this.props} />;
    }
  };

const catchFunc = (error, errorInfo, ctx) => {
  // catch errors in any components below and re-render with error message
  ctx.setState({
    error: error,
    errorInfo: errorInfo,
  });
  // log error messages, etc.
};

const handleError = ctx => (
  // Error path
  <View style={ctx.props.style || styles.error}>
    <Text>Something went wrong.</Text>
    <Text style={{ whiteSpace: 'pre-wrap' }}>
      {ctx.state.error && ctx.state.error.toString()}
      {ctx.state.errorInfo.componentStack}
    </Text>
  </View>
);

const styles = {
  error: {
    backgroundColor: '#f98e7e',
    borderTop: '1px solid #777',
    borderBottom: '1px solid #777',
    padding: '12px',
  },
};
