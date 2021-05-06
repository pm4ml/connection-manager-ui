import { Reducer, combineReducers } from 'redux';
import { reducer as csrReducer } from './CSR';
import { reducer as csrsReducer } from './SentCSRs';
import { reducer as hubCsrsReducer } from './HubCSRs';

const reducer: Reducer = combineReducers({
  csr: csrReducer,
  csrs: csrsReducer,
  hub: hubCsrsReducer,
});

export default reducer;
