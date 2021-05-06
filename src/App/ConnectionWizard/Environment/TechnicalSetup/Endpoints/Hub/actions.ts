import {
  RESET_HUB_ENDPOINTS,
  ResetHubEndpointsAction,
  REQUEST_HUB_ENDPOINTS,
  RequestHubEndpointsAction,
  SetHubEndpointsEgressEndpointsAction,
  SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS,
  SetHubEndpointsEgressEndpointsErrorAction,
  SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS_ERROR,
  SetHubEndpointsIngressEndpointsAction,
  SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS,
  SetHubEndpointsIngressEndpointsErrorAction,
  SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS_ERROR,
  EgressHubEndpoint,
  IngressHubEndpoint,
} from './types';

export function resetHubEndpoints(): ResetHubEndpointsAction {
  return {
    type: RESET_HUB_ENDPOINTS,
  };
}

export function requestHubEndpoints(): RequestHubEndpointsAction {
  return {
    type: REQUEST_HUB_ENDPOINTS,
  };
}

export function setHubEndpointsEgressEndpoints({
  data,
}: {
  data: EgressHubEndpoint[];
}): SetHubEndpointsEgressEndpointsAction {
  return {
    type: SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS,
    data,
  };
}
export function setHubEndpointsEgressEndpointsError({
  error,
}: {
  error: string;
}): SetHubEndpointsEgressEndpointsErrorAction {
  return {
    type: SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS_ERROR,
    error,
  };
}

export function setHubEndpointsIngressEndpoints({
  data,
}: {
  data: IngressHubEndpoint[];
}): SetHubEndpointsIngressEndpointsAction {
  return {
    type: SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS,
    data,
  };
}
export function setHubEndpointsIngressEndpointsError({
  error,
}: {
  error: string;
}): SetHubEndpointsIngressEndpointsErrorAction {
  return {
    type: SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS_ERROR,
    error,
  };
}
