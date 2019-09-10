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
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import { getDfspHubExternalCaCertificates } from '../../CertificateAuthorities/HUBExternalCertificateAuthority/selectors';

export const getDfspSentCsrsError = state => state.dfsp.tls.client.csrs.dfspSentCsrsError;
export const getDfspSentCsrsFilter = state => state.dfsp.tls.client.csrs.dfspSentCsrsFilter;
export const getDfspSentCsrsCertificates = state => state.dfsp.tls.client.csrs.dfspSentCsrsCertificates;
export const getIsDfspSentCsrsCertificateModalVisible = state =>
  state.dfsp.tls.client.csrs.isDfspSentCsrsCertificateModalVisible;
export const getDfspSentCsrsCertificateModalContent = state =>
  state.dfsp.tls.client.csrs.dfspSentCsrsCertificateModalContent;
export const getDfspSentCsrsCertificateModalTitle = state =>
  state.dfsp.tls.client.csrs.dfspSentCsrsCertificateModalTitle;

const findCaById = (id, cas) => find(cas, { id });

export const getFilteredDfspSentCsrsCertificates = createSelector(
  getDfspHubExternalCaCertificates,
  getDfspSentCsrsCertificates,
  getDfspSentCsrsFilter,
  (cas, certificates, filter) => {
    const lowerCaseFilter = filter.toLowerCase();
    return certificates
      .map(csr => ({
        ...csr,
        externalCa: findCaById(csr.hubCAId, cas),
      }))
      .filter(csr => csr.csrInfo.subject.CN.toLowerCase().includes(lowerCaseFilter));
  }
);

export const getIsDfspSentCsrsPending = createPendingSelector('inboundEnrollments.read');
