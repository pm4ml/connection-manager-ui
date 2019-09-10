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
import find from 'lodash/find';
import {
  createPendingSelector,
  createPendingCollectionSelector,
  getPendingByParameter,
} from 'modusbox-ui-components/dist/redux-fetch';
import { getDfsps } from 'App/selectors';
import { STATES } from '../constants';

export const getHubSentCsrsError = state => state.hub.tls.client.csrs.hubSentCsrsError;
export const getHubSentCsrsFilter = state => state.hub.tls.client.csrs.hubSentCsrsFilter;
export const getHubSentCsrsCertificates = state => state.hub.tls.client.csrs.hubSentCsrsCertificates;
export const getIsHubSentCsrsCertificateModalVisible = state =>
  state.hub.tls.client.csrs.isHubSentCsrsCertificateModalVisible;
export const getHubSentCsrsCertificateModalContent = state =>
  state.hub.tls.client.csrs.hubSentCsrsCertificateModalContent;
export const getHubSentCsrsCertificateModalTitle = state => state.hub.tls.client.csrs.hubSentCsrsCertificateModalTitle;

export const getHubHasUnvalidatedDfspCsrs = createSelector(
  getHubSentCsrsCertificates,
  csrs => csrs.filter(csr => [STATES.CERT_SIGNED].includes(csr.state)).length > 0
);

const getHubSentCsrsCertificatesByDfsp = createSelector(
  getHubSentCsrsCertificates,
  getDfsps,
  (csrs, dfsps) =>
    csrs.map(csr => {
      const dfsp = find(dfsps, { id: csr.dfspId });
      return {
        ...csr,
        dfspName: dfsp.name,
      };
    })
);

export const getFilteredHubSentCsrsCertificatesByDFSP = createSelector(
  getHubSentCsrsCertificatesByDfsp,
  getHubSentCsrsFilter,
  (csrs, filter) => csrs.filter(csr => csr.dfspName.toLowerCase().includes(filter.toLowerCase()))
);

export const getIsHubSentCsrsPending = createPendingSelector('outboundEnrollments.read');
export const getIsHubSentCsrsValidateCertificatePendingCollection = createPendingCollectionSelector(
  'outboundEnrollmentValidate.create'
);
export const getIsHubSentCsrsValidateCertificatePendingByDfspId = createSelector(
  getFilteredHubSentCsrsCertificatesByDFSP,
  getIsHubSentCsrsValidateCertificatePendingCollection,
  (csrs, collection) => {
    const getByCsrId = getPendingByParameter('enrollmentId');
    return csrs
      .map(csr => csr.id)
      .reduce(
        (prev, id) => ({
          ...prev,
          [id]: getByCsrId(collection, id),
        }),
        {}
      );
  }
);
