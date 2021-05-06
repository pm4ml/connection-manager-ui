import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { is20x } from 'utils/http';
import { downloadFile } from 'utils/html';
import apis from 'utils/apis';
import { showToast, showErrorModal } from 'App/actions';
import { getDfspName, getEnvironmentId } from 'App/ConnectionWizard/selectors';
import {
  SUBMIT_DFSP_CA,
  DOWNLOAD_DFSP_CA_ROOT_CERTIFICATE,
  DOWNLOAD_DFSP_CA_INTERMEDIATE_CHAIN,
  CHANGE_AND_SUBMIT_DFSP_CA_INTERMEDIATE_CHAIN,
  CHANGE_AND_SUBMIT_DFSP_CA_ROOT_CERTIFICATE,
  SET_AUTO_GENERATE_DFSP_CA_CERTIFICATE,
  REQUEST_DFSP_CA,
  DOWNLOAD_DFSP_CA_HUB_CERTIFICATE,
  ChangeDFSPCARootCertificateAction,
  ChangeDFSPCARootIntermediateChainAction,
} from './types';
import {
  getDfspCaRootCertificate,
  getDfspCaIntermediateChain,
  getDfspCaHubCertificate,
} from './selectors';
import {
  setDFSPCARootCertificate,
  setDFSPCAIntermediateChain,
  setDFSPCAValidations,
  setDFSPCAValidationsState,
  changeDFSPCARootCertificate,
  changeDFSPCARootIntermediateChain,
  setDFSPCAHubCertificate,
  setDFSPCAHubCertificateError,
} from './actions';

function* fetchDFSPCertificate() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);

    const rootCertificate = getDfspCaRootCertificate(state) || '';
    const intermediateChain = getDfspCaIntermediateChain(state) || '';

    const body = {
      rootCertificate,
      intermediateChain,
    };

    const response = yield call(apis.dfspCA.read, { environmentId, body });

    if (is20x(response.status)) {
      yield put(setDFSPCARootCertificate({ certificate: response.data.rootCertificate }));
      yield put(setDFSPCAIntermediateChain({ certificate: response.data.intermediateChain }));
      yield put(setDFSPCAValidations({ validations: response.data.validations }));
      yield put(setDFSPCAValidationsState({ validationState: response.data.validationState }));
    } else {
      yield put(showErrorModal('Error Loading DFSP CA'));
    }
  } catch (e) {
    put(showErrorModal(e.message));
    // yield put(setDFSPCAError({ error: e.message }));
  }
}

function* submitDFSPCA(
  action: ChangeDFSPCARootCertificateAction | ChangeDFSPCARootIntermediateChainAction
) {
  try {
    const state = yield select();

    const rootCertificate = getDfspCaRootCertificate(state) || '';
    const intermediateChain = getDfspCaIntermediateChain(state) || '';

    const environmentId = getEnvironmentId(state);

    const body = {
      rootCertificate,
      intermediateChain,
    };

    const response = yield call(apis.dfspCA.create, { environmentId, body });

    if (is20x(response.status)) {
      yield put(showToast());
      yield put(setDFSPCARootCertificate({ certificate: response.data.rootCertificate }));
      yield put(setDFSPCAIntermediateChain({ certificate: response.data.intermediateChain }));
      yield put(setDFSPCAValidations({ validations: response.data.validations }));
      yield put(setDFSPCAValidationsState({ validationState: response.data.validationState }));
    } else {
      yield put(showErrorModal('Error Submitting DFSP CA'));
    }
  } catch (e) {
    yield put(showErrorModal(e.message));
    // yield put(setDFSPCAError({ error: e.message }));
  }
}

export function* submitDFSPCASaga() {
  yield takeLatest([SUBMIT_DFSP_CA], submitDFSPCA);
}

export function* changeDfspCaRootCertificateAndSubmit(action: ChangeDFSPCARootCertificateAction) {
  try {
    yield put(changeDFSPCARootCertificate({ certificate: action.certificate }));
    yield call(submitDFSPCA, action);
  } catch (e) {
    put(showErrorModal(e.message));
  }
}

export function* changeDfspCaRootCertificateAndSubmitSaga() {
  yield takeLatest(
    [CHANGE_AND_SUBMIT_DFSP_CA_ROOT_CERTIFICATE],
    changeDfspCaRootCertificateAndSubmit
  );
}

export function* changeDfspCaIntermediateChainAndSubmit(
  action: ChangeDFSPCARootIntermediateChainAction
) {
  try {
    yield put(changeDFSPCARootIntermediateChain({ certificate: action.certificate }));
    yield call(submitDFSPCA, action);
  } catch (e) {
    put(showErrorModal(e.message));
  }
}

export function* changeDfspCaIntermediateChainAndSubmitSaga() {
  yield takeLatest(
    [CHANGE_AND_SUBMIT_DFSP_CA_INTERMEDIATE_CHAIN],
    changeDfspCaIntermediateChainAndSubmit
  );
}

export function* downloadDfspCaRootCertificate() {
  try {
    const state = yield select();

    const dfspName = getDfspName(state);
    const rootCertificate = getDfspCaRootCertificate(state) || '';
    downloadFile(rootCertificate, `${dfspName}-root.pem`);
  } catch (e) {
    put(showErrorModal(e.message));
  }
}

export function* downloadDfspCaRootCertificateSaga() {
  yield takeLatest([DOWNLOAD_DFSP_CA_ROOT_CERTIFICATE], downloadDfspCaRootCertificate);
}

export function* downloadDfspCaIntermediateChain() {
  try {
    const state = yield select();

    const dfspName = getDfspName(state);
    const intermediateChain = getDfspCaIntermediateChain(state) || '';
    downloadFile(intermediateChain, `${dfspName}-intermediates.pem`);
  } catch (e) {
    put(showErrorModal(e.message));
  }
}

export function* downloadDfspCaIntermediateChainSaga() {
  yield takeLatest([DOWNLOAD_DFSP_CA_INTERMEDIATE_CHAIN], downloadDfspCaIntermediateChain);
}

export function* autoGenerateDFSPCACertificate() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);

    const response = yield call(apis.dfspAutoCA.create, { environmentId });

    if (is20x(response.status)) {
      yield put(showToast());
    } else {
      yield put(showErrorModal('Error Auto Generating DFSP CA'));
    }
  } catch (e) {
    put(showErrorModal(e.message));
  }
}

export function* autoGenerateDFSPCACertificateSaga() {
  yield takeLatest([SET_AUTO_GENERATE_DFSP_CA_CERTIFICATE], autoGenerateDFSPCACertificate);
}

export function* fetchHubCertificate() {
  try {
    const state = yield select();
    const environmentId = getEnvironmentId(state);

    const response = yield call(apis.dfspHubCA.read, { environmentId });

    if (is20x(response.status)) {
      yield put(setDFSPCAHubCertificate({ certificate: response.data }));
    } else {
      yield put(setDFSPCAHubCertificateError({ error: 'Error retrieving Hub Certificate' }));
    }
  } catch (e) {
    yield put(setDFSPCAHubCertificateError({ error: e.message }));
  }
}

export function* downloadHubCertificate() {
  try {
    const state = yield select();

    const dfspName = getDfspName(state);
    const hubCertificate = getDfspCaHubCertificate(state) || '';
    downloadFile(hubCertificate, `${dfspName}-hub.pem`);
  } catch (e) {
    put(showErrorModal(e.message));
  }
}

export function* downloadHubCertificateSaga() {
  yield takeLatest([DOWNLOAD_DFSP_CA_HUB_CERTIFICATE], downloadHubCertificate);
}

export function* fetchDataDFSPCA() {
  try {
    yield all([call(fetchDFSPCertificate), call(fetchHubCertificate)]);
  } catch (e) {
    put(showErrorModal(e.message));
  }
}

export function* requestDataDFSPCASaga() {
  yield takeLatest(REQUEST_DFSP_CA, fetchDataDFSPCA);
}

export default function* rootSaga() {
  yield all([
    changeDfspCaRootCertificateAndSubmitSaga(),
    changeDfspCaIntermediateChainAndSubmitSaga(),
    downloadDfspCaRootCertificateSaga(),
    downloadDfspCaIntermediateChainSaga(),
    downloadHubCertificateSaga(),
    requestDataDFSPCASaga(),
  ]);
}
