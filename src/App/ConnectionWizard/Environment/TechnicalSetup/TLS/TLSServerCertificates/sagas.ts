import { all } from 'redux-saga/effects';
import { sagas as dfspscSagas } from './DFSPSC';
import { sagas as hubscSagas } from './HubSC';

function* rootSaga() {
  yield all([dfspscSagas(), hubscSagas()]);
}

export default rootSaga;
