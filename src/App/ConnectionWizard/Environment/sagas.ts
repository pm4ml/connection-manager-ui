import { all } from 'redux-saga/effects';
import mainSagas from './Main/sagas';
import endpointsSagas from './TechnicalSetup/Endpoints/sagas';
import dfspCASagas from './TechnicalSetup/DFSPCertificateAuthority/sagas';
import tlsSagas from './TechnicalSetup/TLS/sagas';
import jwsSagas from './TechnicalSetup/JWSCertificates/sagas';

export default function* rootSaga() {
  yield all([mainSagas(), endpointsSagas(), dfspCASagas(), tlsSagas(), jwsSagas()]);
}
