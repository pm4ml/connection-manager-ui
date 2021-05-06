import React, { Component, FC } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { RequestMetricAction } from 'App/types';
import * as actions from './actions';
import * as selectors from './selectors';

const stateProps = (state: State) => ({
  metricRequests: selectors.getMetricRequests(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onTechnicalDashboardMount: (metricRequests: RequestMetricAction[]) =>
    dispatch(actions.requestTechnicalDashboardPageData({ metricRequests })),
});

type TechnicalDashboardLoaderProps = {
  onTechnicalDashboardMount: (metricRequests: RequestMetricAction[]) => void;
  metricRequests: RequestMetricAction[];
};

export function loadTechnicalDashboard(TechnicalDashboard: FC) {
  class TechnicalDashboardLoader extends Component<TechnicalDashboardLoaderProps, {}> {
    componentDidMount() {
      this.props.onTechnicalDashboardMount(this.props.metricRequests);
    }

    render() {
      return <TechnicalDashboard />;
    }
  }
  return connect(stateProps, dispatchProps)(TechnicalDashboardLoader);
}
