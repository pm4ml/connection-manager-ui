/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import { createSelector } from 'reselect';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import { validate, getIsValid } from 'modusbox-ui-components/dist/redux-validation';
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import * as testers from 'utils/testers';
import { STATES } from '../constants';
import { getEgressAddressValidation, getEgressPortValidation } from './validators';

export const getPreviousEgressIps = state => state.dfsp.endpoints.dfsp.egress.previousEgressIps;
export const getEgressError = state => state.dfsp.endpoints.dfsp.egress.egressError;
export const getEgressIps = state => state.dfsp.endpoints.dfsp.egress.egressIps;

export const getEgressIpsValidationResult = createSelector(
  getEgressIps,
  getEgressAddressValidation,
  getEgressPortValidation,
  (configurations, addressValidation, portValidation) =>
    configurations.map(({ address, ports }) => ({
      address: validate(address, addressValidation),
      ports: ports.map(port => validate(port, portValidation)),
    }))
);

export const getIsEgressChanged = createSelector(
  getPreviousEgressIps,
  getEgressIps,
  testers.isNotEqual
);

export const getIsEgressIpsValid = createSelector(
  getEgressIpsValidationResult,
  results => results.every(result => getIsValid(result.address) && result.ports.every(getIsValid))
);

export const getIsEgressIpsSubmitEnabled = createSelector(
  getIsEgressIpsValid,
  getIsEgressChanged,
  testers.getAllAre(true)
);

const getIsEgressIpsReadPending = createPendingSelector('egressIps.read');
const getIsEgressIpCreatePending = createPendingSelector('egressIps.create');
const getIsEgressIpEditPending = createPendingSelector('egressIp.update');
const getIsEgressIpDeletePending = createPendingSelector('egressIp.delete');

export const getIsEgressPending = getIsEgressIpsReadPending;
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
    create: ips.filter(ip => ip.state === STATES.UNSET),
    update: ips.filter(ip => ip.state !== STATES.UNSET).filter(ip => !isEqual(find(previousIps, { id: ip.id }), ip)),
    delete: previousIps.filter(ip => !find(ips, { id: ip.id })),
  })
);
