import { all } from 'redux-saga/effects';
import tlsClientSagas from './TLSClient/sagas';
import tlsServerCertSagas from './TLSServerCertificates/sagas';

function* rootSaga() {
  yield all([tlsClientSagas(), tlsServerCertSagas()]);
}

export default rootSaga;
