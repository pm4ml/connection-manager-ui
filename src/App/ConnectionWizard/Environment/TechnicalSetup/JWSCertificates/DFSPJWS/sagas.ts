import { all, put, select, takeLatest, call } from 'redux-saga/effects';
import { is20x, is404 } from 'utils/http';
import { downloadFile } from 'utils/html';
import { getEnvironmentName, getEnvironmentId } from 'App/ConnectionWizard/selectors';
import { showToast, showErrorModal } from 'App/actions';
import apis from 'utils/apis';
import {
  setDfspJWSCertificate,
  setDfspJWSIntermediateChain,
  setDfspJWSCertificateInfo,
  setDfspJWSIntermediateChainInfo,
  setDfspJWSValidations,
  setDfspJWSValidationState,
} from './actions';
import {
  getDfspJWSCertificate,
  getDfspJWSIntermediateChain,
  getIsDfspJWSEditingExistingModel,
} from './selectors';
import {
  SUBMIT_DFSP_JWS_SERVER_CERTIFICATE,
  DOWNLOAD_DFSP_JWS_CERTIFICATE,
  DOWNLOAD_DFSP_JWS_INTERMEDIATE_CHAIN,
  STORE_DFSP_JWS_SERVER_CERTIFICATE,
} from './types';

function* storeDfspJWSCertificates() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.dfspJWSCerts.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setDfspJWSCertificate({ certificate: response.data.jwsCertificate }));
      yield put(setDfspJWSIntermediateChain({ certificate: response.data.intermediateChain }));
      yield put(setDfspJWSCertificateInfo({ certInfo: response.data.jwsCertificateInfo }));
      yield put(
        setDfspJWSIntermediateChainInfo({ certInfo: response.data.intermediateChainInfo[0] })
      );
      yield put(setDfspJWSValidations({ validations: response.data.validations }));
      yield put(setDfspJWSValidationState({ validationState: response.data.validationState }));
    } else if (!is404(response.status)) {
      yield put(showErrorModal('Error Loading JWS Certificate'));
    }
  } catch (error) {
    yield put(showErrorModal(error.message));
  }
}

export function* StoreDfspJWSCertificatesSaga() {
  yield takeLatest(STORE_DFSP_JWS_SERVER_CERTIFICATE, storeDfspJWSCertificates);
}

function* submitDfspJWSCertificates() {
  try {
    const environmentId = yield select(getEnvironmentId);
    const jwsCertificate = yield select(getDfspJWSCertificate);
    const intermediateChain = yield select(getDfspJWSIntermediateChain);
    const body = { jwsCertificate, intermediateChain };

    let response;

    if (yield select(getIsDfspJWSEditingExistingModel)) {
      response = yield call(apis.dfspJWSCerts.update, { environmentId, body });
    } else {
      response = yield call(apis.dfspJWSCerts.create, { environmentId, body });
    }

    if (is20x(response.status)) {
      yield put(showToast());
      yield put(setDfspJWSCertificate({ certificate: response.data.jwsCertificate }));
      yield put(setDfspJWSIntermediateChain({ certificate: response.data.intermediateChain }));
      yield put(setDfspJWSCertificateInfo({ certInfo: response.data.jwsCertificateInfo }));
      yield put(
        setDfspJWSIntermediateChainInfo({ certInfo: response.data.intermediateChainInfo[0] })
      );
      yield put(setDfspJWSValidations({ validations: response.data.validations }));
      yield put(setDfspJWSValidationState({ validationState: response.data.validationState }));
    } else {
      yield put(showErrorModal('Error Submitting JWS Certificate'));
    }
  } catch (error) {
    yield put(showErrorModal(error.message));
  }
}

export function* SubmitDfspJWSCertificatesSaga() {
  yield takeLatest(SUBMIT_DFSP_JWS_SERVER_CERTIFICATE, submitDfspJWSCertificates);
}

export function* downloadDfspJWSCertificate() {
  const state = yield select();
  const environmentName = getEnvironmentName(state);
  const jwsCertificate = getDfspJWSCertificate(state);
  downloadFile(jwsCertificate, `${environmentName}-root.pem`);
}

export function* DownloadDfspJWSCertificateSaga() {
  yield takeLatest(DOWNLOAD_DFSP_JWS_CERTIFICATE, downloadDfspJWSCertificate);
}

export function* downloadDfspJWSIntermediateChain() {
  const state = yield select();
  const environmentName = getEnvironmentName(state);
  const intermediateChain = getDfspJWSIntermediateChain(state);
  downloadFile(intermediateChain, `${environmentName}-intermediates.pem`);
}

export function* DownloadDfspJWSIntermediateChainSaga() {
  yield takeLatest(DOWNLOAD_DFSP_JWS_INTERMEDIATE_CHAIN, downloadDfspJWSIntermediateChain);
}

export default function* rootSaga() {
  yield all([
    StoreDfspJWSCertificatesSaga(),
    SubmitDfspJWSCertificatesSaga(),
    DownloadDfspJWSCertificateSaga(),
    DownloadDfspJWSIntermediateChainSaga(),
  ]);
}
