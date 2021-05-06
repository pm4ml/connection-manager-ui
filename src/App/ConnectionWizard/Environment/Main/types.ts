import { ErrorMessage } from 'App/types';

export const REQUEST_ENVIRONMENT_DATA = 'Environment / Request Environment Data';
export const REQUEST_DFSP = 'Environment / Request DFSP';
export const SET_DFSP = 'Environment / Set DFSP';
export const SET_DFSP_ERROR = 'Environment / Set DFSP Error';
export const REQUEST_DFSPS = 'Environment / Request DFSPs';
export const SET_DFSPS = 'Environment / Set DFSPs';
export const SET_DFSPS_ERROR = 'Environment / Set DFSPs Error';

export interface RequestEnvironmentDataAction {
  type: typeof REQUEST_ENVIRONMENT_DATA;
}

export interface RequestDfspAction {
  type: typeof REQUEST_DFSP;
}

export interface SetDfspAction {
  type: typeof SET_DFSP;
  data: DFSP;
}

export interface SetDfspErrorAction {
  type: typeof SET_DFSP_ERROR;
  error: ErrorMessage;
}

export interface RequestDfspsAction {
  type: typeof REQUEST_DFSPS;
}

export interface SetDfspsAction {
  type: typeof SET_DFSPS;
  data: DFSP[];
}

export interface SetDfspsErrorAction {
  type: typeof SET_DFSPS_ERROR;
  error: ErrorMessage;
}

export interface DFSP {
  id: string;
  name: string;
  monetaryZoneId: string;
}

export type MainActionTypes =
  | RequestEnvironmentDataAction
  | RequestDfspAction
  | SetDfspAction
  | SetDfspErrorAction
  | RequestDfspsAction
  | SetDfspsAction
  | SetDfspsErrorAction;

export interface MainState {
  isDfspsPending: boolean;
  dfsps: DFSP[];
  dfspError: ErrorMessage;
  isDfspPending: boolean;
  dfsp?: DFSP;
  dfspsError: ErrorMessage;
}
