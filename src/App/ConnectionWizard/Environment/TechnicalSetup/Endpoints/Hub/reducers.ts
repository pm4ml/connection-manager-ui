import {
  HubState,
  HubActionTypes,
  RESET_HUB_ENDPOINTS,
  SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS,
  SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS_ERROR,
  SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS,
  SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS_ERROR,
} from './types';

const initialState: HubState = {
  egressHubEndpoints: [],
  egressHubEndpointsError: null,
  ingressHubEndpoints: [],
  ingressHubEndpointsError: null,
};

export default function hubEndpointsReducer(
  state = initialState,
  action: HubActionTypes
): HubState {
  switch (action.type) {
    case RESET_HUB_ENDPOINTS: {
      return initialState;
    }
    case SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS: {
      return {
        ...state,
        egressHubEndpoints: action.data,
      };
    }
    case SET_HUB_ENDPOINTS_EGRESS_ENDPOINTS_ERROR: {
      return {
        ...state,
        egressHubEndpointsError: action.error,
      };
    }
    case SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS: {
      return {
        ...state,
        ingressHubEndpoints: action.data,
      };
    }
    case SET_HUB_ENDPOINTS_INGRESS_ENDPOINTS_ERROR: {
      return {
        ...state,
        ingressHubEndpointsError: action.error,
      };
    }
    default:
      return state;
  }
}
