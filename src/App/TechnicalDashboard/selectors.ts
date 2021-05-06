import { createSelector } from 'reselect';
import { State } from 'store/types';
import { MetricDataWrapper, MetricData, XYCoordinate, RequestMetricAction } from 'App/types';
import { TechnicalDashboardFilters } from './types';

export const getRawMetricData = (
  state: State,
  metricName: string
): MetricDataWrapper<MetricData> | undefined => {
  if (state && state.app && state.app.metricsData && state.app.metricsData[metricName]) {
    return state.app.metricsData[metricName];
  }
  return undefined;
};

export const getMetricData = createSelector(
  [getRawMetricData],
  (
    metricWrapper: MetricDataWrapper<MetricData> | undefined
  ): MetricDataWrapper<XYCoordinate> | undefined => {
    if (metricWrapper) {
      // jump through hoops to keep typescript happy as we are converting
      // from one generic type to another
      const ret: MetricDataWrapper<XYCoordinate> = {
        metricName: metricWrapper.metricName,
        startTimestamp: metricWrapper.startTimestamp,
        endTimestamp: metricWrapper.endTimestamp,
        data: [] as XYCoordinate[],
      };

      ret.data = metricWrapper.data.map((d: MetricData) => {
        return {
          x: d.timestamp,
          y: d.value,
        } as XYCoordinate;
      });

      return ret;
    }
    return undefined;
  }
);

export const getTechnicalDashboardFilters = (state: State): TechnicalDashboardFilters =>
  state.technicalDashboard.filters;

export const getMetricRequests = (state: State): RequestMetricAction[] =>
  state.technicalDashboard.metricRequests;
