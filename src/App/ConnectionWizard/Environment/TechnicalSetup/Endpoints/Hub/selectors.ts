import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';
import * as testers from 'utils/testers';

export const getHubEndpointsEgressEndpoints = (state: State) =>
  state.wizard.environment.endpoints.hub.egressHubEndpoints;
export const getHubEndpointsEgressEndpointsError = (state: State) =>
  state.wizard.environment.endpoints.hub.egressHubEndpointsError;

export const getHubEndpointsIngressEndpoints = (state: State) =>
  state.wizard.environment.endpoints.hub.ingressHubEndpoints;

export const getHubEndpointsIngressEndpointsError = (state: State) =>
  state.wizard.environment.endpoints.hub.ingressHubEndpointsError;

const getIsHubIngressEndpointsReadPending = createSelector(
  (state: State) => state.api,
  isPending('ingressHubEndpoints.read')
);

const getIsHubEgressEndpointsReadPending = createSelector(
  (state: State) => state.api,
  isPending('egressHubEndpoints.read')
);

export const getIsHubEndpointsReadPending = createSelector(
  getIsHubIngressEndpointsReadPending,
  getIsHubEgressEndpointsReadPending,
  testers.getAnyIs(true)
);
