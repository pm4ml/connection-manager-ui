import { Reducer, combineReducers } from 'redux';

import { reducer as ingressReducer } from './Ingress';
import { reducer as egressReducer } from './Egress';
import { reducer as hubReducer } from './Hub';

const reducer: Reducer = combineReducers({
  ingress: ingressReducer,
  egress: egressReducer,
  hub: hubReducer,
});

export default reducer;
