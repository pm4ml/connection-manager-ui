import { call, all, put, select, takeLatest } from 'redux-saga/effects';
import { is20x, is404 } from 'utils/http';
import { downloadFile } from 'utils/html';
import { getEnvironmentName, getEnvironmentId } from 'App/ConnectionWizard/selectors';
import { showToast, showErrorModal } from 'App/actions';
import apis from 'utils/apis';
import {
  setDfspSCRootCertificate,
  setDfspSCIntermediateChain,
  setDfspSCServerCertificate,
  setDfspSCRootCertificateInfo,
  setDfspSCIntermediateChainInfo,
  setDfspSCServerCertificateInfo,
  setDfspSCValidations,
  setDfspSCValidationState,
} from './actions';
import {
  getDfspSCRootCertificate,
  getDfspSCIntermediateChain,
  getDfspSCServerCertificate,
  getIsDfspSCEditingExistingModel,
} from './selectors';
import {
  SUBMIT_DFSP_SC_SERVER_CERTIFICATE,
  STORE_DFSP_SC_SERVER_CERTIFICATE,
  DOWNLOAD_DFSP_SC_ROOT_CERTIFICATE,
  DOWNLOAD_DFSP_SC_INTERMEDIATE_CHAIN,
  DOWNLOAD_DFSP_SC_SERVER_CERTIFICATE,
} from './types';

function* storeDfspSCServerCertificate() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.dfspServerCerts.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setDfspSCRootCertificate({ certificate: response.data.rootCertificate }));
      yield put(setDfspSCIntermediateChain({ certificate: response.data.intermediateChain }));
      yield put(setDfspSCServerCertificate({ certificate: response.data.serverCertificate }));
      yield put(setDfspSCRootCertificateInfo({ certInfo: response.data.rootCertificateInfo }));
      yield put(
        setDfspSCIntermediateChainInfo({ certInfo: response.data.intermediateChainInfo[0] })
      );
      yield put(setDfspSCServerCertificateInfo({ certInfo: response.data.serverCertificateInfo }));
      yield put(setDfspSCValidations({ validations: response.data.validations }));
      yield put(setDfspSCValidationState({ validationState: response.data.validationState }));
    } else if (!is404(response.status)) {
      yield put(showErrorModal('Error Loading SC Server Certificate'));
    }
  } catch (error) {
    yield put(showErrorModal(error.message));
  }
}

export function* StoreDfspSCServerCertificateSaga() {
  yield takeLatest(STORE_DFSP_SC_SERVER_CERTIFICATE, storeDfspSCServerCertificate);
}

function* submitDfspSCServerCertificate() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const rootCertificate = getDfspSCRootCertificate(state);
    const intermediateChain = getDfspSCIntermediateChain(state);
    const serverCertificate = getDfspSCServerCertificate(state);
    const body = { rootCertificate, intermediateChain, serverCertificate };

    let response;
    if (getIsDfspSCEditingExistingModel(state)) {
      response = yield call(apis.dfspServerCerts.update, { environmentId, body });
    } else {
      response = yield call(apis.dfspServerCerts.create, { environmentId, body });
    }

    if (is20x(response.status)) {
      yield put(showToast());

      yield put(setDfspSCRootCertificate({ certificate: response.data.rootCertificate }));
      yield put(setDfspSCIntermediateChain({ certificate: response.data.intermediateChain }));
      yield put(setDfspSCServerCertificate({ certificate: response.data.serverCertificate }));
      yield put(setDfspSCRootCertificateInfo({ certInfo: response.data.rootCertificateInfo }));
      yield put(
        setDfspSCIntermediateChainInfo({ certInfo: response.data.intermediateChainInfo[0] })
      );
      yield put(setDfspSCServerCertificateInfo({ certInfo: response.data.serverCertificateInfo }));
      yield put(setDfspSCValidations({ validations: response.data.validations }));
      yield put(setDfspSCValidationState({ validationState: response.data.validationState }));
    } else {
      yield put(showErrorModal('Error Submitting SC Server Certificate'));
    }
  } catch (error) {
    yield put(showErrorModal(error.message));
  }
}

export function* SubmitDfspSCServerCertificateSaga() {
  yield takeLatest(SUBMIT_DFSP_SC_SERVER_CERTIFICATE, submitDfspSCServerCertificate);
}

export function* downloadDfspSCRootCertificate() {
  const state = yield select();
  const environmentName = getEnvironmentName(state);
  const rootCertificate = getDfspSCRootCertificate(state);
  downloadFile(rootCertificate, `${environmentName}-root.pem`);
}

export function* DownloadDfspSCRootCertificateSaga() {
  yield takeLatest(DOWNLOAD_DFSP_SC_ROOT_CERTIFICATE, downloadDfspSCRootCertificate);
}

export function* downloadDfspSCIntermediateChain() {
  const state = yield select();
  const environmentName = getEnvironmentName(state);
  const intermediateChain = getDfspSCIntermediateChain(state);
  downloadFile(intermediateChain, `${environmentName}-intermediates.pem`);
}

export function* DownloadDfspSCIntermediateChainSaga() {
  yield takeLatest(DOWNLOAD_DFSP_SC_INTERMEDIATE_CHAIN, downloadDfspSCIntermediateChain);
}

export function* downloadDfspSCServerCertificate() {
  const state = yield select();
  const environmentName = getEnvironmentName(state);
  const rootCertificate = getDfspSCServerCertificate(state);
  downloadFile(rootCertificate, `${environmentName}-server.pem`);
}

export function* DownloadDfspSCServerCertificateSaga() {
  yield takeLatest(DOWNLOAD_DFSP_SC_SERVER_CERTIFICATE, downloadDfspSCServerCertificate);
}

export default function* rootSaga() {
  yield all([
    StoreDfspSCServerCertificateSaga(),
    SubmitDfspSCServerCertificateSaga(),
    DownloadDfspSCRootCertificateSaga(),
    DownloadDfspSCIntermediateChainSaga(),
    DownloadDfspSCServerCertificateSaga(),
  ]);
}
