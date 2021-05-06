import React, { Component, FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'store/types';
import * as actions from './actions';

const dispatchProps = (dispatch: Dispatch) => ({
  onDashboardMount: () => dispatch(actions.requestDashboardPageData()),
});

type DashboardLoaderProps = {
  onDashboardMount: () => void;
};

export function loadDashboard(Dashboard: FC) {
  class DashboardLoader extends Component<DashboardLoaderProps, {}> {
    componentDidMount() {
      this.props.onDashboardMount();
    }

    render() {
      return <Dashboard />;
    }
  }
  return connect(null, dispatchProps)(DashboardLoader);
}
