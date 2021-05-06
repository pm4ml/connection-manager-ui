import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import apis from 'utils/apis';
import { is20x } from 'utils/http';
import { getEnvironmentId } from 'App/ConnectionWizard/selectors';
import { REQUEST_HUB_ENDPOINTS } from './types';
import {
  setHubEndpointsEgressEndpoints,
  setHubEndpointsEgressEndpointsError,
  setHubEndpointsIngressEndpoints,
  setHubEndpointsIngressEndpointsError,
} from './actions';

function* fetchHubEgressEndpoints() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.egressHubEndpoints.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setHubEndpointsEgressEndpoints({ data: response.data }));
    } else {
      yield put(
        setHubEndpointsEgressEndpointsError({ error: 'Error Fetching Egress Hub Endpoints' })
      );
    }
  } catch (e) {
    yield put(setHubEndpointsEgressEndpointsError({ error: e.message }));
  }
}

function* fetchHubIngressEndpoints() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.ingressHubEndpoints.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setHubEndpointsIngressEndpoints({ data: response.data }));
    } else {
      yield put(
        setHubEndpointsIngressEndpointsError({ error: 'Error Fetching Ingress Hub Endpoints' })
      );
    }
  } catch (e) {
    yield put(setHubEndpointsIngressEndpointsError({ error: e.message }));
  }
}

function* fetchHubEndpointsAllData() {
  yield all([call(fetchHubEgressEndpoints), call(fetchHubIngressEndpoints)]);
}

export function* requestHubEndpointsSaga() {
  yield takeLatest([REQUEST_HUB_ENDPOINTS], fetchHubEndpointsAllData);
}

export default function* rootSaga() {
  yield all([requestHubEndpointsSaga()]);
}
