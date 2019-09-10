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

import {
  createPendingSelector,
  createPendingCollectionSelector,
  getPendingByParameter,
} from 'modusbox-ui-components/dist/redux-fetch';
import { STATES } from '../constants';

export const getDfspHubCsrsError = state => state.dfsp.tls.client.hub.dfspHubCsrsError;
export const getDfspHubCsrsCertificates = state => state.dfsp.tls.client.hub.dfspHubCsrsCertificates;
export const getIsDfspHubCsrsCertificateModalVisible = state =>
  state.dfsp.tls.client.hub.isDfspHubCsrsCertificateModalVisible;
export const getDfspHubCsrsCertificateModalContent = state =>
  state.dfsp.tls.client.hub.dfspHubCsrsCertificateModalContent;
export const getDfspHubCsrsCertificateModalTitle = state => state.dfsp.tls.client.hub.dfspHubCsrsCertificateModalTitle;

export const getDfspHasUnsignedHubCsrs = createSelector(
  getDfspHubCsrsCertificates,
  csrs => csrs.filter(csr => [STATES.CSR_LOADED].includes(csr.state)).length > 0
);

export const getIsDfspHubCsrsPending = createPendingSelector('outboundEnrollments.read');
export const getDfspHubCsrCertificateSigningPendingCollection = createPendingCollectionSelector(
  'outboundEnrollmentCertificate.create'
);
export const getIsDfspHubCsrCertificateSigningPendingByEnrollmentId = createSelector(
  getDfspHubCsrsCertificates,
  getDfspHubCsrCertificateSigningPendingCollection,
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
