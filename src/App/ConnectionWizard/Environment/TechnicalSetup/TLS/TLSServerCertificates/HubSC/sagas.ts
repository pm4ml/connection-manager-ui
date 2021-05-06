import { all, put, select, takeLatest, call } from 'redux-saga/effects';
import { is20x, is404 } from 'utils/http';
import { downloadFile } from 'utils/html';
import { getEnvironmentName, getEnvironmentId } from 'App/ConnectionWizard/selectors';
import { showToast, showErrorModal } from 'App/actions';
import apis from 'utils/apis';
import {
  setDfspHubSCRootCertificate,
  setDfspHubSCIntermediateChain,
  setDfspHubSCServerCertificate,
  setDfspHubSCRootCertificateInfo,
  setDfspHubSCIntermediateChainInfo,
  setDfspHubSCServerCertificateInfo,
  setDfspHubSCValidations,
  setDfspHubSCValidationState,
} from './actions';
import {
  getDfspHubSCRootCertificate,
  getDfspHubSCIntermediateChain,
  getDfspHubSCServerCertificate,
  getIsDfspHubSCEditingExistingModel,
} from './selectors';
import {
  SUBMIT_DFSP_HUB_SC_SERVER_CERTIFICATE,
  STORE_DFSP_HUB_SC_SERVER_CERTIFICATE,
  DOWNLOAD_DFSP_HUB_SC_ROOT_CERTIFICATE,
  DOWNLOAD_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
  DOWNLOAD_DFSP_HUB_SC_SERVER_CERTIFICATE,
} from './types';

function* storeDfspHubSCServerCertificate() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const response = yield call(apis.hubServerCerts.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setDfspHubSCRootCertificate({ certificate: response.data.rootCertificate }));
      yield put(setDfspHubSCIntermediateChain({ certificate: response.data.intermediateChain }));
      yield put(setDfspHubSCServerCertificate({ certificate: response.data.serverCertificate }));
      yield put(setDfspHubSCRootCertificateInfo({ certInfo: response.data.rootCertificateInfo }));
      yield put(
        setDfspHubSCIntermediateChainInfo({ certInfo: response.data.intermediateChainInfo[0] })
      );
      yield put(
        setDfspHubSCServerCertificateInfo({ certInfo: response.data.serverCertificateInfo })
      );
      yield put(setDfspHubSCValidations({ validations: response.data.validations }));
      yield put(setDfspHubSCValidationState({ validationState: response.data.validationState }));
    } else if (!is404(response.status)) {
      yield put(showErrorModal('Error Loading SC Server Certificate'));
    }
  } catch (error) {
    yield put(showErrorModal(error.message));
  }
}

export function* StoreDfspHubSCServerCertificateSaga() {
  yield takeLatest(STORE_DFSP_HUB_SC_SERVER_CERTIFICATE, storeDfspHubSCServerCertificate);
}

function* submitDfspHubSCServerCertificate() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);
    const rootCertificate = getDfspHubSCRootCertificate(state);
    const intermediateChain = getDfspHubSCIntermediateChain(state);
    const serverCertificate = getDfspHubSCServerCertificate(state);
    const body = { rootCertificate, intermediateChain, serverCertificate };
    let response;

    if (getIsDfspHubSCEditingExistingModel(state)) {
      response = yield call(apis.hubServerCerts.update, { environmentId, body });
    } else {
      response = yield call(apis.hubServerCerts.create, { environmentId, body });
    }

    if (is20x(response.status)) {
      yield put(showToast());

      yield put(setDfspHubSCRootCertificate({ certificate: response.data.rootCertificate }));
      yield put(setDfspHubSCIntermediateChain({ certificate: response.data.intermediateChain }));
      yield put(setDfspHubSCServerCertificate({ certificate: response.data.serverCertificate }));
      yield put(setDfspHubSCRootCertificateInfo({ certInfo: response.data.rootCertificateInfo }));
      yield put(
        setDfspHubSCIntermediateChainInfo({ certInfo: response.data.intermediateChainInfo[0] })
      );
      yield put(
        setDfspHubSCServerCertificateInfo({ certInfo: response.data.serverCertificateInfo })
      );
      yield put(setDfspHubSCValidations({ validations: response.data.validations }));
      yield put(setDfspHubSCValidationState({ validationState: response.data.validationState }));
    } else {
      yield put(showErrorModal('Error Submitting SC Server Certificate'));
    }
  } catch (error) {
    yield put(showErrorModal(error.message));
  }
}

export function* SubmitDfspHubSCServerCertificateSaga() {
  yield takeLatest(SUBMIT_DFSP_HUB_SC_SERVER_CERTIFICATE, submitDfspHubSCServerCertificate);
}

export function* downloadDfspHubSCRootCertificate() {
  const state = yield select();
  const environmentName = getEnvironmentName(state);
  const rootCertificate = getDfspHubSCRootCertificate(state);
  downloadFile(rootCertificate, `${environmentName}-root.pem`);
}

export function* DownloadDfspHubSCRootCertificateSaga() {
  yield takeLatest(DOWNLOAD_DFSP_HUB_SC_ROOT_CERTIFICATE, downloadDfspHubSCRootCertificate);
}

export function* downloadDfspHubSCIntermediateChain() {
  const state = yield select();
  const environmentName = getEnvironmentName(state);
  const intermediateChain = getDfspHubSCIntermediateChain(state);
  downloadFile(intermediateChain, `${environmentName}-intermediates.pem`);
}

export function* DownloadDfspHubSCIntermediateChainSaga() {
  yield takeLatest(DOWNLOAD_DFSP_HUB_SC_INTERMEDIATE_CHAIN, downloadDfspHubSCIntermediateChain);
}

export function* downloadDfspHubSCServerCertificate() {
  const state = yield select();
  const environmentName = getEnvironmentName(state);
  const rootCertificate = getDfspHubSCServerCertificate(state);
  downloadFile(rootCertificate, `${environmentName}-server.pem`);
}

export function* DownloadDfspHubSCServerCertificateSaga() {
  yield takeLatest(DOWNLOAD_DFSP_HUB_SC_SERVER_CERTIFICATE, downloadDfspHubSCServerCertificate);
}

export default function* rootSaga() {
  yield all([
    StoreDfspHubSCServerCertificateSaga(),
    SubmitDfspHubSCServerCertificateSaga(),
    DownloadDfspHubSCRootCertificateSaga(),
    DownloadDfspHubSCIntermediateChainSaga(),
    DownloadDfspHubSCServerCertificateSaga(),
  ]);
}
