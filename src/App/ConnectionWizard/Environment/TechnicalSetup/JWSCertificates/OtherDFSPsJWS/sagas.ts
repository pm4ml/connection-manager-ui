import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { is20x } from 'utils/http';
import { downloadFile } from 'utils/html';
import find from 'lodash/find';
import apis from 'utils/apis';
import { getDfspName, getEnvironmentId } from 'App/ConnectionWizard/selectors';
import { setOtherDfspsJWSCertificates, setOtherDfspsJWSError } from './actions';
import { getOtherDfsps } from './selectors';
import {
  DownloadOtherDfspsJWSCertificateAction,
  DOWNLOAD_OTHER_DFSPS_JWS_CERTIFICATE,
  DOWNLOAD_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN,
  STORE_OTHER_DFSPS_JWS_CERTIFICATE,
} from './types';
import { OtherCertificates } from '../types';

function* storeOtherDfspsJWSCertificates() {
  const state = yield select();
  const otherDfsps = getOtherDfsps(state);
  const environmentId = getEnvironmentId(state);
  const response = yield call(apis.otherDfspJWSCerts.read, { environmentId });

  if (is20x(response.status)) {
    const certificates = response.data.filter((certificate: OtherCertificates) => {
      return find(otherDfsps, { id: certificate.dfspId });
    });

    yield put(setOtherDfspsJWSCertificates({ certificates }));
  } else {
    yield put(setOtherDfspsJWSError({ error: 'Generic' }));
  }
}

function* downloadOtherDfspsJWSCertificate(action: DownloadOtherDfspsJWSCertificateAction) {
  const state = yield select();
  const dfspName = getDfspName(state);

  downloadFile(action.cert, `${dfspName}-root.pem`);
}

function* downloadOtherDfspsJWSIntermediateChain(action: DownloadOtherDfspsJWSCertificateAction) {
  const state = yield select();

  const dfspName = getDfspName(state);

  downloadFile(action.cert, `${dfspName}-intermediates.pem`);
}

export function* StoreOtherDfspsJWSCertificatesSaga() {
  yield takeLatest(STORE_OTHER_DFSPS_JWS_CERTIFICATE, storeOtherDfspsJWSCertificates);
}

export function* DownloadOtherDfspsJWSCertificateSaga() {
  yield takeLatest(DOWNLOAD_OTHER_DFSPS_JWS_CERTIFICATE, downloadOtherDfspsJWSCertificate);
}

export function* DownloadOtherDfspsJWSIntermediateChainSaga() {
  yield takeLatest(
    DOWNLOAD_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN,
    downloadOtherDfspsJWSIntermediateChain
  );
}

export default function* rootSaga() {
  yield all([
    StoreOtherDfspsJWSCertificatesSaga(),
    DownloadOtherDfspsJWSCertificateSaga(),
    DownloadOtherDfspsJWSIntermediateChainSaga(),
  ]);
}
