import { RequestMetricAction } from 'App/types';
import { requestMetric } from 'App/actions';
import {
  TechnicalDashboardActionTypes,
  TechnicalDashboardState,
  TechnicalDashboardFilters,
  SET_TECHNICAL_DASHBOARD_FILTERS,
} from './types';

const defaultTimeframeSeconds = 86400;

export const getStartTimestamp = (secs: string | number) => {
  const now = new Date();
  now.setSeconds(-secs);
  return now;
};

export const getAggregateDurationFromTimeFrame = (secs: string | number) => {
  // 1 hour
  if (secs <= 3600) {
    return 20;
  }
  // 2 hours
  if (secs <= 7200) {
    return 20;
  }
  // 4 hours
  if (secs <= 14400) {
    return 20;
  }
  // 8 hours
  if (secs <= 28800) {
    return 40;
  }
  // 12 hours
  if (secs <= 43200) {
    return 40;
  }
  // 24 hours
  if (secs <= 86400) {
    return 40;
  }
  // 48 hours
  if (secs <= 172800) {
    return 120;
  }
  // 1 week
  if (secs <= 604800) {
    return 120;
  }
  return 120;
};

export const getResolutionSecondsFromTimeFrame = (secs: string | number) => {
  // 1 hour
  if (secs <= 3600) {
    return 20;
  }
  // 2 hours
  if (secs <= 7200) {
    return 20;
  }
  // 4 hours
  if (secs <= 14400) {
    return 20;
  }
  // 8 hours
  if (secs <= 28800) {
    return 40;
  }
  // 12 hours
  if (secs <= 43200) {
    return 40;
  }
  // 24 hours
  if (secs <= 86400) {
    return 40;
  }
  // 48 hours
  if (secs <= 172800) {
    return 120;
  }
  // 1 week
  if (secs <= 604800) {
    return 120;
  }
  return 120;
};

const getMetricRequests = (filters: TechnicalDashboardFilters): RequestMetricAction[] => {
  const { startTimestamp, endTimestamp, aggregateDurationSeconds, resolutionSeconds } = filters;

  // default of 600,600 for request rate
  // default of 20, 600 for latency

  return [
    requestMetric({
      metricName: 'mojaloop_connector_outbound_party_lookup_request_count',
      startTimestamp: startTimestamp.toISOString(),
      endTimestamp: endTimestamp.toISOString(),
      aggregateDurationSeconds,
      resolutionSeconds,
    }),
    requestMetric({
      metricName: 'mojaloop_connector_outbound_quote_request_count',
      startTimestamp: startTimestamp.toISOString(),
      endTimestamp: endTimestamp.toISOString(),
      aggregateDurationSeconds,
      resolutionSeconds,
    }),
    requestMetric({
      metricName: 'mojaloop_connector_outbound_transfer_prepare_count',
      startTimestamp: startTimestamp.toISOString(),
      endTimestamp: endTimestamp.toISOString(),
      aggregateDurationSeconds,
      resolutionSeconds,
    }),
    requestMetric({
      metricName: 'mojaloop_connector_outbound_party_lookup_latency',
      metricType: 'HIST_SIZE',
      startTimestamp: startTimestamp.toISOString(),
      endTimestamp: endTimestamp.toISOString(),
      aggregateDurationSeconds,
      resolutionSeconds,
    }),
    requestMetric({
      metricName: 'mojaloop_connector_outbound_quote_request_latency',
      metricType: 'HIST_SIZE',
      startTimestamp: startTimestamp.toISOString(),
      endTimestamp: endTimestamp.toISOString(),
      aggregateDurationSeconds,
      resolutionSeconds,
    }),
    requestMetric({
      metricName: 'mojaloop_connector_outbound_transfer_latency',
      metricType: 'HIST_SIZE',
      startTimestamp: startTimestamp.toISOString(),
      endTimestamp: endTimestamp.toISOString(),
      aggregateDurationSeconds,
      resolutionSeconds,
    }),
  ];
};

const initialFilters = {
  selectedTimeFrame: defaultTimeframeSeconds,
  startTimestamp: getStartTimestamp(defaultTimeframeSeconds),
  endTimestamp: new Date(),
  aggregateDurationSeconds: 600,
  resolutionSeconds: 600,
  dfsp: undefined,
} as TechnicalDashboardFilters;

export const initialState: TechnicalDashboardState = {
  filters: initialFilters,
  metricRequests: getMetricRequests(initialFilters),
};

export default function dashboardReducer(
  state = initialState,
  action: TechnicalDashboardActionTypes
): TechnicalDashboardState {
  switch (action.type) {
    case SET_TECHNICAL_DASHBOARD_FILTERS:
      // eslint-disable-next-line no-case-declarations
      const { field, value } = action.data;

      if (field === 'selectedTimeFrame') {
        const filters = {
          ...state.filters,
          selectedTimeFrame: Number(value),
          startTimestamp: getStartTimestamp(value),
          endTimestamp: new Date(),
          aggregateDurationSeconds: getAggregateDurationFromTimeFrame(value),
          resolutionSeconds: getResolutionSecondsFromTimeFrame(value),
        };

        return {
          ...state,
          filters,
          metricRequests: getMetricRequests(filters),
        };
      }
      return state;
    default:
      return state;
  }
}
