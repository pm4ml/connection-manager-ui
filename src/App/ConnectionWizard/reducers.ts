import { Reducer, combineReducers } from 'redux';
import { reducer as environmentReducer } from './Environment';
import { reducer as environmentsReducer } from './Environments';
import { reducer as sharedReducer } from './Shared';

const reducer: Reducer = combineReducers({
  environment: environmentReducer,
  environments: environmentsReducer,
  shared: sharedReducer,
});

export default reducer;
