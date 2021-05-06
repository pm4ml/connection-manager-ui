import React, { PureComponent, ComponentType } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'store/types';
import { requestEnvironmentsStatuses } from '../actions';

type EnvironmentsStatusLoaderProps = {
  onEnvironmentsMount: () => void;
};

export default function loadEnvironmentsStatus<Props>(Cmp: ComponentType<Props>) {
  class EnvironmentsStatusLoader extends PureComponent<EnvironmentsStatusLoaderProps, {}> {
    componentDidMount() {
      this.props.onEnvironmentsMount();
    }

    render() {
      /* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
      const { onEnvironmentsMount, ...props } = this.props;
      return <Cmp {...(props as Props)} />;
    }
  }
  return connect(null, (dispatch: Dispatch) => ({
    onEnvironmentsMount: () => dispatch(requestEnvironmentsStatuses()),
  }))(EnvironmentsStatusLoader);
}
