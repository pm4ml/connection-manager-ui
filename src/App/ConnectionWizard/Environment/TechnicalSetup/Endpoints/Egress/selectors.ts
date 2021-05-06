import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import { validate, getIsValid } from '@modusbox/modusbox-ui-components/dist/redux-validation';
import * as testers from 'utils/testers';
import { States } from '../types';
import { getEgressAddressValidation, getEgressPortValidation } from './validators';

export const getPreviousEgressIps = (state: State) =>
  state.wizard.environment.endpoints.egress.previousEgressIps;
export const getEgressIps = (state: State) => state.wizard.environment.endpoints.egress.egressIps;
export const getEgressIpsError = (state: State) =>
  state.wizard.environment.endpoints.egress.egressIpsError;

export const getEgressError = createSelector(getEgressIpsError, testers.getAnyIsNotNil);

export const getEgressIpsValidationResult = createSelector(
  getEgressIps,
  getEgressAddressValidation,
  getEgressPortValidation,
  (ips, addressValidation, portValidation) =>
    ips.map(({ address, ports }) => ({
      address: validate(address, addressValidation),
      ports: ports.map((port) => validate(port, portValidation)),
    }))
);

export const getIsEgressIpsValid = createSelector(getEgressIpsValidationResult, (results) =>
  results.every((result) => getIsValid(result.address) && result.ports.every(getIsValid))
);

const getIsEgressIpsChanged = createSelector(
  getPreviousEgressIps,
  getEgressIps,
  testers.isNotEqual
);

export const getIsEgressChanged = createSelector(getIsEgressIpsChanged, testers.getAnyIs(true));

export const getIsEgressSubmitEnabled = createSelector(
  getIsEgressIpsValid,
  getIsEgressChanged,
  testers.getAllAre(true)
);

export const getIsEgressIpsReadPending = createSelector(
  (state: State) => state.api,
  isPending('egressIps.read')
);
const getIsEgressIpCreatePending = createSelector(
  (state: State) => state.api,
  isPending('egressIps.create')
);
const getIsEgressIpEditPending = createSelector(
  (state: State) => state.api,
  isPending('egressIp.update')
);
const getIsEgressIpDeletePending = createSelector(
  (state: State) => state.api,
  isPending('egressIp.delete')
);

export const getIsEgressPending = createSelector(getIsEgressIpsReadPending, testers.getAnyIs(true));
export const getIsEgressSubmitPending = createSelector(
  getIsEgressIpCreatePending,
  getIsEgressIpEditPending,
  getIsEgressIpDeletePending,
  testers.getAnyIs(true)
);

export const getIpsOperations = createSelector(
  getEgressIps,
  getPreviousEgressIps,
  (ips, previousIps) => ({
    create: ips.filter((ip) => ip.state === States.Unset),
    update: ips
      .filter((ip) => ip.state !== States.Unset)
      .filter((ip) => !isEqual(find(previousIps, { id: ip.id }), ip)),
    delete: previousIps.filter((ip) => !find(ips, { id: ip.id })),
  })
);
