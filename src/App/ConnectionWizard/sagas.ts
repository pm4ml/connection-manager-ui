import { all } from 'redux-saga/effects';
import sharedSagas from './Shared/sagas';
import environmentSagas from './Environment/sagas';
import environmentsSagas from './Environments/sagas';

export default function* rootSaga() {
  yield all([sharedSagas(), environmentSagas(), environmentsSagas()]);
}
