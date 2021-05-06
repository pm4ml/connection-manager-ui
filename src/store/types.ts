import { Dispatch as ReduxDispatch } from 'redux';
import { RouterState } from 'connected-react-router';
import { AppState } from 'App/types';
import { DashboardState } from 'App/Dashboard/types';
import { TechnicalDashboardState } from 'App/TechnicalDashboard/types';
import { TransfersState } from 'App/Transfers/types';
import { WizardState } from 'App/ConnectionWizard/types';
import { ApiState } from 'utils/api';

export interface State {
  router: RouterState;
  app: AppState;
  dashboard: DashboardState;
  technicalDashboard: TechnicalDashboardState;
  transfers: TransfersState;
  wizard: WizardState;
  api: ApiState;
}

export interface Dispatch extends ReduxDispatch {}
