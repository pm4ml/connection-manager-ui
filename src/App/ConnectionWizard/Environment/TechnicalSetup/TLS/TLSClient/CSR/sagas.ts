import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import apis from 'utils/apis';
import { getEnvironmentId } from 'App/ConnectionWizard/selectors';
import { showToast, showErrorModal } from 'App/actions';
import { is20x } from 'utils/http';
import { getDfspCsrCertificate } from './selectors';
import {
  SUBMIT_DFSP_CSR_CERTIFICATE,
  SubmitDfspCsrCertificateAction,
  AUTOGENERATE_DFSP_CSR_CERTIFICATE,
  AutogenerateDfspCsrCertificateAction,
} from './types';

import { resetDfspCsr } from './actions';

function* submitDfspCSRCertificate(action: SubmitDfspCsrCertificateAction) {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const clientCSR = getDfspCsrCertificate(state);
    const body = { clientCSR };

    const response = yield call(apis.inboundEnrollments.create, { environmentId, body });
    if (is20x(response.status)) {
      yield put(showToast());
      yield put(resetDfspCsr());
    } else {
      yield put(showErrorModal('Error Submitting CSR'));
    }
  } catch (e) {
    yield put(showErrorModal(e.message));
  }
}

export function* SubmitCSRSSaga() {
  yield takeLatest(SUBMIT_DFSP_CSR_CERTIFICATE, submitDfspCSRCertificate);
}

function* autogenerataeDfspCSRCertificate(action: AutogenerateDfspCsrCertificateAction) {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);

    const response = yield call(apis.inboundEnrollmentsCsr.create, { environmentId });
    if (is20x(response.status)) {
      yield put(showToast());
    } else {
      yield put(showErrorModal('Error Auto Generating CSR'));
    }
  } catch (e) {
    yield put(showErrorModal(e.message));
  }
}

export function* AutogenerateCSRSSaga() {
  yield takeLatest(AUTOGENERATE_DFSP_CSR_CERTIFICATE, autogenerataeDfspCSRCertificate);
}

export default function* rootSaga() {
  yield all([SubmitCSRSSaga(), AutogenerateCSRSSaga()]);
}