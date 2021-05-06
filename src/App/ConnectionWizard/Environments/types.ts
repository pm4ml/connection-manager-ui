import { ErrorMessage } from 'App/types';
// TODO: Use import type as soon as it's available in order to avoid type dependency cycles
/* eslint-disable-next-line import/no-cycle */
import { Environment, EnvironmentStatus } from '../types';

export const INIT_ENVIRONMENTS = 'Environments / Init';
export const REQUEST_ENVIRONMENTS = 'Environments / Request Environments';
export const SET_ENVIRONMENTS = 'Environments / Set Environments';
export const SET_ENVIRONMENTS_ERROR = 'Environments / Set Environments Error';
export const REQUEST_ENVIRONMENTS_STATUSES = 'Environments / Request Environments Statuses';
export const SET_ENVIRONMENTS_STATUSES = 'Environments / Set Environments Statuses';
export const SET_ENVIRONMENTS_STATUSES_ERROR = 'Environments / Set Environments Statuses Error';
export const REQUEST_MONETARY_ZONES = 'Environment / Request Monetary zones';
export const SET_MONETARY_ZONES = 'Environment / Set Monetary zones';
export const SET_MONETARY_ZONES_ERROR = 'Environment / Set Monetary Zones Error';

export interface EnvironmentsState {
  isEnvironmentsPending: boolean;
  environments: Environment[];
  environmentsError: ErrorMessage;
  isMonetaryZonesPending: boolean;
  monetaryZones: MonetaryZone[];
  monetaryZonesError: ErrorMessage;
}

export interface MonetaryZone {
  monetaryZoneId: string;
  name: string;
}

export interface InitEnvironmentsAction {
  type: typeof INIT_ENVIRONMENTS;
}

export interface RequestEnvironmentsAction {
  type: typeof REQUEST_ENVIRONMENTS;
}

export interface SetEnvironmentsAction {
  type: typeof SET_ENVIRONMENTS;
  data: Environment[];
}

export interface SetEnvironmentsErrorAction {
  type: typeof SET_ENVIRONMENTS_ERROR;
  error: ErrorMessage;
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

export interface RequestMonetaryZonesAction {
  type: typeof REQUEST_MONETARY_ZONES;
}

export interface SetMonetaryZonesAction {
  type: typeof SET_MONETARY_ZONES;
  data: MonetaryZone[];
}

export interface SetMonetaryZonesErrorAction {
  type: typeof SET_MONETARY_ZONES_ERROR;
  error: ErrorMessage;
}

export type EnvironmentsActionTypes =
  | InitEnvironmentsAction
  | RequestEnvironmentsAction
  | SetEnvironmentsAction
  | SetEnvironmentsErrorAction
  | RequestMonetaryZonesAction
  | SetMonetaryZonesAction
  | SetMonetaryZonesErrorAction;
