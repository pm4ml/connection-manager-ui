import {
  SET_APP_CONFIG,
  SHOW_TOAST,
  SET_TOAST_VISIBLE,
  SHOW_ERROR_MODAL,
  HIDE_ERROR_MODAL,
  SET_USER,
  AppState,
  AppActionTypes,
  SET_METRIC,
  MetricsData,
  MetricData,
} from './types';

const initialState = {
  config: {
    apiBaseUrl: '',
  },
  isSuccessToastVisible: false,
  isErrorModalVisible: false,
  errorModalPayload: undefined,
  metricsData: {} as MetricsData<MetricData>,
  // user: null,
};

export default function appReducer(state = initialState, action: AppActionTypes): AppState {
  switch (action.type) {
    case SET_APP_CONFIG: {
      return {
        ...state,
        config: action.config,
      };
    }
    case SHOW_TOAST: {
      return {
        ...state,
        isSuccessToastVisible: true,
      };
    }
    case SET_TOAST_VISIBLE: {
      return {
        ...state,
        isSuccessToastVisible: action.visible,
      };
    }
    case SHOW_ERROR_MODAL: {
      return {
        ...state,
        isErrorModalVisible: true,
        errorModalPayload: action.payload,
      };
    }
    case HIDE_ERROR_MODAL: {
      return {
        ...state,
        isErrorModalVisible: false,
        errorModalPayload: undefined,
      };
    }
    case SET_METRIC: {
      const ret = {
        ...state,
      };
      ret.metricsData[action.data.metricName] = action.data;
      return ret;
    }
    case SET_USER: {
      return {
        ...state,
        user: action.data,
      };
    }
    default:
      return state;
  }
}
