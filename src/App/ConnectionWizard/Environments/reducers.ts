import {
  INIT_ENVIRONMENTS,
  REQUEST_ENVIRONMENTS,
  SET_ENVIRONMENTS,
  SET_ENVIRONMENTS_ERROR,
  REQUEST_MONETARY_ZONES,
  SET_MONETARY_ZONES,
  SET_MONETARY_ZONES_ERROR,
  EnvironmentsActionTypes,
  EnvironmentsState,
} from './types';

const initialState = {
  isEnvironmentsPending: false,
  environments: [],
  environmentsError: null,
  isMonetaryZonesPending: false,
  monetaryZones: [],
  monetaryZonesError: null,
};

export default function appReducer(
  state: EnvironmentsState = initialState,
  action: EnvironmentsActionTypes
): EnvironmentsState {
  switch (action.type) {
    case INIT_ENVIRONMENTS: {
      return {
        ...state,
        isEnvironmentsPending: true,
        environments: initialState.environments,
        environmentsError: initialState.environmentsError,
        isMonetaryZonesPending: true,
        monetaryZones: initialState.monetaryZones,
        monetaryZonesError: initialState.monetaryZonesError,
      };
    }

    case REQUEST_ENVIRONMENTS: {
      return {
        ...state,
        isEnvironmentsPending: true,
        environments: initialState.environments,
        environmentsError: initialState.environmentsError,
      };
    }
    case SET_ENVIRONMENTS: {
      return {
        ...state,
        isEnvironmentsPending: false,
        environments: action.data,
        environmentsError: initialState.environmentsError,
      };
    }
    case SET_ENVIRONMENTS_ERROR: {
      return {
        ...state,
        isEnvironmentsPending: false,
        environments: initialState.environments,
        environmentsError: action.error,
      };
    }
    case REQUEST_MONETARY_ZONES: {
      return {
        ...state,
        isMonetaryZonesPending: true,
        monetaryZones: initialState.monetaryZones,
        monetaryZonesError: initialState.monetaryZonesError,
      };
    }
    case SET_MONETARY_ZONES: {
      return {
        ...state,
        isMonetaryZonesPending: false,
        monetaryZones: action.data,
        monetaryZonesError: initialState.monetaryZonesError,
      };
    }
    case SET_MONETARY_ZONES_ERROR: {
      return {
        ...state,
        isMonetaryZonesPending: false,
        monetaryZones: initialState.monetaryZones,
        monetaryZonesError: action.error,
      };
    }
    default:
      return state;
  }
}
