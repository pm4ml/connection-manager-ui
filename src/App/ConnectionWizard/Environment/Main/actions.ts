import { ErrorMessage } from 'App/types';
import {
  REQUEST_ENVIRONMENT_DATA,
  RequestEnvironmentDataAction,
  REQUEST_DFSP,
  SET_DFSP,
  SET_DFSP_ERROR,
  REQUEST_DFSPS,
  SET_DFSPS,
  SET_DFSPS_ERROR,
  RequestDfspAction,
  SetDfspAction,
  SetDfspErrorAction,
  RequestDfspsAction,
  SetDfspsAction,
  SetDfspsErrorAction,
  DFSP,
} from './types';

export function requestEnvironmentData(): RequestEnvironmentDataAction {
  return {
    type: REQUEST_ENVIRONMENT_DATA,
  };
}

export function requestDfsp(): RequestDfspAction {
  return {
    type: REQUEST_DFSP,
  };
}

export function setDfsp({ data }: { data: DFSP }): SetDfspAction {
  return {
    type: SET_DFSP,
    data,
  };
}
export function setDfspError({ error }: { error: ErrorMessage }): SetDfspErrorAction {
  return {
    type: SET_DFSP_ERROR,
    error,
  };
}

export function requestDfsps(): RequestDfspsAction {
  return {
    type: REQUEST_DFSPS,
  };
}

export function setDfsps({ data }: { data: DFSP[] }): SetDfspsAction {
  return {
    type: SET_DFSPS,
    data,
  };
}

export function setDfspsError({ error }: { error: ErrorMessage }): SetDfspsErrorAction {
  return {
    type: SET_DFSPS_ERROR,
    error,
  };
}
