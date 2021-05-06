import { ErrorMessage } from 'App/types';
import { Environment } from '../types';
import {
  INIT_ENVIRONMENTS,
  REQUEST_ENVIRONMENTS,
  SET_ENVIRONMENTS,
  SET_ENVIRONMENTS_ERROR,
  REQUEST_MONETARY_ZONES,
  SET_MONETARY_ZONES,
  SET_MONETARY_ZONES_ERROR,
  InitEnvironmentsAction,
  RequestEnvironmentsAction,
  SetEnvironmentsAction,
  SetEnvironmentsErrorAction,
  RequestMonetaryZonesAction,
  SetMonetaryZonesAction,
  SetMonetaryZonesErrorAction,
  MonetaryZone,
} from './types';

export function initEnvironments(): InitEnvironmentsAction {
  return {
    type: INIT_ENVIRONMENTS,
  };
}

export function requestEnvironments(): RequestEnvironmentsAction {
  return {
    type: REQUEST_ENVIRONMENTS,
  };
}

export function setEnvironments({ data }: { data: Environment[] }): SetEnvironmentsAction {
  return {
    type: SET_ENVIRONMENTS,
    data,
  };
}

export function setEnvironmentsError({
  error,
}: {
  error: ErrorMessage;
}): SetEnvironmentsErrorAction {
  return {
    type: SET_ENVIRONMENTS_ERROR,
    error,
  };
}

export function setMonetaryZones({ data }: { data: MonetaryZone[] }): SetMonetaryZonesAction {
  return {
    type: SET_MONETARY_ZONES,
    data,
  };
}
export function requestMonetaryZones(): RequestMonetaryZonesAction {
  return {
    type: REQUEST_MONETARY_ZONES,
  };
}

export function setMonetaryZonesError({
  error,
}: {
  error: ErrorMessage;
}): SetMonetaryZonesErrorAction {
  return {
    type: SET_MONETARY_ZONES_ERROR,
    error,
  };
}
