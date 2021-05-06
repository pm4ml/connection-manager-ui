import {
  ErrorMessage,
  LinesConfig,
  TransferType,
  TransferStatus,
  TransferDirection,
} from 'App/types';

export const REQUEST_TRANSFERS_PAGE_DATA = 'Transfers / Request Page Data';
export const REQUEST_TRANSFERS_ERRORS = 'Transfers / Request Transfers Errors';
export const SET_TRANSFERS_ERRORS = 'Transfers / Set Transfers Errors';
export const SET_TRANSFERS_ERRORS_ERROR = 'Transfers / Set Transfers Errors Error';
export const TOGGLE_TRANSFERS_ERRORS_VIEW_ALL = 'Transfers / Select Transfers Errors View All';
export const SET_TRANSFERS_ERRORS_TYPE_FILTER = 'Transfers / Set Transfers Errors Type Filter';
export const TOGGLE_TRANSFER_FINDER_MODAL = 'Transfers / Open Transfer Finder Modal';
export const SET_TRANSFER_FINDER_FILTER = 'Transfers / Set Transfer Finder Filter';
export const REQUEST_TRANSFERS = 'Transfers / Request Transfers';
export const UNREQUEST_TRANSFERS = 'Transfers / Unrequest Transfers';
export const SET_TRANSFERS = 'Transfers / Set Transfers';
export const SET_TRANSFERS_ERROR = 'Transfers / Set Transfers Error';
export const REQUEST_TRANSFERS_STATUSES = 'Transfers / Request Transfers Statuses';
export const SET_TRANSFERS_STATUSES = 'Transfers / Set Transfers Statuses';
export const SET_TRANSFERS_STATUSES_ERROR = 'Transfers / Set Transfers Statuses Error';

export const REQUEST_TRANSFERS_SUCCESS_PERC = 'Transfers / Request Transfers Success Perc';
export const SET_TRANSFERS_SUCCESS_PERC = 'Transfers / Set Transfers Success Perc';
export const SET_TRANSFERS_SUCCESS_PERC_ERROR = 'Transfers / Set Transfers Success Perc Error';
export const REQUEST_TRANSFERS_AVG_TIME = 'Transfers / Request Transfers Average Time';
export const SET_TRANSFERS_AVG_TIME = 'Transfers / Set Transfers Average Time';
export const SET_TRANSFERS_AVG_TIME_ERROR = 'Transfers / Set Transfers Average Time Error';

export const REQUEST_TRANSFER_DETAILS = 'Transfers / Request Transfer Details';
export const SET_TRANSFER_DETAILS = 'Transfers / Set Transfer Details';
export const TOGGLE_TRANSFER_DETAILS_MODAL = 'Transfers / Select Transfers Detail View';
export const SET_TRANSFER_DETAILS_ERROR = 'Transfers / Set Transfer Details Error';

export interface TransferError {
  id: string;
  institution: string;
  direction: ErrorDirection;
  type: TransferType;
  currency: string;
  value: string;
  errorType: ErrorType;
  committedDate: string;
}

export enum ErrorDirection {
  Inbound = 'INBOUND',
  Outbound = 'OUTBOUND',
}

export enum ErrorType {
  FromHub = 'FROM HUB',
  FromInstitution = 'FROM INSTITUTION',
  InvalidSignature = 'INVALID SIGNATURE',
  PayerFspInsufficientLiquidity = 'PAYER FSP INSUFFICIENT LIQUIDITY',
  PayerRejection = 'PAYER REJECTION',
  PayerRejectedTxnRequest = 'PAYER REJECTED TXN REQUEST',
  PayerLimitError = 'PAYER LIMIT ERROR',
  PayeeFspInsufficientLiquidity = 'PAYEE FSP INSUFFICIENT LIQUIDITY',
  PayeeRejectedQuote = 'PAYEE REJECTED QUOTE',
  PayeeFspRejectedQuote = 'PAYEE FSP REJECTED QUOTE',
  PayeeRejectedTxn = 'PAYEE REJECTED TXN',
  PayeeFspRejectedTxn = 'PAYEE FSP REJECTED TXN',
  PayeeUnsupportedCurrency = 'PAYEE UNSUPPORTED CURRENCY',
  PayeeLimitError = 'PAYEE LIMIT ERROR',
}

export interface TransferFilter {
  transferId: string | number | undefined;
  dates: string | number | undefined;
  from: string | number | undefined;
  to: string | number | undefined;
  institution: string | number | undefined;
  status: string | number | undefined;
}

export interface Transfer {
  id: string;
  institution: string;
  direction: TransferDirection;
  type: TransferType;
  currency: string;
  amount: string;
  status: TransferStatus;
  initiatedTimestamp: string;
}

export interface ExtensionListItem {
  key: string;
  value: string;
}

export interface TransferParty {
  type: string;
  idType: string;
  idValue: string;
  idSubValue?: string;
  displayName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth?: string;
  merchantClassificationCode?: string;
  fspId: string;
  extensionList?: ExtensionListItem[];
}

export interface MojaloopError {
  errorInformation: MojaloopErrorInformation;
}

export interface MojaloopErrorInformation {
  errorCode: string;
  errorDescription: string;
  extensionList?: ExtensionListItem[];
}

export interface TransferDetailsError {
  httpStatusCode: number;
  mojaloopError?: MojaloopError;
}

export interface TransferTechnicalDetailsApiMessage {
  headers?: object;
  body?: object;
}

export interface TransferTechnicalDetails {
  schemeTransferId: string;
  homeTransferId: string;
  transactionId: string;
  payerParty: TransferParty;
  payeeParty: TransferParty;
  quoteId: string;
  transferState: string;
  getPartiesRequest?: TransferTechnicalDetailsApiMessage;
  getPartiesResponse?: TransferTechnicalDetailsApiMessage;
  quoteRequest?: TransferTechnicalDetailsApiMessage;
  quoteResponse?: TransferTechnicalDetailsApiMessage;
  transferPrepare?: TransferTechnicalDetailsApiMessage;
  transferFulfilment?: TransferTechnicalDetailsApiMessage;
  lastError?: TransferDetailsError;
}

export interface TransferDetails {
  id: string;
  confirmationNumber: number;
  amount: string;
  currency: string;
  institution: string;
  direction: string;
  sender: string;
  recipient: string;
  details: string;
  status: string;
  initiatedTimestamp: string;
  technicalDetails: TransferTechnicalDetails;
}

export enum DateRange {
  Today = 'TODAY',
  Past48Hours = 'PAST_48_HOURS',
  OneWeek = '1_WEEK',
  OneMonth = '1_MONTH',
}

export interface TransfersStatus {
  status: TransferStatus;
  count: number;
}

export interface SuccessPerc extends LinesConfig {}
export interface SuccessPercApi {
  timestamp: number;
  percentage: number;
}

export interface AvgTime extends LinesConfig {}
export interface AvgTimeApi {
  timestamp: number;
  averageResponseTime: number;
}

export interface TransfersState {
  transfersErrors: TransferError[];
  transfersErrorsError: ErrorMessage;
  isTransfersErrorsViewAllActive: boolean;
  transfersErrorsTypeFilter?: string;
  isTransferFinderModalVisible: boolean;
  transferFinderFilter: TransferFilter;
  isTransfersRequested: boolean;
  transfers: Transfer[];
  transfersError: ErrorMessage;
  transfersStatuses: TransfersStatus[];
  transfersStatusesError: ErrorMessage;
  transfersSuccessPerc?: SuccessPerc;
  transfersSuccessPercError: ErrorMessage;
  transfersAvgTime?: AvgTime;
  transfersAvgTimeError: ErrorMessage;
  transferDetails?: TransferDetails;
  isTransferDetailsModalVisible: boolean;
  transferDetailsError: ErrorMessage;
}

export interface RequestTransfersPageDataAction {
  type: typeof REQUEST_TRANSFERS_PAGE_DATA;
}

export interface RequestTransfersErrorsAction {
  type: typeof REQUEST_TRANSFERS_ERRORS;
}

export interface SetTransfersErrorsAction {
  type: typeof SET_TRANSFERS_ERRORS;
  data: TransferError[];
}

export interface SetTransfersErrorsErrorAction {
  type: typeof SET_TRANSFERS_ERRORS_ERROR;
  error: string;
}

export interface ToggleTransfersErrorsViewAllAction {
  type: typeof TOGGLE_TRANSFERS_ERRORS_VIEW_ALL;
}

export interface SetTransfersErrorsTypeFilterAction {
  type: typeof SET_TRANSFERS_ERRORS_TYPE_FILTER;
  filter: string;
}

export interface ToggleTransferFinderModalAction {
  type: typeof TOGGLE_TRANSFER_FINDER_MODAL;
}

export interface SetTransferFinderFilterAction {
  type: typeof SET_TRANSFER_FINDER_FILTER;
  value: string | number;
  field: string;
}

export interface RequestTransfersAction {
  type: typeof REQUEST_TRANSFERS;
  filters: TransferFilter;
}

export interface UnrequestTransfersAction {
  type: typeof UNREQUEST_TRANSFERS;
}

export interface SetTransfersAction {
  type: typeof SET_TRANSFERS;
  data: Transfer[];
}

export interface SetTransfersErrorAction {
  type: typeof SET_TRANSFERS_ERROR;
  error: string;
}

export interface RequestTransfersStatusesAction {
  type: typeof REQUEST_TRANSFERS_STATUSES;
}

export interface SetTransfersStatusesAction {
  type: typeof SET_TRANSFERS_STATUSES;
  data: TransfersStatus[];
}

export interface SetTransfersStatusesErrorAction {
  type: typeof SET_TRANSFERS_STATUSES_ERROR;
  error: string;
}

export interface RequestTransfersSuccessPercAction {
  type: typeof REQUEST_TRANSFERS_SUCCESS_PERC;
}

export interface SetTransfersSuccessPercAction {
  type: typeof SET_TRANSFERS_SUCCESS_PERC;
  data: SuccessPerc;
}

export interface SetTransfersSuccessPercErrorAction {
  type: typeof SET_TRANSFERS_SUCCESS_PERC_ERROR;
  error: string;
}

export interface RequestTransfersAvgTimeAction {
  type: typeof REQUEST_TRANSFERS_AVG_TIME;
}

export interface SetTransfersAvgTimeAction {
  type: typeof SET_TRANSFERS_AVG_TIME;
  data: AvgTime;
}

export interface SetTransfersAvgTimeErrorAction {
  type: typeof SET_TRANSFERS_AVG_TIME_ERROR;
  error: string;
}

export interface RequestTransferDetailsAction {
  type: typeof REQUEST_TRANSFER_DETAILS;
  transferId: string;
}

export interface SetTransferDetailsAction {
  type: typeof SET_TRANSFER_DETAILS;
  data: TransferDetails;
}

export interface ToggleTransferDetailsModalAction {
  type: typeof TOGGLE_TRANSFER_DETAILS_MODAL;
}

export interface SetTransferDetailsErrorAction {
  type: typeof SET_TRANSFER_DETAILS_ERROR;
  error: string;
}

export type TransfersActionTypes =
  | RequestTransfersPageDataAction
  | RequestTransfersErrorsAction
  | SetTransfersErrorsAction
  | SetTransfersErrorsErrorAction
  | ToggleTransfersErrorsViewAllAction
  | SetTransfersErrorsTypeFilterAction
  | ToggleTransferFinderModalAction
  | SetTransferFinderFilterAction
  | RequestTransfersAction
  | UnrequestTransfersAction
  | SetTransfersAction
  | SetTransfersErrorAction
  | RequestTransfersStatusesAction
  | SetTransfersStatusesAction
  | SetTransfersStatusesErrorAction
  | RequestTransfersSuccessPercAction
  | SetTransfersSuccessPercAction
  | SetTransfersSuccessPercErrorAction
  | RequestTransfersAvgTimeAction
  | SetTransfersAvgTimeAction
  | SetTransfersAvgTimeErrorAction
  | RequestTransferDetailsAction
  | SetTransferDetailsAction
  | ToggleTransferDetailsModalAction;
