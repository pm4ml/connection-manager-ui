export const SET_APP_CONFIG = 'App / Set Config';

export const SHOW_TOAST = 'App / Show Toast';
export const SET_TOAST_VISIBLE = 'App / Set Toast Visible';

export const SHOW_ERROR_MODAL = 'App / Show Error Modal';
export const HIDE_ERROR_MODAL = 'App / Hide Error Modal';

export const SET_USER = 'App / Set User';

export const REQUEST_METRIC = 'App / Request Metric';
export const SET_METRIC = 'App / Set Metric';
export const SET_METRIC_ERROR = 'App / Set Metric Error';

export interface AppState {
  config: AppConfig;
  isSuccessToastVisible: boolean;
  isErrorModalVisible: boolean;
  errorModalPayload?: ErrorPayload;
  metricsData?: MetricsData<MetricData>;
  user?: User;
}

export interface MetricsData<T> {
  // key *could* be a string hash of the metric name, resolution and aggregate duration
  // so as to allow multiple resolution samples for the same metric to be in our state at the
  // same time.
  [key: string]: MetricDataWrapper<T>;
}

export interface MetricDataWrapper<T> {
  metricName: string;
  startTimestamp: string;
  endTimestamp: string;
  data: T[];
}

export interface MetricData {
  timestamp: number;
  value: number;
}

export interface RequestMetricAction {
  type: typeof REQUEST_METRIC;
  metricName: string;
  metricType?: string;
  startTimestamp: string;
  endTimestamp: string;
  aggregateDurationSeconds: number;
  resolutionSeconds: number;
}

export interface SetMetricAction {
  type: typeof SET_METRIC;
  data: MetricDataWrapper<MetricData>;
}

export interface SetMetricErrorAction {
  type: typeof SET_METRIC_ERROR;
  data: ErrorMessage;
}

export interface SetAppConfigAction {
  type: typeof SET_APP_CONFIG;
  config: AppConfig;
}

export interface ShowToastAction {
  type: typeof SHOW_TOAST;
}

export interface SetToastVisibleAction {
  type: typeof SET_TOAST_VISIBLE;
  visible: boolean;
}

export interface SetUserAction {
  type: typeof SET_USER;
  data: User;
}

export interface ShowErrorModalAction {
  type: typeof SHOW_ERROR_MODAL;
  payload: ErrorPayload;
}

export interface HideErrorModalAction {
  type: typeof HIDE_ERROR_MODAL;
}

export type AppActionTypes =
  | SetAppConfigAction
  | ShowToastAction
  | SetToastVisibleAction
  | ShowErrorModalAction
  | HideErrorModalAction
  | RequestMetricAction
  | SetMetricAction
  | SetUserAction
  | SetMetricErrorAction;

// Generic data structure for line charts
export interface LinesConfig {
  color: string;
  points: [number, number][];
}

export type ErrorPayload = string | { status: number; data: string | object };
// Generic Error message
export type ErrorMessage = string | null;

export enum TransferDirection {
  Inbound = 'INBOUND',
  Outbound = 'OUTBOUND',
}

export enum TransferType {
  P2P = 'P2P',
}

export enum TransferStatus {
  Success = 'SUCCESS',
  Pending = 'PENDING',
  Error = 'ERROR',
}

export interface CertificateValidationResultsData {
  [key: string]: {
    type: string;
    value: string;
  };
}

export interface CertificateValidationResults {
  performed: boolean;
  validationCode: string;
  data: CertificateValidationResultsData;
  message: string;
  messageTemplate: string;
  result: string;
}

export interface CertInfo {
  subject: {
    CN: string;
  };
}

export interface ValidationMessage {
  active: boolean;
  message: string;
}

export interface ValidationField {
  isValid: boolean;
  isRequired: boolean;
  messages: ValidationMessage[];
  token: Object[];
  fields?: ValidationFields[];
}

export type ValidationFields = Record<string, ValidationField>;

export interface ValidationResults {
  isValid: boolean;
  fields: ValidationFields;
  messages: ValidationMessage[];
  token: Object[];
}

export interface AppConfig {
  apiBaseUrl: string;
}

export interface XYCoordinate {
  x: number;
  y: number;
}

export interface User {
  username: string;
  givenName: string;
  familyName: string;
  email: string;
  logoutUrl: string;
}
