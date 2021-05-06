import { Reducer, combineReducers } from 'redux';

import { reducer as DfspJWSReducer } from './DFSPJWS';
import { reducer as otherDFSPsJWSReducer } from './OtherDFSPsJWS';

const reducer: Reducer = combineReducers({
  dfspjws: DfspJWSReducer,
  otherdfspjws: otherDFSPsJWSReducer,
});

export default reducer;
