import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import apis from 'utils/apis';
import { is20x } from 'utils/http';
import { showToast, showErrorModal } from 'App/actions';
import { getEnvironmentId } from 'App/ConnectionWizard/selectors';
import {
  REQUEST_INGRESS_ENDPOINTS,
  SUBMIT_INGRESS_ENDPOINTS,
  RequestIngressEndpointsAction,
  SubmitIngressEndpointsAction,
  IngressIP,
  IngressURL,
} from './types';
import { setIngressUrls, setIngressUrlsError, setIngressIps, setIngressIpsError } from './actions';
import { apiToIpModel, apiToUrlModel, urlToApiModel, ipToApiModel } from './models';
import { getUrlsOperations, getIpsOperations } from './selectors';

function* fetchIngressEndpointsUrls(
  action: RequestIngressEndpointsAction | SubmitIngressEndpointsAction
) {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.ingressUrls.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setIngressUrls({ urls: response.data.map(apiToUrlModel) }));
    } else {
      yield put(setIngressUrlsError({ error: 'Error Fetching Ingress Endpoint URLs' }));
    }
  } catch (e) {
    yield put(setIngressUrlsError({ error: e.message }));
  }
}

function* fetchIngressEndpointsIps(
  action: RequestIngressEndpointsAction | SubmitIngressEndpointsAction
) {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.ingressIps.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setIngressIps({ ips: response.data.map(apiToIpModel) }));
    } else {
      yield put(setIngressIpsError({ error: 'Error Fetching Ingress Endpoint IPs' }));
    }
  } catch (e) {
    yield put(setIngressIpsError({ error: e.message }));
  }
}

function* fetchIngressEndpoints(
  action: RequestIngressEndpointsAction | SubmitIngressEndpointsAction
) {
  yield all([call(fetchIngressEndpointsUrls, action), call(fetchIngressEndpointsIps, action)]);
}

export function* retrieveIngressEndpointsSaga() {
  yield takeLatest([REQUEST_INGRESS_ENDPOINTS], fetchIngressEndpoints);
}

export function* saveIngressEndpoints(action: SubmitIngressEndpointsAction) {
  const state = yield select();
  const environmentId = getEnvironmentId(state);
  const urlsOperations = getUrlsOperations(state);
  const ipsOperations = getIpsOperations(state);

  const createUrlsActions = urlsOperations.create.map((url: IngressURL) =>
    call(apis.ingressUrls.create, { environmentId, body: urlToApiModel(url) })
  );

  const updateUrlsActions = urlsOperations.update.map((url: IngressURL) =>
    call(apis.ingressUrl.update, { environmentId, urlId: url.id, body: urlToApiModel(url) })
  );

  const deleteUrlsActions = urlsOperations.delete.map((url: IngressURL) =>
    call(apis.ingressUrl.delete, { environmentId, urlId: url.id })
  );

  const createIpsActions = ipsOperations.create.map((ip: IngressIP) =>
    call(apis.ingressIps.create, { environmentId, body: ipToApiModel(ip) })
  );

  const updateIpsActions = ipsOperations.update.map((ip: IngressIP) =>
    call(apis.ingressIp.update, { environmentId, ipId: ip.id, body: ipToApiModel(ip) })
  );

  const deleteIpsActions = ipsOperations.delete.map((ip: IngressIP) =>
    call(apis.ingressIp.delete, { environmentId, ipId: ip.id })
  );

  try {
    const responses = yield all([
      ...createUrlsActions,
      ...updateUrlsActions,
      ...deleteUrlsActions,
      ...createIpsActions,
      ...updateIpsActions,
      ...deleteIpsActions,
    ]);

    const allSucceeded = responses.every(({ status }: { status: number }) => is20x(status));

    if (allSucceeded) {
      yield put(showToast());
      yield call(fetchIngressEndpoints, action);
    } else {
      yield put(showErrorModal('There was a problem saving the configuration'));
    }
  } catch (e) {
    yield put(showErrorModal(e.message));
  }
}

export function* saveIngressEndpointsSaga() {
  yield takeLatest([SUBMIT_INGRESS_ENDPOINTS], saveIngressEndpoints);
}

export default function* rootSaga() {
  yield all([retrieveIngressEndpointsSaga(), saveIngressEndpointsSaga()]);
}
