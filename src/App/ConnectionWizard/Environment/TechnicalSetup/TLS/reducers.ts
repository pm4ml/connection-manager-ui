import { Reducer, combineReducers } from 'redux';

import { reducer as tlsClientReducer } from './TLSClient';
import { reducer as tlsServerReducer } from './TLSServerCertificates';

const reducer: Reducer = combineReducers({
  tlsclient: tlsClientReducer,
  tlsserver: tlsServerReducer,
});

export default reducer;
