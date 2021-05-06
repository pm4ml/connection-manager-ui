import { States } from '../types';

export const REQUEST_INGRESS_ENDPOINTS = 'Ingress Endpoint / Request endpoints';
export const SUBMIT_INGRESS_ENDPOINTS = 'Ingress Endpoint / Submit endpoints';
export const RESET_INGRESS_ENDPOINT = 'Ingress Endpoint / Reset';
export const SET_INGRESS_ENDPOINT_URLS = 'Ingress Endpoint / Set Urls';
export const SET_INGRESS_ENDPOINT_URLS_ERROR = 'Ingress Endpoint / Set Urls Error';
export const SET_INGRESS_ENDPOINT_IPS = 'Ingress Endpoint / Set Ips';
export const SET_INGRESS_ENDPOINT_IPS_ERROR = 'Ingress Endpoint / Set Ips Error';
export const CHANGE_INGRESS_ENDPOINT_URL = 'Ingress Endpoint / Change URL';
export const CHANGE_INGRESS_ENDPOINT_ADDRESS = 'Ingress Endpoint / Change IP';
export const CHANGE_INGRESS_ENDPOINT_PORT = 'Ingress Endpoint / Change Port';
export const ADD_INGRESS_ENDPOINT_IP = 'Ingress Endpoint / Add Configuration';
export const REMOVE_INGRESS_ENDPOINT_IP = 'Ingress Endpoint / Remove Configuration';
export const ADD_INGRESS_ENDPOINT_PORT = 'Ingress Endpoint / Add Port';
export const REMOVE_INGRESS_ENDPOINT_PORT = 'Ingress Endpoint / Remove Port';
export const UNDO_INGRESS_ENDPOINT_CHANGES = 'Ingress Endpoint / Undo Changes';

export interface ExternalIngressIP {
  id?: string;
  state: States;
  value: {
    address?: string;
    ports: (string | undefined)[];
  };
}

export interface ExternalIngressURL {
  id?: string;
  state: States;
  value: {
    url?: string;
  };
}

export interface IngressIP {
  id?: string;
  state: States;
  address?: string;
  ports: (string | undefined)[];
}

export interface IngressURL {
  id?: string;
  state: States;
  url?: string;
}

export interface IngressState {
  previousIngressUrls: IngressURL[];
  ingressUrlsError: string | null;
  ingressUrls: IngressURL[];
  previousIngressIps: IngressIP[];
  ingressIpsError: string | null;
  ingressIps: IngressIP[];
}

export interface RequestIngressEndpointsAction {
  type: typeof REQUEST_INGRESS_ENDPOINTS;
}
export interface SubmitIngressEndpointsAction {
  type: typeof SUBMIT_INGRESS_ENDPOINTS;
}
export interface ResetIngressAction {
  type: typeof RESET_INGRESS_ENDPOINT;
}
export interface SetIngressUrlsAction {
  type: typeof SET_INGRESS_ENDPOINT_URLS;
  urls: IngressURL[];
}
export interface SetIngressUrlsErrorAction {
  type: typeof SET_INGRESS_ENDPOINT_URLS_ERROR;
  error: string | null;
}
export interface SetIngressIpsAction {
  type: typeof SET_INGRESS_ENDPOINT_IPS;
  ips: IngressIP[];
}
export interface SetIngressIpsErrorAction {
  type: typeof SET_INGRESS_ENDPOINT_IPS_ERROR;
  error: string | null;
}
export interface ChangeIngressUrlAction {
  type: typeof CHANGE_INGRESS_ENDPOINT_URL;
  url: string;
  index: number;
}
export interface ChangeIngressAddressAction {
  type: typeof CHANGE_INGRESS_ENDPOINT_ADDRESS;
  address: string;
  index: number;
}
export interface ChangeIngressPortAction {
  type: typeof CHANGE_INGRESS_ENDPOINT_PORT;
  port: string;
  index: number;
  portIndex: number;
}
export interface AddIngressIpAction {
  type: typeof ADD_INGRESS_ENDPOINT_IP;
}
export interface RemoveIngressIpAction {
  type: typeof REMOVE_INGRESS_ENDPOINT_IP;
  index: number;
}
export interface AddIngressPortAction {
  type: typeof ADD_INGRESS_ENDPOINT_PORT;
  index: number;
}
export interface RemoveIngressPortAction {
  type: typeof REMOVE_INGRESS_ENDPOINT_PORT;
  index: number;
  portIndex: number;
}
export interface UndoIngressChangesAction {
  type: typeof UNDO_INGRESS_ENDPOINT_CHANGES;
}

export type IngressActionTypes =
  | RequestIngressEndpointsAction
  | ResetIngressAction
  | SetIngressUrlsAction
  | SetIngressUrlsErrorAction
  | SetIngressIpsAction
  | SetIngressIpsErrorAction
  | ChangeIngressUrlAction
  | ChangeIngressAddressAction
  | ChangeIngressPortAction
  | AddIngressIpAction
  | RemoveIngressIpAction
  | AddIngressPortAction
  | RemoveIngressPortAction
  | UndoIngressChangesAction;
