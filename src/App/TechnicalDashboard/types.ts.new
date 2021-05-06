import { RequestMetricAction } from 'App/types';

export const REQUEST_TECHNICAL_DASHBOARD_PAGE_DATA = 'Technical Dashboard / Request Page Data';
export const SET_TECHNICAL_DASHBOARD_FILTERS = 'Technical Dashboard / Set Filters';

export interface TechnicalDashboardState {
  filters: TechnicalDashboardFilters;
  metricRequests: RequestMetricAction[];
}

export interface TechnicalDashboardFilters {
  selectedTimeFrame: number;
  startTimestamp: Date;
  endTimestamp: Date;
  dfsp: string | undefined;
  aggregateDurationSeconds: number;
  resolutionSeconds: number;
}

export interface RequestTechnicalDashboardPageDataAction {
  type: typeof REQUEST_TECHNICAL_DASHBOARD_PAGE_DATA;
  metricRequests: RequestMetricAction[];
}

export interface SetTechnicalDashboardFiltersAction {
  type: typeof SET_TECHNICAL_DASHBOARD_FILTERS;
  data: {
    field: string;
    value: string | number;
  };
}

export type TechnicalDashboardActionTypes =
  | RequestTechnicalDashboardPageDataAction
  | SetTechnicalDashboardFiltersAction;
