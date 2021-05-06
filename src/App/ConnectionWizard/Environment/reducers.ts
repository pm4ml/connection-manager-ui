import { Reducer, combineReducers } from 'redux';
import { reducer as mainReducer } from './Main';
import { reducer as endpointsReducer } from './TechnicalSetup/Endpoints';
import { reducer as dfspCAReducer } from './TechnicalSetup/DFSPCertificateAuthority';
import { reducer as tlsReducer } from './TechnicalSetup/TLS';
import { reducer as jwsReducer } from './TechnicalSetup/JWSCertificates';

const reducer: Reducer = combineReducers({
  main: mainReducer,
  dfspca: dfspCAReducer,
  endpoints: endpointsReducer,
  tls: tlsReducer,
  jws: jwsReducer,
});

export default reducer;
