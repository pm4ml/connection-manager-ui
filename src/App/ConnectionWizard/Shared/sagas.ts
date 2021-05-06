import apis from 'utils/apis';
import { is200 } from 'utils/http';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getEnvironments, getEnvironmentId } from '../selectors';
import { Environment } from '../types';
import {
  REQUEST_ENVIRONMENTS_STATUSES,
  REQUEST_ENVIRONMENT_STATUS,
  RequestEnvironmentsStatusesAction,
  RequestEnvironmentStatusAction,
} from './types';
import {
  setEnvironmentsStatuses,
  setEnvironmentsStatusesError,
  setEnvironmentStatus,
  setEnvironmentStatusError,
} from './actions';

function* fetchSingleEnvironmentStatus(environmentId: string) {
  const { data, status } = yield call(apis.environmentStatus.read, { environmentId });
  if (!is200(status)) {
    throw Error('Error Fetching Environment Status');
  }
  return {
    environmentId,
    phases: data,
  };
}

function* fetchEnvironmentStatus(action: RequestEnvironmentStatusAction) {
  const environmentId = yield select(getEnvironmentId);
  try {
    const data = yield call(fetchSingleEnvironmentStatus, environmentId);
    yield put(setEnvironmentStatus({ data }));
  } catch (e) {
    yield put(setEnvironmentStatusError({ error: e.message }));
  }
}

export function* requestEnvironmentStatusSaga() {
  yield takeLatest([REQUEST_ENVIRONMENT_STATUS], fetchEnvironmentStatus);
}

function* fetchEnvironmentsStatuses(action: RequestEnvironmentsStatusesAction) {
  const environments = yield select(getEnvironments);
  try {
    const data = yield all(
      environments.map((environment: Environment) =>
        call(fetchSingleEnvironmentStatus, environment.id)
      )
    );
    yield put(setEnvironmentsStatuses({ data }));
  } catch (e) {
    yield put(setEnvironmentsStatusesError({ error: e.message }));
  }
}

export function* requestEnvironmentsStatusesSaga() {
  yield takeLatest([REQUEST_ENVIRONMENTS_STATUSES], fetchEnvironmentsStatuses);
}

export default function* rootSaga() {
  yield all([requestEnvironmentsStatusesSaga(), requestEnvironmentStatusSaga()]);
}
