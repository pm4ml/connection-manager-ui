import { Reducer, combineReducers } from 'redux';
import { History } from 'history';
import { connectRouter } from 'connected-react-router';
import { apiReducer } from 'utils/api';
import { reducer as appReducer } from 'App';
import { reducer as dashboardReducer } from 'App/Dashboard';
import { reducer as technicalDashboardReducer } from 'App/TechnicalDashboard';
import { reducer as transfersReducer } from 'App/Transfers';
import { reducer as wizardReducer } from 'App/ConnectionWizard';

const getReducer = (history: History): Reducer =>
  combineReducers({
    api: apiReducer,
    app: appReducer,
    router: connectRouter(history),
    dashboard: dashboardReducer,
    technicalDashboard: technicalDashboardReducer,
    transfers: transfersReducer,
    wizard: wizardReducer,
  });

export default getReducer;
