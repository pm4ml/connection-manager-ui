import React, { Component, ComponentType } from 'react';
import { MessageBox } from 'components';

interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default function withErrorBoundary(WrappedComponent: ComponentType) {
  return class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static getDerivedStateFromError(error: string) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true, error };
    }

    constructor(props: ErrorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }

    // eslint-disable-next-line
    // componentDidCatch(error, errorInfo) {
    //   // You can also log the error to an error reporting service
    // }

    render() {
      if (this.state.hasError) {
        return (
          <div style={{ width: '100%' }}>
            <MessageBox kind="danger" icon="warning-sign" size={30} fontSize={16}>
              An error occurred.
              <br />
              Please try again later.
            </MessageBox>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}
