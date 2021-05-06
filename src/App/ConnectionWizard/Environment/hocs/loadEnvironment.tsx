import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'store/types';
import * as actions from '../Main/actions';

type EnvironmentLoaderProps = {
  onEnvironmentMount: () => void;
};

export default function loadEnvironment<Props>(Cmp: ComponentType<Props>) {
  class EnvironmentLoader extends Component<EnvironmentLoaderProps, {}> {
    componentDidMount() {
      this.props.onEnvironmentMount();
    }

    render() {
      /* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
      const { onEnvironmentMount, ...props } = this.props;
      return <Cmp {...(props as Props)} />;
    }
  }
  return connect(null, (dispatch: Dispatch) => ({
    onEnvironmentMount: () => dispatch(actions.requestEnvironmentData()),
  }))(EnvironmentLoader);
}

type EnvironmentsStatusLoaderProps = {
  onEnvironmentsMount: () => void;
};
