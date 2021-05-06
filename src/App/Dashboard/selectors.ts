import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';

export const getReconciliationOverviewBatches = (state: State) =>
  state.dashboard.reconciliationOverviewBatches;
export const getReconciliationOverviewBatchesError = (state: State) =>
  state.dashboard.reconciliationOverviewBatchesError;
export const getIsReconciliationOverviewBatchesPending = createSelector(
  (state: State) => state.api,
  isPending('batches.read')
);

export const getSelectedReconciliationOverviewBatch = (state: State) =>
  state.dashboard.selectedReconciliationOverviewBatch;
export const getReconciliationOverviewBatchTransfers = (state: State) =>
  state.dashboard.reconciliationOverviewBatchTransfers;
export const getReconciliationOverviewBatchTransfersError = (state: State) =>
  state.dashboard.reconciliationOverviewBatchTransfersError;
export const getReconciliationOverviewBatchTransfersStatusFilter = (state: State) =>
  state.dashboard.reconciliationOverviewBatchTransfersStatusFilter;
export const getIsReconciliationOverviewBatchTransfersPending = createSelector(
  (state: State) => state.api,
  isPending('batchTransfers.read')
);
export const getReconciliationOverviewBatchStatusFilteredTransfers = createSelector(
  getReconciliationOverviewBatchTransfers,
  getReconciliationOverviewBatchTransfersStatusFilter,
  (transfers, status) => {
    if (!status) {
      return transfers;
    }
    return transfers.filter((transfer) => transfer.status === status);
  }
);

export const getSelectedReconciliationOverviewBatchTransfer = (state: State) =>
  state.dashboard.selectedReconciliationOverviewBatchTransfer;
export const getReconciliationOverviewBatchTransferDetails = (state: State) =>
  state.dashboard.reconciliationOverviewBatchTransferDetails;
export const getReconciliationOverviewBatchTransferDetailsError = (state: State) =>
  state.dashboard.reconciliationOverviewBatchTransferDetailsError;
export const getIsReconciliationOverviewBatchTransferDetailsPending = createSelector(
  (state: State) => state.api,
  isPending('transferDetails.read')
);

export const getWeeklyPositions = (state: State) => state.dashboard.weeklyPositions;
export const getWeeklyPositionsError = (state: State) => state.dashboard.weeklyPositionsError;
export const getIsWeeklyPositionsPending = createSelector(
  (state: State) => state.api,
  isPending('weeklyPositions.read')
);

export const getWeeklyFlows = (state: State) => state.dashboard.weeklyFlows;
export const getWeeklyFlowsError = (state: State) => state.dashboard.weeklyFlowsError;
export const getIsWeeklyFlowsPending = createSelector(
  (state: State) => state.api,
  isPending('weeklyFlows.read')
);
