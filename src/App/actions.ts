import {
  SET_APP_CONFIG,
  SHOW_TOAST,
  SET_TOAST_VISIBLE,
  SHOW_ERROR_MODAL,
  HIDE_ERROR_MODAL,
  SetAppConfigAction,
  ShowToastAction,
  SetToastVisibleAction,
  ShowErrorModalAction,
  HideErrorModalAction,
  ErrorPayload,
  ErrorMessage,
  AppConfig,
  REQUEST_METRIC,
  SET_METRIC,
  SET_METRIC_ERROR,
  RequestMetricAction,
  SetMetricAction,
  SetMetricErrorAction,
  MetricDataWrapper,
  MetricData,
} from './types';

export function setAppConfig({ config }: { config: AppConfig }): SetAppConfigAction {
  return {
    type: SET_APP_CONFIG,
    config,
  };
}

export function showToast(): ShowToastAction {
  return {
    type: SHOW_TOAST,
  };
}

export function setToastVisible(visible: boolean): SetToastVisibleAction {
  return {
    type: SET_TOAST_VISIBLE,
    visible,
  };
}

export function showErrorModal(payload: ErrorPayload): ShowErrorModalAction {
  return {
    type: SHOW_ERROR_MODAL,
    payload,
  };
}

export function hideErrorModal(): HideErrorModalAction {
  return {
    type: HIDE_ERROR_MODAL,
  };
}

export function requestMetric({
  metricName,
  metricType,
  startTimestamp,
  endTimestamp,
  aggregateDurationSeconds,
  resolutionSeconds,
}: {
  metricName: string;
  metricType?: string;
  startTimestamp: string;
  endTimestamp: string;
  aggregateDurationSeconds: number;
  resolutionSeconds: number;
}): RequestMetricAction {
  return {
    type: REQUEST_METRIC,
    metricName,
    metricType,
    startTimestamp,
    endTimestamp,
    aggregateDurationSeconds,
    resolutionSeconds,
  };
}

export function setMetric({ data }: { data: MetricDataWrapper<MetricData> }): SetMetricAction {
  return {
    type: SET_METRIC,
    data,
  };
}

export function setMetricError({ data }: { data: ErrorMessage }): SetMetricErrorAction {
  return {
    type: SET_METRIC_ERROR,
    data,
  };
}
