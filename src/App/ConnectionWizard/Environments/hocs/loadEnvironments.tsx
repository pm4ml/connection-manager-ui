import React, { Component, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'store/types';
import * as actions from '../actions';

type EnvironmentsLoaderProps = {
  onComponentMount: () => void;
};

export default function initEnvironments<Props>(Cmp: ComponentType<Props>) {
  class EnvironmentsLoader extends Component<EnvironmentsLoaderProps, {}> {
    componentDidMount() {
      this.props.onComponentMount();
    }

    render() {
      /* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
      const { onComponentMount, ...props } = this.props;
      return <Cmp {...(props as Props)} />;
    }
  }
  return connect(null, (dispatch: Dispatch) => ({
    onComponentMount: () => dispatch(actions.initEnvironments()),
  }))(EnvironmentsLoader);
}

type EnvironmentsStatusLoaderProps = {
  onComponentMount: () => void;
};
