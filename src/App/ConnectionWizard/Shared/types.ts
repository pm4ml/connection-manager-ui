import { ErrorMessage } from 'App/types';
// eslint-disable-next-line import/no-cycle
import { EnvironmentStatus } from '../types';

export const REQUEST_ENVIRONMENTS_STATUSES = 'Wizard / Request Environments Statuses';
export const SET_ENVIRONMENTS_STATUSES = 'Wizard / Set Environments Statuses';
export const SET_ENVIRONMENTS_STATUSES_ERROR = 'Wizard / Set Environments Statuses Error';
export const REQUEST_ENVIRONMENT_STATUS = 'Wizard / Request Environment Status';
export const SET_ENVIRONMENT_STATUS = 'Wizard / Set Environment Status';
export const SET_ENVIRONMENT_STATUS_ERROR = 'Wizard / Set Environment Status Error';

export interface SharedState {
  isEnvironmentsStatusesPending: boolean;
  environmentsStatuses: EnvironmentStatus[];
  environmentsStatusesError: ErrorMessage;
}

export interface RequestEnvironmentsStatusesAction {
  type: typeof REQUEST_ENVIRONMENTS_STATUSES;
}

export interface SetEnvironmentsStatusesAction {
  type: typeof SET_ENVIRONMENTS_STATUSES;
  data: EnvironmentStatus[];
}

export interface SetEnvironmentsStatusesErrorAction {
  type: typeof SET_ENVIRONMENTS_STATUSES_ERROR;
  error: ErrorMessage;
}

export interface RequestEnvironmentStatusAction {
  type: typeof REQUEST_ENVIRONMENT_STATUS;
}

export interface SetEnvironmentStatusAction {
  type: typeof SET_ENVIRONMENT_STATUS;
  data: EnvironmentStatus;
}

export interface SetEnvironmentStatusErrorAction {
  type: typeof SET_ENVIRONMENT_STATUS_ERROR;
  error: ErrorMessage;
}

export type SharedActionTypes =
  | RequestEnvironmentsStatusesAction
  | SetEnvironmentsStatusesAction
  | SetEnvironmentsStatusesErrorAction
  | RequestEnvironmentStatusAction
  | SetEnvironmentStatusAction
  | SetEnvironmentStatusErrorAction;
