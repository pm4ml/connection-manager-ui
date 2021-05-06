import {
  REQUEST_ENVIRONMENTS_STATUSES,
  SET_ENVIRONMENTS_STATUSES,
  SET_ENVIRONMENTS_STATUSES_ERROR,
  REQUEST_ENVIRONMENT_STATUS,
  SET_ENVIRONMENT_STATUS,
  SET_ENVIRONMENT_STATUS_ERROR,
  SharedState,
  SharedActionTypes,
} from './types';

const initialState = {
  isEnvironmentsStatusesPending: false,
  environmentsStatuses: [],
  environmentsStatusesError: null,
};

export default function appReducer(
  state: SharedState = initialState,
  action: SharedActionTypes
): SharedState {
  switch (action.type) {
    case REQUEST_ENVIRONMENTS_STATUSES: {
      return {
        ...state,
        isEnvironmentsStatusesPending: true,
        environmentsStatuses: initialState.environmentsStatuses,
        environmentsStatusesError: initialState.environmentsStatusesError,
      };
    }
    case SET_ENVIRONMENTS_STATUSES: {
      return {
        ...state,
        isEnvironmentsStatusesPending: false,
        environmentsStatuses: action.data,
        environmentsStatusesError: initialState.environmentsStatusesError,
      };
    }
    case SET_ENVIRONMENTS_STATUSES_ERROR: {
      return {
        ...state,
        isEnvironmentsStatusesPending: false,
        environmentsStatuses: initialState.environmentsStatuses,
        environmentsStatusesError: action.error,
      };
    }
    case REQUEST_ENVIRONMENT_STATUS: {
      return {
        ...state,
        isEnvironmentsStatusesPending: true,
        environmentsStatusesError: initialState.environmentsStatusesError,
      };
    }
    case SET_ENVIRONMENT_STATUS: {
      const { environmentId } = action.data;
      const index = state.environmentsStatuses.findIndex(
        (status) => status.environmentId === environmentId
      );
      if (index) {
        return {
          ...state,
          isEnvironmentsStatusesPending: false,
          environmentsStatuses: [
            ...state.environmentsStatuses.slice(0, index - 1),
            { ...action.data },
            ...state.environmentsStatuses.slice(index + 1),
          ],
          environmentsStatusesError: initialState.environmentsStatusesError,
        };
      }
      return {
        ...state,
        isEnvironmentsStatusesPending: false,
        environmentsStatuses: [action.data],
        environmentsStatusesError: initialState.environmentsStatusesError,
      };
    }
    case SET_ENVIRONMENT_STATUS_ERROR: {
      return {
        ...state,
        isEnvironmentsStatusesPending: false,
        environmentsStatuses: initialState.environmentsStatuses,
        environmentsStatusesError: action.error,
      };
    }
    default:
      return state;
  }
}
