import {
  REQUEST_DASHBOARD_PAGE_DATA,
  RequestDashboardPageDataAction,
  REQUEST_RECONCILIATION_OVERVIEW_BATCHES,
  SET_RECONCILIATION_OVERVIEW_BATCHES,
  SET_RECONCILIATION_OVERVIEW_BATCHES_ERROR,
  SELECT_RECONCILIATION_OVERVIEW_BATCH,
  HIDE_RECONCILIATION_OVERVIEW_BATCH_MODAL,
  RequestReconciliationOverviewBatchesAction,
  SetReconciliationOverviewBatchesAction,
  SetReconciliationOverviewBatchesErrorAction,
  SelectReconciliationOverviewBatchAction,
  HideReconciliationOverviewBatchModalAction,
  REQUEST_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_ERROR,
  RequestReconciliationOverviewBatchTransfersAction,
  SetReconciliationOverviewBatchTransfersAction,
  SetReconciliationOverviewBatchTransfersErrorAction,
  SELECT_RECONCILIATION_OVERVIEW_BATCH_TRANSFER,
  HIDE_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_MODAL,
  REQUEST_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_ERROR,
  SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_STATUS_FILTER,
  SelectReconciliationOverviewBatchTransferAction,
  HideReconciliationOverviewBatchTransferDetailsModalAction,
  RequestReconciliationOverviewBatchTransferDetailsAction,
  SetReconciliationOverviewBatchTransferDetailsAction,
  SetReconciliationOverviewBatchTransferDetailsErrorAction,
  SetReconciliationOverviewBatchTransfersStatusFilterAction,
  REQUEST_WEEKLY_POSITIONS,
  SET_WEEKLY_POSITIONS,
  SET_WEEKLY_POSITIONS_ERROR,
  REQUEST_WEEKLY_FLOWS,
  SET_WEEKLY_FLOWS,
  SET_WEEKLY_FLOWS_ERROR,
  SetWeeklyPositionsAction,
  SetWeeklyPositionsErrorAction,
  RequestWeeklyPositionsAction,
  SetWeeklyFlowsAction,
  SetWeeklyFlowsErrorAction,
  RequestWeeklyFlowsAction,
  ReconciliationOverviewBatch,
  ReconciliationOverviewBatchTransfer,
  TransferDetails,
  WeeklyPosition,
  WeeklyFlow,
} from './types';

export function requestDashboardPageData(): RequestDashboardPageDataAction {
  return {
    type: REQUEST_DASHBOARD_PAGE_DATA,
  };
}

export function setReconciliationOverviewBatches({
  data,
}: {
  data: ReconciliationOverviewBatch[];
}): SetReconciliationOverviewBatchesAction {
  return {
    type: SET_RECONCILIATION_OVERVIEW_BATCHES,
    data,
  };
}

export function setReconciliationOverviewBatchesError({
  error,
}: {
  error: string;
}): SetReconciliationOverviewBatchesErrorAction {
  return {
    type: SET_RECONCILIATION_OVERVIEW_BATCHES_ERROR,
    error,
  };
}

export function requestReconciliationOverviewBatches(): RequestReconciliationOverviewBatchesAction {
  return {
    type: REQUEST_RECONCILIATION_OVERVIEW_BATCHES,
  };
}

export function selectReconciliationOverviewBatch({
  item,
}: {
  item: ReconciliationOverviewBatch;
}): SelectReconciliationOverviewBatchAction {
  return {
    type: SELECT_RECONCILIATION_OVERVIEW_BATCH,
    item,
  };
}

export function hideReconciliationOverviewBatchModal(): HideReconciliationOverviewBatchModalAction {
  return {
    type: HIDE_RECONCILIATION_OVERVIEW_BATCH_MODAL,
  };
}

export function setReconciliationOverviewBatchTransfers({
  data,
}: {
  data: ReconciliationOverviewBatchTransfer[];
}): SetReconciliationOverviewBatchTransfersAction {
  return {
    type: SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS,
    data,
  };
}

export function setReconciliationOverviewBatchTransfersError({
  error,
}: {
  error: string;
}): SetReconciliationOverviewBatchTransfersErrorAction {
  return {
    type: SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_ERROR,
    error,
  };
}

export function setReconciliationOverviewBatchTransfersStatusFilter({
  filter,
}: {
  filter: string;
}): SetReconciliationOverviewBatchTransfersStatusFilterAction {
  return {
    type: SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_STATUS_FILTER,
    filter,
  };
}

// eslint-disable-next-line max-len
export function requestReconciliationOverviewBatchTransfers(): RequestReconciliationOverviewBatchTransfersAction {
  return {
    type: REQUEST_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS,
  };
}

export function selectReconciliationOverviewBatchTransfer({
  item,
}: {
  item: ReconciliationOverviewBatchTransfer;
}): SelectReconciliationOverviewBatchTransferAction {
  return {
    type: SELECT_RECONCILIATION_OVERVIEW_BATCH_TRANSFER,
    item,
  };
}

// eslint-disable-next-line max-len
export function hideReconciliationOverviewBatchTransferDetailsModal(): HideReconciliationOverviewBatchTransferDetailsModalAction {
  return {
    type: HIDE_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_MODAL,
  };
}

export function setReconciliationOverviewBatchTransferDetails({
  data,
}: {
  data: TransferDetails;
}): SetReconciliationOverviewBatchTransferDetailsAction {
  return {
    type: SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS,
    data,
  };
}

export function setReconciliationOverviewBatchTransferDetailsError({
  error,
}: {
  error: string;
}): SetReconciliationOverviewBatchTransferDetailsErrorAction {
  return {
    type: SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_ERROR,
    error,
  };
}

// eslint-disable-next-line max-len
export function requestReconciliationOverviewBatchTransferDetails(): RequestReconciliationOverviewBatchTransferDetailsAction {
  return {
    type: REQUEST_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS,
  };
}

export function setWeeklyPositions({ data }: { data: WeeklyPosition[] }): SetWeeklyPositionsAction {
  return {
    type: SET_WEEKLY_POSITIONS,
    data,
  };
}

export function setWeeklyPositionsError({
  error,
}: {
  error: string;
}): SetWeeklyPositionsErrorAction {
  return {
    type: SET_WEEKLY_POSITIONS_ERROR,
    error,
  };
}

export function requestWeeklyFlows(): RequestWeeklyFlowsAction {
  return {
    type: REQUEST_WEEKLY_FLOWS,
  };
}

export function setWeeklyFlows({ data }: { data: WeeklyFlow[] }): SetWeeklyFlowsAction {
  return {
    type: SET_WEEKLY_FLOWS,
    data,
  };
}

export function setWeeklyFlowsError({ error }: { error: string }): SetWeeklyFlowsErrorAction {
  return {
    type: SET_WEEKLY_FLOWS_ERROR,
    error,
  };
}

// eslint-disable-next-line max-len
export function requestWeeklyPositions(): RequestWeeklyPositionsAction {
  return {
    type: REQUEST_WEEKLY_POSITIONS,
  };
}
