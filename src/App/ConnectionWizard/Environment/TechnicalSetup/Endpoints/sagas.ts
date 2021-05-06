import { all } from 'redux-saga/effects';
import { sagas as ingressEndpointsSagas } from './Ingress';
import { sagas as egressEndpointsSagas } from './Egress';
import { sagas as hubEndpointsSagas } from './Hub';

function* rootSaga() {
  yield all([ingressEndpointsSagas(), egressEndpointsSagas(), hubEndpointsSagas()]);
}

export default rootSaga;
