import { all } from 'redux-saga/effects';
import { sagas as CSRSagas } from './CSR';
import { sagas as sentCSRsSagas } from './SentCSRs';
import { sagas as hubCSRsSagas } from './HubCSRs';

function* rootSaga() {
  yield all([CSRSagas(), sentCSRsSagas(), hubCSRsSagas()]);
}

export default rootSaga;
