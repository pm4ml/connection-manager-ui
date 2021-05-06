import {
  SET_RECONCILIATION_OVERVIEW_BATCHES,
  SET_RECONCILIATION_OVERVIEW_BATCHES_ERROR,
  SELECT_RECONCILIATION_OVERVIEW_BATCH,
  HIDE_RECONCILIATION_OVERVIEW_BATCH_MODAL,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_ERROR,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_STATUS_FILTER,
  SELECT_RECONCILIATION_OVERVIEW_BATCH_TRANSFER,
  HIDE_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_MODAL,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_ERROR,
  SET_WEEKLY_POSITIONS,
  SET_WEEKLY_POSITIONS_ERROR,
  SET_WEEKLY_FLOWS,
  SET_WEEKLY_FLOWS_ERROR,
  DashboardActionTypes,
  DashboardState,
} from './types';

export const initialState: DashboardState = {
  reconciliationOverviewBatches: [],
  reconciliationOverviewBatchesError: null,
  selectedReconciliationOverviewBatch: undefined,
  reconciliationOverviewBatchTransfers: [],
  reconciliationOverviewBatchTransfersError: null,
  selectedReconciliationOverviewBatchTransfer: undefined,
  reconciliationOverviewBatchTransferDetails: undefined,
  reconciliationOverviewBatchTransferDetailsError: null,
  reconciliationOverviewBatchTransfersStatusFilter: undefined,
  weeklyPositions: [],
  weeklyPositionsError: null,
  weeklyFlows: [],
  weeklyFlowsError: null,
};

export default function dashboardReducer(
  state = initialState,
  action: DashboardActionTypes
): DashboardState {
  switch (action.type) {
    case SET_RECONCILIATION_OVERVIEW_BATCHES:
      return {
        ...state,
        reconciliationOverviewBatches: action.data,
      };
    case SET_RECONCILIATION_OVERVIEW_BATCHES_ERROR:
      return {
        ...state,
        reconciliationOverviewBatchesError: action.error,
      };
    case SELECT_RECONCILIATION_OVERVIEW_BATCH:
      return {
        ...state,
        selectedReconciliationOverviewBatch: action.item,
      };
    case HIDE_RECONCILIATION_OVERVIEW_BATCH_MODAL:
      return {
        ...state,
        selectedReconciliationOverviewBatch: initialState.selectedReconciliationOverviewBatch,
        reconciliationOverviewBatchTransfersStatusFilter:
          initialState.reconciliationOverviewBatchTransfersStatusFilter,
      };
    case SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS:
      return {
        ...state,
        reconciliationOverviewBatchTransfers: action.data,
      };
    case SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_ERROR:
      return {
        ...state,
        reconciliationOverviewBatchTransfersError: action.error,
      };
    case SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_STATUS_FILTER:
      return {
        ...state,
        reconciliationOverviewBatchTransfersStatusFilter: action.filter,
      };
    case SELECT_RECONCILIATION_OVERVIEW_BATCH_TRANSFER:
      return {
        ...state,
        selectedReconciliationOverviewBatchTransfer: action.item,
      };
    case HIDE_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_MODAL:
      return {
        ...state,
        selectedReconciliationOverviewBatchTransfer:
          initialState.selectedReconciliationOverviewBatchTransfer,
      };
    case SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS:
      return {
        ...state,
        reconciliationOverviewBatchTransferDetails: action.data,
      };
    case SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_ERROR:
      return {
        ...state,
        reconciliationOverviewBatchTransferDetailsError: action.error,
      };

    case SET_WEEKLY_POSITIONS:
      return {
        ...state,
        weeklyPositions: action.data,
      };
    case SET_WEEKLY_POSITIONS_ERROR:
      return {
        ...state,
        weeklyPositionsError: action.error,
      };
    case SET_WEEKLY_FLOWS:
      return {
        ...state,
        weeklyFlows: action.data,
      };
    case SET_WEEKLY_FLOWS_ERROR:
      return {
        ...state,
        weeklyFlowsError: action.error,
      };
    default:
      return state;
  }
}
