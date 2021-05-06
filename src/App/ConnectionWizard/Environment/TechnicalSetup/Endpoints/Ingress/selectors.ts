import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import { validate, getIsValid } from '@modusbox/modusbox-ui-components/dist/redux-validation';
import * as testers from 'utils/testers';
import { States } from '../types';
import {
  getIngressUrlValidation,
  getIngressAddressValidation,
  getIngressPortValidation,
} from './validators';

export const getPreviousIngressUrls = (state: State) =>
  state.wizard.environment.endpoints.ingress.previousIngressUrls;
export const getPreviousIngressIps = (state: State) =>
  state.wizard.environment.endpoints.ingress.previousIngressIps;
export const getIngressUrls = (state: State) =>
  state.wizard.environment.endpoints.ingress.ingressUrls;
export const getIngressIps = (state: State) =>
  state.wizard.environment.endpoints.ingress.ingressIps;
export const getIngressUrlsError = (state: State) =>
  state.wizard.environment.endpoints.ingress.ingressUrlsError;
export const getIngressIpsError = (state: State) =>
  state.wizard.environment.endpoints.ingress.ingressIpsError;

export const getIngressError = createSelector(
  getIngressUrlsError,
  getIngressIpsError,
  testers.getAnyIsNotNil
);

export const getIngressUrlsValidationResult = createSelector(
  getIngressUrls,
  getIngressUrlValidation,
  (urls, urlValidation) => urls.map(({ url }) => validate(url, urlValidation))
);

export const getIngressIpsValidationResult = createSelector(
  getIngressIps,
  getIngressAddressValidation,
  getIngressPortValidation,
  (ips, addressValidation, portValidation) =>
    ips.map(({ address, ports }) => ({
      address: validate(address, addressValidation),
      ports: ports.map((port) => validate(port, portValidation)),
    }))
);

export const getIsIngressUrlsValid = createSelector(getIngressUrlsValidationResult, (results) =>
  results.every(getIsValid)
);

export const getIsIngressIpsValid = createSelector(getIngressIpsValidationResult, (results) =>
  results.every((result) => getIsValid(result.address) && result.ports.every(getIsValid))
);

const getIsIngressUrlsChanged = createSelector(
  getPreviousIngressUrls,
  getIngressUrls,
  testers.isNotEqual
);

const getIsIngressIpsChanged = createSelector(
  getPreviousIngressIps,
  getIngressIps,
  testers.isNotEqual
);

export const getIsIngressChanged = createSelector(
  getIsIngressUrlsChanged,
  getIsIngressIpsChanged,
  testers.getAnyIs(true)
);

export const getIsIngressSubmitEnabled = createSelector(
  getIsIngressUrlsValid,
  getIsIngressIpsValid,
  getIsIngressChanged,
  testers.getAllAre(true)
);

export const getIsIngressIpsReadPending = createSelector(
  (state: State) => state.api,
  isPending('ingressIps.read')
);
export const getIsIngressUrlsReadPending = createSelector(
  (state: State) => state.api,
  isPending('ingressUrls.read')
);
const getIsIngressUrlCreatePending = createSelector(
  (state: State) => state.api,
  isPending('ingressUrls.create')
);
const getIsIngressUrlEditPending = createSelector(
  (state: State) => state.api,
  isPending('ingressUrl.update')
);
const getIsIngressIpCreatePending = createSelector(
  (state: State) => state.api,
  isPending('ingressIps.create')
);
const getIsIngressIpEditPending = createSelector(
  (state: State) => state.api,
  isPending('ingressIp.update')
);
const getIsIngressIpDeletePending = createSelector(
  (state: State) => state.api,
  isPending('ingressIp.delete')
);

export const getIsIngressPending = createSelector(
  getIsIngressIpsReadPending,
  getIsIngressUrlsReadPending,
  testers.getAnyIs(true)
);
export const getIsIngressSubmitPending = createSelector(
  getIsIngressUrlCreatePending,
  getIsIngressUrlEditPending,
  getIsIngressIpCreatePending,
  getIsIngressIpEditPending,
  getIsIngressIpDeletePending,
  testers.getAnyIs(true)
);

export const getIpsOperations = createSelector(
  getIngressIps,
  getPreviousIngressIps,
  (ips, previousIps) => ({
    create: ips.filter((ip) => ip.state === States.Unset),
    update: ips
      .filter((ip) => ip.state !== States.Unset)
      .filter((ip) => !isEqual(find(previousIps, { id: ip.id }), ip)),
    delete: previousIps.filter((ip) => !find(ips, { id: ip.id })),
  })
);

export const getUrlsOperations = createSelector(
  getIngressUrls,
  getPreviousIngressUrls,
  (urls, previousUrls) => ({
    create: urls.filter((url) => url.state === States.Unset),
    update: urls
      .filter((url) => url.state !== States.Unset)
      .filter((url) => !isEqual(find(previousUrls, { id: url.id }), url)),
    delete: previousUrls.filter((url) => !find(urls, { id: url.id })),
  })
);
