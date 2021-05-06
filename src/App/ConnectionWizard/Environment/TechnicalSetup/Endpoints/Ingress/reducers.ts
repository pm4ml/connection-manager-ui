import isEqual from 'lodash/isEqual';
import { States } from '../types';
import {
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
  IngressActionTypes,
  IngressState,
} from './types';

const initialIngressIp: IngressIP = {
  id: undefined,
  state: States.Unset,
  address: undefined,
  ports: [undefined],
};
const initialIngressUrl: IngressURL = {
  id: undefined,
  state: States.Unset,
  url: undefined,
};

const initialState: IngressState = {
  previousIngressUrls: [initialIngressUrl],
  ingressUrlsError: null,
  ingressUrls: [initialIngressUrl],
  previousIngressIps: [initialIngressIp],
  ingressIpsError: null,
  ingressIps: [initialIngressIp],
};

export default function ingressReducer(
  state = initialState,
  action: IngressActionTypes
): IngressState {
  switch (action.type) {
    case RESET_INGRESS_ENDPOINT: {
      return initialState;
    }
    case SET_INGRESS_ENDPOINT_URLS: {
      // we should set an empty url structure
      // if the dfsp has no urls set
      let { urls } = action;
      if (isEqual(urls, [])) {
        urls = [initialIngressUrl];
      }
      return {
        ...state,
        previousIngressUrls: urls,
        ingressUrls: urls,
      };
    }
    case SET_INGRESS_ENDPOINT_URLS_ERROR: {
      return {
        ...state,
        ingressUrlsError: action.error,
      };
    }
    case SET_INGRESS_ENDPOINT_IPS: {
      // we should set an empty ip structure
      // if the dfsp has no ips set
      let { ips } = action;
      if (isEqual(ips, [])) {
        ips = [initialIngressIp];
      }
      return {
        ...state,
        previousIngressIps: ips,
        ingressIps: ips,
      };
    }
    case SET_INGRESS_ENDPOINT_IPS_ERROR: {
      return {
        ...state,
        ingressIpsError: action.error,
      };
    }
    case CHANGE_INGRESS_ENDPOINT_URL: {
      const { url, index } = action;
      return {
        ...state,
        ingressUrls: [
          ...state.ingressUrls.slice(0, index),
          {
            ...state.ingressUrls[index],
            url,
          },
          ...state.ingressUrls.slice(index + 1),
        ],
      };
    }
    case CHANGE_INGRESS_ENDPOINT_ADDRESS: {
      const { address, index } = action;
      return {
        ...state,
        ingressIps: [
          ...state.ingressIps.slice(0, index),
          {
            ...state.ingressIps[index],
            address,
          },
          ...state.ingressIps.slice(index + 1),
        ],
      };
    }
    case CHANGE_INGRESS_ENDPOINT_PORT: {
      const { port, index, portIndex } = action;
      return {
        ...state,
        ingressIps: [
          ...state.ingressIps.slice(0, index),
          {
            ...state.ingressIps[index],
            ports: [
              ...state.ingressIps[index].ports.slice(0, portIndex),
              port,
              ...state.ingressIps[index].ports.slice(portIndex + 1),
            ],
          },
          ...state.ingressIps.slice(index + 1),
        ],
      };
    }
    case ADD_INGRESS_ENDPOINT_IP: {
      return {
        ...state,
        ingressIps: [...state.ingressIps, initialIngressIp],
      };
    }
    case REMOVE_INGRESS_ENDPOINT_IP: {
      const { index } = action;
      return {
        ...state,
        ingressIps: [...state.ingressIps.slice(0, index), ...state.ingressIps.slice(index + 1)],
      };
    }
    case ADD_INGRESS_ENDPOINT_PORT: {
      const { index } = action;
      return {
        ...state,
        ingressIps: [
          ...state.ingressIps.slice(0, index),
          {
            ...state.ingressIps[index],
            ports: [...state.ingressIps[index].ports, undefined],
          },
          ...state.ingressIps.slice(index + 1),
        ],
      };
    }
    case REMOVE_INGRESS_ENDPOINT_PORT: {
      const { portIndex, index } = action;
      return {
        ...state,
        ingressIps: [
          ...state.ingressIps.slice(0, index),
          {
            ...state.ingressIps[index],
            ports: [
              ...state.ingressIps[index].ports.slice(0, portIndex),
              ...state.ingressIps[index].ports.slice(portIndex + 1),
            ],
          },
          ...state.ingressIps.slice(index + 1),
        ],
      };
    }
    case UNDO_INGRESS_ENDPOINT_CHANGES: {
      return {
        ...state,
        ingressUrls: [...state.previousIngressUrls],
        ingressIps: [...state.previousIngressIps],
      };
    }
    default: {
      return state;
    }
  }
}

export { initialState, initialIngressIp, initialIngressUrl };
