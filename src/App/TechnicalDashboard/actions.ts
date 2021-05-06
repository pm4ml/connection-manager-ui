import { RequestMetricAction } from 'App/types';
import {
  REQUEST_TECHNICAL_DASHBOARD_PAGE_DATA,
  SET_TECHNICAL_DASHBOARD_FILTERS,
  RequestTechnicalDashboardPageDataAction,
  SetTechnicalDashboardFiltersAction,
} from './types';

export function requestTechnicalDashboardPageData({
  metricRequests,
}: {
  metricRequests: RequestMetricAction[];
}): RequestTechnicalDashboardPageDataAction {
  return {
    type: REQUEST_TECHNICAL_DASHBOARD_PAGE_DATA,
    metricRequests,
  };
}

export function setTechnicalDashboardFilters({
  field,
  value,
}: {
  field: string;
  value: string | number;
}): SetTechnicalDashboardFiltersAction {
  return {
    type: SET_TECHNICAL_DASHBOARD_FILTERS,
    data: { field, value },
  };
}
