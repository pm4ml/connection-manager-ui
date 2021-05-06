import { all, put, takeEvery, select } from 'redux-saga/effects';
import {
  REQUEST_TECHNICAL_DASHBOARD_PAGE_DATA,
  RequestTechnicalDashboardPageDataAction,
  SET_TECHNICAL_DASHBOARD_FILTERS,
  SetTechnicalDashboardFiltersAction,
} from './types';

import { requestTechnicalDashboardPageData as rtdpd } from './actions';
import { getMetricRequests } from './selectors';

function* requestTechnicalDashboardPageData(action: RequestTechnicalDashboardPageDataAction) {
  yield all(action.metricRequests.map((r) => put(r)));
}

export function* requestTechnicalDashboardPageDataSaga() {
  yield takeEvery([REQUEST_TECHNICAL_DASHBOARD_PAGE_DATA], requestTechnicalDashboardPageData);
}

// this is pretty dumb...we watch for an action changing one bit of state in order to trigger
// an action based on that new state...not loving react/redux at this point!
function* watchTechnicalDashboardFilters(action: SetTechnicalDashboardFiltersAction) {
  const metricRequests = yield select(getMetricRequests);
  yield put(rtdpd({ metricRequests }));
}

export function* watchTechnicalDashboardFiltersSaga() {
  yield takeEvery([SET_TECHNICAL_DASHBOARD_FILTERS], watchTechnicalDashboardFilters);
}

export default function* rootSaga() {
  yield all([requestTechnicalDashboardPageDataSaga(), watchTechnicalDashboardFiltersSaga()]);
}
