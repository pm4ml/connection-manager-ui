import { Action } from 'redux';
import apis from 'utils/apis';
import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import sleep from 'utils/sleep';

import { SHOW_TOAST, RequestMetricAction, REQUEST_METRIC } from './types';
import { setToastVisible, setMetric, setMetricError } from './actions';

function* showSuccessToast(action: Action) {
  yield put(setToastVisible(true));
  yield call(sleep, 2000);
  yield put(setToastVisible(false));
}

export function* showToastSaga() {
  yield takeLatest([SHOW_TOAST], showSuccessToast);
}

function* fetchMetric(action: RequestMetricAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.metric.read, {
      metricName: action.metricName,
      params: {
        startTimestamp: action.startTimestamp,
        endTimestamp: action.endTimestamp,
        aggregateDurationSeconds: action.aggregateDurationSeconds,
        resolutionSeconds: action.resolutionSeconds,
        metricType: action.metricType,
      },
    });

    yield put(setMetric({ data: response.data }));
  } catch (e) {
    yield put(setMetricError({ data: e.message }));
  }
}

export function* requestMetricSaga() {
  yield takeEvery([REQUEST_METRIC], fetchMetric);
}

export default function* rootSaga() {
  yield all([showToastSaga(), requestMetricSaga()]);
}
