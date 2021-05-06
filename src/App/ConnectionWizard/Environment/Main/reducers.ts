import {
  REQUEST_ENVIRONMENT_DATA,
  REQUEST_DFSP,
  SET_DFSP,
  SET_DFSP_ERROR,
  REQUEST_DFSPS,
  SET_DFSPS,
  SET_DFSPS_ERROR,
  MainActionTypes,
  MainState,
} from './types';

const initialState = {
  isDfspPending: false,
  dfsp: undefined,
  dfspError: null,
  isDfspsPending: false,
  dfsps: [],
  dfspsError: null,
};

function reducer(state = initialState, action: MainActionTypes): MainState {
  switch (action.type) {
    case REQUEST_ENVIRONMENT_DATA: {
      return initialState;
    }
    case REQUEST_DFSP: {
      return {
        ...state,
        isDfspPending: true,
        dfsp: initialState.dfsp,
        dfspError: initialState.dfspError,
      };
    }
    case SET_DFSP: {
      return {
        ...state,
        isDfspPending: false,
        dfsp: action.data,
        dfspError: initialState.dfspError,
      };
    }
    case SET_DFSP_ERROR: {
      return {
        ...state,
        isDfspPending: false,
        dfsp: initialState.dfsp,
        dfspError: action.error,
      };
    }
    case REQUEST_DFSPS: {
      return {
        ...state,
        isDfspsPending: true,
        dfsps: initialState.dfsps,
        dfspsError: initialState.dfspsError,
      };
    }
    case SET_DFSPS: {
      return {
        ...state,
        isDfspsPending: false,
        dfsps: action.data,
        dfspsError: initialState.dfspsError,
      };
    }
    case SET_DFSPS_ERROR: {
      return {
        ...state,
        isDfspsPending: false,
        dfsps: initialState.dfsps,
        dfspsError: action.error,
      };
    }
    default:
      return state;
  }
}

export default reducer;
