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

export const getHubDfspSCError = state => state.hub.tls.server.dfsps.hubDfspSCError;
export const getHubDfspSCCertificates = state => state.hub.tls.server.dfsps.hubDfspSCCertificates;
export const getHubDfspSCRootCertificateModalContent = state =>
  state.hub.tls.server.dfsps.hubDfspSCRootCertificateModalContent;
export const getIsHubDfspSCRootCertificateModalVisible = state =>
  state.hub.tls.server.dfsps.isHubDfspSCRootCertificateModalVisible;
export const getHubDfspSCIntermediateChainModalContent = state =>
  state.hub.tls.server.dfsps.hubDfspSCIntermediateChainModalContent;
export const getIsHubDfspSCIntermediateChainModalVisible = state =>
  state.hub.tls.server.dfsps.isHubDfspSCIntermediateChainModalVisible;
export const getHubDfspSCServerCertificateModalContent = state =>
  state.hub.tls.server.dfsps.hubDfspSCServerCertificateModalContent;
export const getIsHubDfspSCServerCertificateModalVisible = state =>
  state.hub.tls.server.dfsps.isHubDfspSCServerCertificateModalVisible;

export const getIsHubDfspSCPending = createPendingSelector('dfspsServerCerts.read');

export const getDfspCertificatesByDfsp = createSelector(
  getHubDfspSCCertificates,
  getDfsps,
  (certificates, dfsps) => {
    return dfsps.map(dfsp => {
      const certificate = find(certificates, { dfspId: dfsp.id });
      return {
        ...certificate,
        dfspId: dfsp.id,
        dfspName: dfsp.name,
      };
    });
  }
);
