import { ErrorMessage } from 'App/types';
import { Types, Directions } from '../types';

export const RESET_HUB_ENDPOINTS = 'Hub Endpoints / Reset Endpoints';
export const REQUEST_HUB_ENDPOINTS = 'Hub Endpoints / Request Endpoints';
export const SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS = 'Hub Endpoints / Set Egress Endpoints';
export const SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS_ERROR =
  'Hub Endpoints / Set Egress Endpoints Error';
export const SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS = 'Hub Endpoints / Set Ingress Endpoints';
export const SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS_ERROR =
  'Hub Endpoints / Set Ingress Endpoints Error';

export interface HubEndpointAddress {
  address: string;
  ports: (string | undefined)[];
}

export interface HubEndpointURL {
  url: string;
}

export type HubEndpointValue = HubEndpointAddress | HubEndpointURL;

export interface EgressHubEndpoint {
  direction: Directions;
  value: HubEndpointValue;
  type: Types;
}

export interface IngressHubEndpoint {
  direction: Directions;
  value: HubEndpointValue;
  type: Types;
}

export interface HubState {
  egressHubEndpoints: EgressHubEndpoint[];
  egressHubEndpointsError?: ErrorMessage;
  ingressHubEndpoints: IngressHubEndpoint[];
  ingressHubEndpointsError?: ErrorMessage;
}

export interface ResetHubEndpointsAction {
  type: typeof RESET_HUB_ENDPOINTS;
}
export interface RequestHubEndpointsAction {
  type: typeof REQUEST_HUB_ENDPOINTS;
}
export interface SetHubEndpointsEgressEndpointsAction {
  type: typeof SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS;
  data: EgressHubEndpoint[];
}
export interface SetHubEndpointsEgressEndpointsErrorAction {
  type: typeof SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS_ERROR;
  error: string;
}

export interface SetHubEndpointsIngressEndpointsAction {
  type: typeof SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS;
  data: IngressHubEndpoint[];
}
export interface SetHubEndpointsIngressEndpointsErrorAction {
  type: typeof SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS_ERROR;
  error: string;
}

export type HubActionTypes =
  | ResetHubEndpointsAction
  | SetHubEndpointsEgressEndpointsAction
  | SetHubEndpointsEgressEndpointsErrorAction
  | SetHubEndpointsIngressEndpointsAction
  | SetHubEndpointsIngressEndpointsErrorAction;
