import {
  ErrorMessage,
  LinesConfig,
  TransferDirection,
  TransferType,
  TransferStatus,
} from 'App/types';

export const REQUEST_DASHBOARD_PAGE_DATA = 'Dashboard / Request Page Data';
export const REQUEST_RECONCILIATION_OVERVIEW_BATCHES =
  'Dashboard / Request Reconciliation Overview Batches';
export const SET_RECONCILIATION_OVERVIEW_BATCHES =
  'Dashboard / Set Reconciliation Overview Batches';
export const SET_RECONCILIATION_OVERVIEW_BATCHES_ERROR =
  'Dashboard / Set Reconciliation Overview Batches Error';
export const SELECT_RECONCILIATION_OVERVIEW_BATCH =
  'Dashboard / Select Reconciliation Overview Batch';
export const HIDE_RECONCILIATION_OVERVIEW_BATCH_MODAL =
  'Dashboard / Hide Reconciliation Overview Batch Modal';
export const REQUEST_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS =
  'Dashboard / Request Reconciliation Overview Batch Transfers';
export const SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS =
  'Dashboard / Set Reconciliation Overview Batch Transfers';
export const SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_ERROR =
  'Dashboard / Set Reconciliation Overview Batch Transfers Error';
export const SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_STATUS_FILTER =
  'Dashboard / Set Reconciliation Overview Batch Transfers Status Filter';
export const REQUEST_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS =
  'Dashboard / Request Reconciliation Overview Batch Transfer Details';
export const SELECT_RECONCILIATION_OVERVIEW_BATCH_TRANSFER =
  'Dashboard / Select Reconciliation Overview Batch Transfer';
export const HIDE_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_MODAL =
  'Dashboard / Hide Reconciliation Overview Batch Transfer Details Modal';
export const SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS =
  'Dashboard / Set Reconciliation Overview Batch Transfer Details';
export const SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_ERROR =
  'Dashboard / Set Reconciliation Overview Batch Transfer Details Error';
export const REQUEST_WEEKLY_POSITIONS = 'Dashboard / Request Weekly Positions';
export const SET_WEEKLY_POSITIONS = 'Dashboard / Set Weekly Positions';
export const SET_WEEKLY_POSITIONS_ERROR = 'Dashboard / Set Weekly Positions Error';
export const REQUEST_WEEKLY_FLOWS = 'Dashboard / Request Weekly Flows';
export const SET_WEEKLY_FLOWS = 'Dashboard / Set Weekly Flows';
export const SET_WEEKLY_FLOWS_ERROR = 'Dashboard / Set Weekly Flows Error';

export enum BatchStatus {
  Open = 'OPEN',
  OnTrack = 'ON TRACK',
  HasErrors = 'HAS ERRORS',
  Overdue = 'OVERDUE',
}

export interface CurrencyValue {
  netValue: number;
  currency: string;
}

export interface ReconciliationOverviewBatch {
  id: number;
  status: BatchStatus;
  transferCount: number;
  transferTotals: CurrencyValue[];
  errorCount: number;
  startingTimestamp: string;
  closingTimestamp: string;
}

export interface TransferDetails {
  amount: string;
  confirmationNumber: number;
  details: string;
  id: string;
  recipient: string;
  sender: string;
  status: TransferStatus;
}

export interface ReconciliationOverviewBatchTransfer {
  id: number;
  institution: string;
  direction: TransferDirection;
  type: TransferType;
  currency: string;
  value: string;
  status: TransferStatus;
  initiatedTimestamp: string;
}

export interface ReconciliationOverviewBatchTransferDetails {
  amount: string;
  confirmationNumber: number;
  details: string;
  id: string;
  recipient: string;
  sender: string;
  status: TransferStatus;
}

export interface WeeklyPosition extends LinesConfig {}
export interface WeeklyFlow extends LinesConfig {}

export interface DashboardState {
  reconciliationOverviewBatches: ReconciliationOverviewBatch[];
  reconciliationOverviewBatchesError: ErrorMessage;
  selectedReconciliationOverviewBatch?: ReconciliationOverviewBatch;
  reconciliationOverviewBatchTransfers: ReconciliationOverviewBatchTransfer[];
  reconciliationOverviewBatchTransfersError: ErrorMessage;
  selectedReconciliationOverviewBatchTransfer?: ReconciliationOverviewBatchTransfer;
  reconciliationOverviewBatchTransferDetails?: TransferDetails;
  reconciliationOverviewBatchTransferDetailsError: ErrorMessage;
  reconciliationOverviewBatchTransfersStatusFilter: string | undefined;
  weeklyPositions: WeeklyPosition[];
  weeklyPositionsError: ErrorMessage;
  weeklyFlows: WeeklyFlow[];
  weeklyFlowsError: ErrorMessage;
}

export interface RequestDashboardPageDataAction {
  type: typeof REQUEST_DASHBOARD_PAGE_DATA;
}

export interface RequestReconciliationOverviewBatchesAction {
  type: typeof REQUEST_RECONCILIATION_OVERVIEW_BATCHES;
}

export interface SetReconciliationOverviewBatchesAction {
  type: typeof SET_RECONCILIATION_OVERVIEW_BATCHES;
  data: ReconciliationOverviewBatch[];
}

export interface SetReconciliationOverviewBatchesErrorAction {
  type: typeof SET_RECONCILIATION_OVERVIEW_BATCHES_ERROR;
  error: string;
}

export interface SelectReconciliationOverviewBatchAction {
  type: typeof SELECT_RECONCILIATION_OVERVIEW_BATCH;
  item: ReconciliationOverviewBatch;
}

export interface HideReconciliationOverviewBatchModalAction {
  type: typeof HIDE_RECONCILIATION_OVERVIEW_BATCH_MODAL;
}

export interface RequestReconciliationOverviewBatchTransfersAction {
  type: typeof REQUEST_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS;
}

export interface SetReconciliationOverviewBatchTransfersAction {
  type: typeof SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS;
  data: ReconciliationOverviewBatchTransfer[];
}

export interface SetReconciliationOverviewBatchTransfersErrorAction {
  type: typeof SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_ERROR;
  error: string;
}

export interface SelectReconciliationOverviewBatchTransferAction {
  type: typeof SELECT_RECONCILIATION_OVERVIEW_BATCH_TRANSFER;
  item: ReconciliationOverviewBatchTransfer;
}

export interface HideReconciliationOverviewBatchTransferDetailsModalAction {
  type: typeof HIDE_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_MODAL;
}

export interface RequestReconciliationOverviewBatchTransferDetailsAction {
  type: typeof REQUEST_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS;
}

export interface SetReconciliationOverviewBatchTransferDetailsAction {
  type: typeof SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS;
  data: TransferDetails;
}

export interface SetReconciliationOverviewBatchTransferDetailsErrorAction {
  type: typeof SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFER_DETAILS_ERROR;
  error: string;
}

export interface SetReconciliationOverviewBatchTransfersStatusFilterAction {
  type: typeof SET_RECONCILIATION_OVERVIEW_BATCH_TRANSFERS_STATUS_FILTER;
  filter: string;
}

export interface RequestWeeklyPositionsAction {
  type: typeof REQUEST_WEEKLY_POSITIONS;
}

export interface SetWeeklyPositionsAction {
  type: typeof SET_WEEKLY_POSITIONS;
  data: WeeklyPosition[];
}

export interface SetWeeklyPositionsErrorAction {
  type: typeof SET_WEEKLY_POSITIONS_ERROR;
  error: string;
}

export interface RequestWeeklyFlowsAction {
  type: typeof REQUEST_WEEKLY_FLOWS;
}

export interface SetWeeklyFlowsAction {
  type: typeof SET_WEEKLY_FLOWS;
  data: WeeklyFlow[];
}

export interface SetWeeklyFlowsErrorAction {
  type: typeof SET_WEEKLY_FLOWS_ERROR;
  error: string;
}

export type DashboardActionTypes =
  | RequestDashboardPageDataAction
  | SetReconciliationOverviewBatchesAction
  | SetReconciliationOverviewBatchesErrorAction
  | RequestReconciliationOverviewBatchesAction
  | SelectReconciliationOverviewBatchAction
  | HideReconciliationOverviewBatchModalAction
  | SetReconciliationOverviewBatchTransfersAction
  | SetReconciliationOverviewBatchTransfersErrorAction
  | RequestReconciliationOverviewBatchTransfersAction
  | SetReconciliationOverviewBatchTransferDetailsAction
  | SetReconciliationOverviewBatchTransferDetailsErrorAction
  | SetReconciliationOverviewBatchTransfersStatusFilterAction
  | RequestReconciliationOverviewBatchTransferDetailsAction
  | SelectReconciliationOverviewBatchTransferAction
  | HideReconciliationOverviewBatchTransferDetailsModalAction
  | SetWeeklyPositionsAction
  | SetWeeklyPositionsErrorAction
  | RequestWeeklyPositionsAction
  | SetWeeklyFlowsAction
  | SetWeeklyFlowsErrorAction
  | RequestWeeklyFlowsAction;
