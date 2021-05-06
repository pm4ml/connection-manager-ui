import { States } from '../types';

export const REQUEST_EGRESS_ENDPOINTS = 'Egress Endpoint / Request endpoints';
export const SUBMIT_EGRESS_ENDPOINTS = 'Egress Endpoint / Submit endpoints';
export const RESET_EGRESS_ENDPOINT = 'Egress Endpoint / Reset';
export const SET_EGRESS_ENDPOINT_IPS = 'Egress Endpoint / Set Ips';
export const SET_EGRESS_ENDPOINT_IPS_ERROR = 'Egress Endpoint / Set Ips Error';
export const CHANGE_EGRESS_ENDPOINT_ADDRESS = 'Egress Endpoint / Change IP';
export const CHANGE_EGRESS_ENDPOINT_PORT = 'Egress Endpoint / Change Port';
export const ADD_EGRESS_ENDPOINT_IP = 'Egress Endpoint / Add Configuration';
export const REMOVE_EGRESS_ENDPOINT_IP = 'Egress Endpoint / Remove Configuration';
export const ADD_EGRESS_ENDPOINT_PORT = 'Egress Endpoint / Add Port';
export const REMOVE_EGRESS_ENDPOINT_PORT = 'Egress Endpoint / Remove Port';
export const UNDO_EGRESS_ENDPOINT_CHANGES = 'Egress Endpoint / Undo Changes';

export interface ExternalEgressIP {
  id?: string;
  state: States;
  value: {
    address?: string;
    ports: (string | undefined)[];
  };
}

export interface EgressIP {
  id?: string;
  state: States;
  address?: string;
  ports: (string | undefined)[];
}

export interface EgressState {
  previousEgressIps: EgressIP[];
  egressIpsError: string | null;
  egressIps: EgressIP[];
}

export interface RequestEgressEndpointsAction {
  type: typeof REQUEST_EGRESS_ENDPOINTS;
}
export interface SubmitEgressEndpointsAction {
  type: typeof SUBMIT_EGRESS_ENDPOINTS;
}
export interface ResetEgressAction {
  type: typeof RESET_EGRESS_ENDPOINT;
}
export interface SetEgressIpsAction {
  type: typeof SET_EGRESS_ENDPOINT_IPS;
  ips: EgressIP[];
}
export interface SetEgressIpsErrorAction {
  type: typeof SET_EGRESS_ENDPOINT_IPS_ERROR;
  error: string | null;
}
export interface ChangeEgressAddressAction {
  type: typeof CHANGE_EGRESS_ENDPOINT_ADDRESS;
  address: string;
  index: number;
}
export interface ChangeEgressPortAction {
  type: typeof CHANGE_EGRESS_ENDPOINT_PORT;
  port: string;
  index: number;
  portIndex: number;
}
export interface AddEgressIpAction {
  type: typeof ADD_EGRESS_ENDPOINT_IP;
}
export interface RemoveEgressIpAction {
  type: typeof REMOVE_EGRESS_ENDPOINT_IP;
  index: number;
}
export interface AddEgressPortAction {
  type: typeof ADD_EGRESS_ENDPOINT_PORT;
  index: number;
}
export interface RemoveEgressPortAction {
  type: typeof REMOVE_EGRESS_ENDPOINT_PORT;
  index: number;
  portIndex: number;
}
export interface UndoEgressChangesAction {
  type: typeof UNDO_EGRESS_ENDPOINT_CHANGES;
}

export type EgressActionTypes =
  | RequestEgressEndpointsAction
  | ResetEgressAction
  | SetEgressIpsAction
  | SetEgressIpsErrorAction
  | ChangeEgressAddressAction
  | ChangeEgressPortAction
  | AddEgressIpAction
  | RemoveEgressIpAction
  | AddEgressPortAction
  | RemoveEgressPortAction
  | UndoEgressChangesAction;
