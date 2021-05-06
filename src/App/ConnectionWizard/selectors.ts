import { createMatchSelector } from 'connected-react-router';
import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';

export const getEnvironments = (state: State) => state.wizard.environments.environments;
export const getEnvironmentsError = (state: State) => state.wizard.environments.environmentsError;

export const getIsEnvironmentsStatusesPending = (state: State) =>
  state.wizard.shared.isEnvironmentsStatusesPending;
export const getEnvironmentsStatuses = (state: State) => state.wizard.shared.environmentsStatuses;
export const getEnvironmentsStatusesError = (state: State) =>
  state.wizard.shared.environmentsStatusesError;

export const getDfsp = (state: State) => state.wizard.environment.main.dfsp;
export const getDfsps = (state: State) => state.wizard.environment.main.dfsps;

export const getDfspName = createSelector(getDfsp, (dfsp) => dfsp?.name);
export const getDfspId = createSelector(getDfsp, (dfsp) => dfsp?.id);
export const getDfspMonetaryZoneId = createSelector(getDfsp, (dfsp) => dfsp?.monetaryZoneId);
export const getIsDfspReadPending = createSelector(
  (state: State) => state.api,
  isPending('dfsp.read')
);

// and the connected react router keeps in state
export const getMatchedEnvironmentName = createSelector(
  createMatchSelector('/connections/:environmentName'),
  // @ts-ignore
  (match) => match && match.params?.environmentName
);

// We try to find such environment name in the environemnts we have loaded from the api
export const getEnvironment = createSelector(
  getEnvironments,
  getMatchedEnvironmentName,
  (environments, matchedEnvironmentName) =>
    environments.find((environment) => environment.name === matchedEnvironmentName)
);

// If we have the environment, we can get the real name and the ID
export const getEnvironmentId = createSelector(getEnvironment, (environment) => environment?.id);
// this selector makes sure the environment is found: the getMatchedEnvironmentName does not guarantee the environment exists
export const getEnvironmentName = createSelector(
  getEnvironment,
  (environment) => environment?.name
);
