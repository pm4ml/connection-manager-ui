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
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import find from 'lodash/find';
import { getDfsps } from 'App/selectors';

export const getHubDfspCasError = state => state.hub.ca.dfsps.hubDfspCasError;
export const getHubDfspCasCertificates = state => state.hub.ca.dfsps.hubDfspCasCertificates;
export const getIsHubDfspCasRootCertificateModalVisible = state =>
  state.hub.ca.dfsps.isHubDfspCasRootCertificateModalVisible;
export const getIsHubDfspCasIntermediateChainModalVisible = state =>
  state.hub.ca.dfsps.isHubDfspCasIntermediateChainModalVisible;
export const getHubDfspCasRootCertificateModalContent = state =>
  state.hub.ca.dfsps.hubDfspCasRootCertificateModalContent;
export const getHubDfspCasIntermediateChainModalContent = state =>
  state.hub.ca.dfsps.hubDfspCasIntermediateChainModalContent;

export const getIsHubDfspCasPending = createPendingSelector('dfspCa.read');

export const getDfspCertificatesByDfsp = createSelector(
  getHubDfspCasCertificates,
  getDfsps,
  (certificates, dfsps) => {
    return dfsps.map(dfsp => {
      const certificate = find(certificates, { dfspId: dfsp.id });
      return {
        ...certificate,
        dfspName: dfsp.name,
      };
    });
  }
);
