import isEqual from 'lodash/isEqual';
import { States } from '../types';
import {
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
  EgressActionTypes,
  EgressState,
} from './types';

const initialEgressIp: EgressIP = {
  id: undefined,
  state: States.Unset,
  address: undefined,
  ports: [undefined],
};
const initialState: EgressState = {
  previousEgressIps: [initialEgressIp],
  egressIpsError: null,
  egressIps: [initialEgressIp],
};

export default function egressReducer(
  state = initialState,
  action: EgressActionTypes
): EgressState {
  switch (action.type) {
    case RESET_EGRESS_ENDPOINT: {
      return initialState;
    }
    case SET_EGRESS_ENDPOINT_IPS: {
      // we should set an empty ip structure
      // if the dfsp has no ips set
      let { ips } = action;
      if (isEqual(ips, [])) {
        ips = [initialEgressIp];
      }
      return {
        ...state,
        previousEgressIps: ips,
        egressIps: ips,
      };
    }
    case SET_EGRESS_ENDPOINT_IPS_ERROR: {
      return {
        ...state,
        egressIpsError: action.error,
      };
    }
    case CHANGE_EGRESS_ENDPOINT_ADDRESS: {
      const { address, index } = action;
      return {
        ...state,
        egressIps: [
          ...state.egressIps.slice(0, index),
          {
            ...state.egressIps[index],
            address,
          },
          ...state.egressIps.slice(index + 1),
        ],
      };
    }
    case CHANGE_EGRESS_ENDPOINT_PORT: {
      const { port, index, portIndex } = action;
      return {
        ...state,
        egressIps: [
          ...state.egressIps.slice(0, index),
          {
            ...state.egressIps[index],
            ports: [
              ...state.egressIps[index].ports.slice(0, portIndex),
              port,
              ...state.egressIps[index].ports.slice(portIndex + 1),
            ],
          },
          ...state.egressIps.slice(index + 1),
        ],
      };
    }
    case ADD_EGRESS_ENDPOINT_IP: {
      return {
        ...state,
        egressIps: [...state.egressIps, initialEgressIp],
      };
    }
    case REMOVE_EGRESS_ENDPOINT_IP: {
      const { index } = action;
      return {
        ...state,
        egressIps: [...state.egressIps.slice(0, index), ...state.egressIps.slice(index + 1)],
      };
    }
    case ADD_EGRESS_ENDPOINT_PORT: {
      const { index } = action;
      return {
        ...state,
        egressIps: [
          ...state.egressIps.slice(0, index),
          {
            ...state.egressIps[index],
            ports: [...state.egressIps[index].ports, undefined],
          },
          ...state.egressIps.slice(index + 1),
        ],
      };
    }
    case REMOVE_EGRESS_ENDPOINT_PORT: {
      const { portIndex, index } = action;
      return {
        ...state,
        egressIps: [
          ...state.egressIps.slice(0, index),
          {
            ...state.egressIps[index],
            ports: [
              ...state.egressIps[index].ports.slice(0, portIndex),
              ...state.egressIps[index].ports.slice(portIndex + 1),
            ],
          },
          ...state.egressIps.slice(index + 1),
        ],
      };
    }
    case UNDO_EGRESS_ENDPOINT_CHANGES: {
      return {
        ...state,
        egressIps: [...state.previousEgressIps],
      };
    }
    default: {
      return state;
    }
  }
}

export { initialState, initialEgressIp };
