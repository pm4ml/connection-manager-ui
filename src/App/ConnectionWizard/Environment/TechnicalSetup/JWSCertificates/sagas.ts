import { all } from 'redux-saga/effects';

import { sagas as DfspJWSSagas } from './DFSPJWS';
import { sagas as otherDFSPsJWSSagas } from './OtherDFSPsJWS';

function* rootSaga() {
  yield all([DfspJWSSagas(), otherDFSPsJWSSagas()]);
}

export default rootSaga;
