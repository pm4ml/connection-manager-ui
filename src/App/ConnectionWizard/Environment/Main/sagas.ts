import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux';
import apis from 'utils/apis';
import { is200 } from 'utils/http';
import { getEnvironmentName, getEnvironmentId } from 'App/ConnectionWizard/selectors';
import { resetDFPCA } from '../TechnicalSetup/DFSPCertificateAuthority/actions';
import { requestEgressEndpoints } from '../TechnicalSetup/Endpoints/Egress/actions';
import { requestIngressEndpoints } from '../TechnicalSetup/Endpoints/Ingress/actions';
import { resetHubEndpoints } from '../TechnicalSetup/Endpoints/Hub/actions';
import { resetDfspJWS } from '../TechnicalSetup/JWSCertificates/DFSPJWS/actions';
import { resetOtherDfspsJWS } from '../TechnicalSetup/JWSCertificates/OtherDFSPsJWS/actions';
import { resetDfspCsr } from '../TechnicalSetup/TLS/TLSClient/CSR/actions';
import { resetDfspHubCsrs } from '../TechnicalSetup/TLS/TLSClient/HubCSRs/actions';
import { resetDfspSentCsrs } from '../TechnicalSetup/TLS/TLSClient/SentCSRs/actions';
import { resetDfspSC } from '../TechnicalSetup/TLS/TLSServerCertificates/DFSPSC/actions';
import { resetDfspHubSC } from '../TechnicalSetup/TLS/TLSServerCertificates/HubSC/actions';

import {
  REQUEST_ENVIRONMENT_DATA,
  REQUEST_DFSP,
  REQUEST_DFSPS,
  RequestDfspAction,
  RequestDfspsAction,
} from './types';
import { setDfsp, setDfspError, setDfsps, setDfspsError } from './actions';

function* fetchDfsp(action: RequestDfspAction) {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.dfsp.read, { environmentId });

    if (is200(response.status)) {
      yield put(setDfsp({ data: response.data }));
    } else {
      yield put(setDfspError({ error: 'Error Fetching DFSP' }));
    }
  } catch (e) {
    yield put(setDfspError({ error: e.message }));
  }
}

export function* requestDfspSaga() {
  yield takeLatest([REQUEST_DFSP], fetchDfsp);
}

function* fetchDfsps(action: RequestDfspsAction) {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.dfsps.read, { environmentId });

    if (is200(response.status)) {
      yield put(setDfsps({ data: response.data }));
    } else {
      yield put(setDfspsError({ error: 'Error Fetching DFSPs' }));
    }
  } catch (e) {
    yield put(setDfspsError({ error: e.message }));
  }
}

export function* requestDfspsSaga() {
  yield takeLatest([REQUEST_DFSPS], fetchDfsps);
}

function* fetchEnvironmentData(action: Action) {
  yield put(resetDFPCA());
  yield put(requestEgressEndpoints());
  yield put(requestIngressEndpoints());
  yield put(resetHubEndpoints());
  yield put(resetDfspJWS());
  yield put(resetOtherDfspsJWS());
  yield put(resetDfspCsr());
  yield put(resetDfspHubCsrs());
  yield put(resetDfspSentCsrs());
  yield put(resetDfspSC());
  yield put(resetDfspHubSC());
  /* eslint-disable */
  const environmentName = yield select(getEnvironmentName);
  const environmentId = yield select(getEnvironmentId);
  /* eslint-enable */

  yield all([call(fetchDfsp, action), call(fetchDfsps, action)]);
}

export function* requestEnvironmentSaga() {
  yield takeLatest([REQUEST_ENVIRONMENT_DATA], fetchEnvironmentData);
}

export default function* rootSaga() {
  yield all([requestEnvironmentSaga()]);
}
