import React from 'react';

type TErrorBoundryProps = {
  children: React.ReactNode;
};
type TErrorBoundryState = {
  hasError: boolean;
};

export class ErrorBoundry extends React.Component<TErrorBoundryProps> {
  state: TErrorBoundryState = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  public render() {
    if (this.state.hasError) {
      return <p>Error</p>;
    }

    return this.props.children;
  }
}
