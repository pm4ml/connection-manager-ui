import { ErrorMessage } from 'App/types';

import {
  RequestIngressEndpointsAction,
  SubmitIngressEndpointsAction,
  ResetIngressAction,
  SetIngressUrlsAction,
  SetIngressUrlsErrorAction,
  SetIngressIpsAction,
  SetIngressIpsErrorAction,
  ChangeIngressUrlAction,
  ChangeIngressAddressAction,
  ChangeIngressPortAction,
  AddIngressIpAction,
  RemoveIngressIpAction,
  AddIngressPortAction,
  RemoveIngressPortAction,
  UndoIngressChangesAction,
  REQUEST_INGRESS_ENDPOINTS,
  SUBMIT_INGRESS_ENDPOINTS,
  RESET_INGRESS_ENDPOINT,
  SET_INGRESS_ENDPOINT_URLS,
  SET_INGRESS_ENDPOINT_URLS_ERROR,
  SET_INGRESS_ENDPOINT_IPS,
  SET_INGRESS_ENDPOINT_IPS_ERROR,
  CHANGE_INGRESS_ENDPOINT_URL,
  CHANGE_INGRESS_ENDPOINT_ADDRESS,
  CHANGE_INGRESS_ENDPOINT_PORT,
  ADD_INGRESS_ENDPOINT_IP,
  REMOVE_INGRESS_ENDPOINT_IP,
  ADD_INGRESS_ENDPOINT_PORT,
  REMOVE_INGRESS_ENDPOINT_PORT,
  UNDO_INGRESS_ENDPOINT_CHANGES,
  IngressURL,
  IngressIP,
} from './types';

export function requestIngressEndpoints(): RequestIngressEndpointsAction {
  return {
    type: REQUEST_INGRESS_ENDPOINTS,
  };
}
export function submitIngressEndpoints(): SubmitIngressEndpointsAction {
  return {
    type: SUBMIT_INGRESS_ENDPOINTS,
  };
}
export function resetIngress(): ResetIngressAction {
  return {
    type: RESET_INGRESS_ENDPOINT,
  };
}
export function setIngressUrls({ urls }: { urls: IngressURL[] }): SetIngressUrlsAction {
  return {
    type: SET_INGRESS_ENDPOINT_URLS,
    urls,
  };
}
export function setIngressUrlsError({ error }: { error: ErrorMessage }): SetIngressUrlsErrorAction {
  return {
    type: SET_INGRESS_ENDPOINT_URLS_ERROR,
    error,
  };
}
export function setIngressIps({ ips }: { ips: IngressIP[] }): SetIngressIpsAction {
  return {
    type: SET_INGRESS_ENDPOINT_IPS,
    ips,
  };
}
export function setIngressIpsError({ error }: { error: ErrorMessage }): SetIngressIpsErrorAction {
  return {
    type: SET_INGRESS_ENDPOINT_IPS_ERROR,
    error,
  };
}
export function changeIngressUrl({
  url,
  index,
}: {
  url: string;
  index: number;
}): ChangeIngressUrlAction {
  return {
    type: CHANGE_INGRESS_ENDPOINT_URL,
    url,
    index,
  };
}
export function changeIngressAddress({
  index,
  address,
}: {
  address: string;
  index: number;
}): ChangeIngressAddressAction {
  return {
    type: CHANGE_INGRESS_ENDPOINT_ADDRESS,
    index,
    address,
  };
}
export function changeIngressPort({
  index,
  port,
  portIndex,
}: {
  index: number;
  port: string;
  portIndex: number;
}): ChangeIngressPortAction {
  return {
    type: CHANGE_INGRESS_ENDPOINT_PORT,
    index,
    port,
    portIndex,
  };
}
export function addIngressIp(): AddIngressIpAction {
  return {
    type: ADD_INGRESS_ENDPOINT_IP,
  };
}
export function removeIngressIp({ index }: { index: number }): RemoveIngressIpAction {
  return {
    type: REMOVE_INGRESS_ENDPOINT_IP,
    index,
  };
}
export function addIngressPort({ index }: { index: number }): AddIngressPortAction {
  return {
    type: ADD_INGRESS_ENDPOINT_PORT,
    index,
  };
}
export function removeIngressPort({
  index,
  portIndex,
}: {
  index: number;
  portIndex: number;
}): RemoveIngressPortAction {
  return {
    type: REMOVE_INGRESS_ENDPOINT_PORT,
    index,
    portIndex,
  };
}
export function undoIngressChanges(): UndoIngressChangesAction {
  return {
    type: UNDO_INGRESS_ENDPOINT_CHANGES,
  };
}
