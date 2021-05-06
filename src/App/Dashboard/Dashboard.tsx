/* eslint-disable no-console */
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Heading } from 'components';
import { State, Dispatch } from 'store/types';
import TransfersErrorsChart from 'App/Transfers/components/TransfersErrorsChart';
import { ReconciliationOverviewBatch, WeeklyPosition, WeeklyFlow } from './types';
import { loadDashboard } from './hocs';
import * as selectors from './selectors';
import * as actions from './actions';
import ReconciliationOverview from './components/ReconciliationOverview';
import TodayPositionGraph from './components/TodayPositionGraph';
import FlowGraph from './components/FlowGraph';
import './Dashboard.css';

const stateProps = (state: State) => ({
  reconciliationOverviewBatches: selectors.getReconciliationOverviewBatches(state),
  reconciliationOverviewBatchesError: selectors.getReconciliationOverviewBatchesError(state),
  selectedReconciliationOverviewBatch: selectors.getSelectedReconciliationOverviewBatch(state),
  isReconciliationOverviewBatchesPending: selectors.getIsReconciliationOverviewBatchesPending(
    state
  ),

  weeklyPositions: selectors.getWeeklyPositions(state),
  weeklyPositionsError: selectors.getWeeklyPositionsError(state),
  isWeeklyPositionsPending: selectors.getIsWeeklyPositionsPending(state),

  weeklyFlows: selectors.getWeeklyFlows(state),
  weeklyFlowsError: selectors.getWeeklyFlowsError(state),
  isWeeklyFlowsPending: selectors.getIsWeeklyFlowsPending(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onSelectReconciliationOverviewBatch: (item: ReconciliationOverviewBatch) =>
    dispatch(actions.selectReconciliationOverviewBatch({ item })),
});

type DashboardProps = {
  reconciliationOverviewBatches: ReconciliationOverviewBatch[];
  reconciliationOverviewBatchesError: string | null;
  selectedReconciliationOverviewBatch: ReconciliationOverviewBatch | undefined;
  isReconciliationOverviewBatchesPending?: boolean;

  weeklyPositions: WeeklyPosition[];
  weeklyPositionsError: string | null;
  isWeeklyPositionsPending?: boolean;

  weeklyFlows: WeeklyFlow[];
  weeklyFlowsError: string | null;
  isWeeklyFlowsPending?: boolean;

  onSelectReconciliationOverviewBatch: (item: ReconciliationOverviewBatch) => void;
};

const Dashboard: FC<DashboardProps> = ({
  reconciliationOverviewBatches,
  reconciliationOverviewBatchesError,
  selectedReconciliationOverviewBatch,
  isReconciliationOverviewBatchesPending,
  weeklyPositions,
  weeklyPositionsError,
  isWeeklyPositionsPending,
  weeklyFlows,
  weeklyFlowsError,
  isWeeklyFlowsPending,
  onSelectReconciliationOverviewBatch,
}) => {
  return (
    <div className="dashboard">
      <Heading size="3">Business Dashboard</Heading>
      <TodayPositionGraph
        items={weeklyPositions}
        error={weeklyPositionsError}
        isPending={isWeeklyPositionsPending}
      />
      <FlowGraph items={weeklyFlows} error={weeklyFlowsError} isPending={isWeeklyFlowsPending} />
      <TransfersErrorsChart />
      <ReconciliationOverview
        isPending={isReconciliationOverviewBatchesPending}
        items={reconciliationOverviewBatches}
        error={reconciliationOverviewBatchesError}
        selectedItem={selectedReconciliationOverviewBatch}
        onSelectItem={onSelectReconciliationOverviewBatch}
      />
    </div>
  );
};

export default loadDashboard(connect(stateProps, dispatchProps)(Dashboard));
