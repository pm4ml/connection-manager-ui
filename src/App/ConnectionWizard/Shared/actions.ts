import { ErrorMessage } from 'App/types';
import { EnvironmentStatus } from '../types';
import {
  REQUEST_ENVIRONMENTS_STATUSES,
  SET_ENVIRONMENTS_STATUSES,
  SET_ENVIRONMENTS_STATUSES_ERROR,
  REQUEST_ENVIRONMENT_STATUS,
  SET_ENVIRONMENT_STATUS,
  SET_ENVIRONMENT_STATUS_ERROR,
  RequestEnvironmentsStatusesAction,
  SetEnvironmentsStatusesAction,
  SetEnvironmentsStatusesErrorAction,
  RequestEnvironmentStatusAction,
  SetEnvironmentStatusAction,
  SetEnvironmentStatusErrorAction,
} from './types';

export function requestEnvironmentsStatuses(): RequestEnvironmentsStatusesAction {
  return {
    type: REQUEST_ENVIRONMENTS_STATUSES,
  };
}

export function setEnvironmentsStatuses({
  data,
}: {
  data: EnvironmentStatus[];
}): SetEnvironmentsStatusesAction {
  return {
    type: SET_ENVIRONMENTS_STATUSES,
    data,
  };
}

export function setEnvironmentsStatusesError({
  error,
}: {
  error: ErrorMessage;
}): SetEnvironmentsStatusesErrorAction {
  return {
    type: SET_ENVIRONMENTS_STATUSES_ERROR,
    error,
  };
}

export function requestEnvironmentStatus(): RequestEnvironmentStatusAction {
  return {
    type: REQUEST_ENVIRONMENT_STATUS,
  };
}

export function setEnvironmentStatus({
  data,
}: {
  data: EnvironmentStatus;
}): SetEnvironmentStatusAction {
  return {
    type: SET_ENVIRONMENT_STATUS,
    data,
  };
}

export function setEnvironmentStatusError({
  error,
}: {
  error: ErrorMessage;
}): SetEnvironmentStatusErrorAction {
  return {
    type: SET_ENVIRONMENT_STATUS_ERROR,
    error,
  };
}
