import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import apis from 'utils/apis';
import { is20x } from 'utils/http';
import { showToast, showErrorModal } from 'App/actions';
import { getEnvironmentId } from 'App/ConnectionWizard/selectors';
import {
  REQUEST_EGRESS_ENDPOINTS,
  SUBMIT_EGRESS_ENDPOINTS,
  RequestEgressEndpointsAction,
  SubmitEgressEndpointsAction,
  EgressIP,
} from './types';
import { setEgressIps, setEgressIpsError } from './actions';
import { apiToIpModel, ipToApiModel } from './models';
import { getIpsOperations } from './selectors';

function* fetchEgressEndpointsIps(
  action: RequestEgressEndpointsAction | SubmitEgressEndpointsAction
) {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.egressIps.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setEgressIps({ ips: response.data.map(apiToIpModel) }));
    } else {
      yield put(setEgressIpsError({ error: 'Error Fetching Egress Endpoint IPs' }));
    }
  } catch (e) {
    yield put(setEgressIpsError({ error: e.message }));
  }
}

function* fetchEgressEndpoints(action: RequestEgressEndpointsAction | SubmitEgressEndpointsAction) {
  yield all([call(fetchEgressEndpointsIps, action)]);
}

export function* retrieveEgressEndpointsSaga() {
  yield takeLatest([REQUEST_EGRESS_ENDPOINTS], fetchEgressEndpoints);
}

export function* saveEgressEndpoints(action: SubmitEgressEndpointsAction) {
  const state = yield select();
  const environmentId = getEnvironmentId(state);
  const ipsOperations = getIpsOperations(state);

  const createIpsActions = ipsOperations.create.map((ip: EgressIP) =>
    call(apis.egressIps.create, { environmentId, body: ipToApiModel(ip) })
  );

  const updateIpsActions = ipsOperations.update.map((ip: EgressIP) =>
    call(apis.egressIp.update, { environmentId, ipId: ip.id, body: ipToApiModel(ip) })
  );

  const deleteIpsActions = ipsOperations.delete.map((ip: EgressIP) =>
    call(apis.egressIp.delete, { environmentId, ipId: ip.id })
  );

  try {
    const responses = yield all([...createIpsActions, ...updateIpsActions, ...deleteIpsActions]);

    const allSucceeded = responses.every(({ status }: { status: number }) => is20x(status));

    if (allSucceeded) {
      yield put(showToast());
      yield call(fetchEgressEndpoints, action);
    } else {
      yield put(showErrorModal('There was a problem saving the configuration'));
    }
  } catch (e) {
    yield put(showErrorModal(e.message));
  }
}

export function* saveEgressEndpointsSaga() {
  yield takeLatest([SUBMIT_EGRESS_ENDPOINTS], saveEgressEndpoints);
}

export default function* rootSaga() {
  yield all([retrieveEgressEndpointsSaga(), saveEgressEndpointsSaga()]);
}
