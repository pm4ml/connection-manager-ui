import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import apis from 'utils/apis';
import { downloadFile } from 'utils/html';
import { is20x } from 'utils/http';
import { getDfspName, getEnvironmentId } from 'App/ConnectionWizard/selectors';
import {
  DOWNLOAD_DFSP_SENT_CSR_CERTIFICATE,
  REQUEST_DFSP_SENT_CSR_CERTIFICATE,
  DownloadDfspSentCsrCertificateAction,
  RequestDfspSentCsrCertificateAction,
} from './types';

import { setDfspSentCsrsCertificates, setDfspSentCsrsCertificatesError } from './actions';

export function* downloadDfspSentCsrCertificate(action: DownloadDfspSentCsrCertificateAction) {
  const state = yield select();
  const dfspName = getDfspName(state);
  const filename = `${dfspName}${action.extension}`;
  yield call(downloadFile, action.certificate, filename);
}

export function* DownloadCSRSSaga() {
  yield takeLatest(DOWNLOAD_DFSP_SENT_CSR_CERTIFICATE, downloadDfspSentCsrCertificate);
}

function* fetchDfspSentCSRs(action: RequestDfspSentCsrCertificateAction) {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.inboundEnrollments.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setDfspSentCsrsCertificates({ certificates: response.data }));
    } else {
      yield put(setDfspSentCsrsCertificatesError({ error: 'Error in fetching DFSP Sent CSRs' }));
    }
  } catch (e) {
    yield put(setDfspSentCsrsCertificatesError({ error: e.message }));
  }
}

export function* RequestSentCSRSSaga() {
  yield takeLatest(REQUEST_DFSP_SENT_CSR_CERTIFICATE, fetchDfspSentCSRs);
}

export default function* rootSaga() {
  yield all([DownloadCSRSSaga(), RequestSentCSRSSaga()]);
}
