import { Reducer, combineReducers } from 'redux';
import { reducer as hubscReducer } from './HubSC';
import { reducer as dfspscReducer } from './DFSPSC';

const reducer: Reducer = combineReducers({
  dfsps: dfspscReducer,
  hubsc: hubscReducer,
});

export default reducer;
