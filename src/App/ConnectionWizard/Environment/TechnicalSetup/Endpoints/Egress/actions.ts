import { ErrorMessage } from 'App/types';

import {
  RequestEgressEndpointsAction,
  SubmitEgressEndpointsAction,
  ResetEgressAction,
  SetEgressIpsAction,
  SetEgressIpsErrorAction,
  ChangeEgressAddressAction,
  ChangeEgressPortAction,
  AddEgressIpAction,
  RemoveEgressIpAction,
  AddEgressPortAction,
  RemoveEgressPortAction,
  UndoEgressChangesAction,
  REQUEST_EGRESS_ENDPOINTS,
  SUBMIT_EGRESS_ENDPOINTS,
  RESET_EGRESS_ENDPOINT,
  SET_EGRESS_ENDPOINT_IPS,
  SET_EGRESS_ENDPOINT_IPS_ERROR,
  CHANGE_EGRESS_ENDPOINT_ADDRESS,
  CHANGE_EGRESS_ENDPOINT_PORT,
  ADD_EGRESS_ENDPOINT_IP,
  REMOVE_EGRESS_ENDPOINT_IP,
  ADD_EGRESS_ENDPOINT_PORT,
  REMOVE_EGRESS_ENDPOINT_PORT,
  UNDO_EGRESS_ENDPOINT_CHANGES,
  EgressIP,
} from './types';

export function requestEgressEndpoints(): RequestEgressEndpointsAction {
  return {
    type: REQUEST_EGRESS_ENDPOINTS,
  };
}
export function submitEgressEndpoints(): SubmitEgressEndpointsAction {
  return {
    type: SUBMIT_EGRESS_ENDPOINTS,
  };
}
export function resetEgress(): ResetEgressAction {
  return {
    type: RESET_EGRESS_ENDPOINT,
  };
}
export function setEgressIps({ ips }: { ips: EgressIP[] }): SetEgressIpsAction {
  return {
    type: SET_EGRESS_ENDPOINT_IPS,
    ips,
  };
}
export function setEgressIpsError({ error }: { error: ErrorMessage }): SetEgressIpsErrorAction {
  return {
    type: SET_EGRESS_ENDPOINT_IPS_ERROR,
    error,
  };
}

export function changeEgressAddress({
  index,
  address,
}: {
  address: string;
  index: number;
}): ChangeEgressAddressAction {
  return {
    type: CHANGE_EGRESS_ENDPOINT_ADDRESS,
    index,
    address,
  };
}
export function changeEgressPort({
  index,
  port,
  portIndex,
}: {
  index: number;
  port: string;
  portIndex: number;
}): ChangeEgressPortAction {
  return {
    type: CHANGE_EGRESS_ENDPOINT_PORT,
    index,
    port,
    portIndex,
  };
}
export function addEgressIp(): AddEgressIpAction {
  return {
    type: ADD_EGRESS_ENDPOINT_IP,
  };
}
export function removeEgressIp({ index }: { index: number }): RemoveEgressIpAction {
  return {
    type: REMOVE_EGRESS_ENDPOINT_IP,
    index,
  };
}
export function addEgressPort({ index }: { index: number }): AddEgressPortAction {
  return {
    type: ADD_EGRESS_ENDPOINT_PORT,
    index,
  };
}
export function removeEgressPort({
  index,
  portIndex,
}: {
  index: number;
  portIndex: number;
}): RemoveEgressPortAction {
  return {
    type: REMOVE_EGRESS_ENDPOINT_PORT,
    index,
    portIndex,
  };
}
export function undoEgressChanges(): UndoEgressChangesAction {
  return {
    type: UNDO_EGRESS_ENDPOINT_CHANGES,
  };
}
