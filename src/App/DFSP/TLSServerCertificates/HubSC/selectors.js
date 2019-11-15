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

import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
export const getDfspHubSCError = state => state.dfsp.tls.server.hub.dfspHubSCError;
export const getDfspHubSCRootCertificate = state => state.dfsp.tls.server.hub.dfspHubSCRootCertificate;
export const getDfspHubSCIntermediateChain = state => state.dfsp.tls.server.hub.dfspHubSCIntermediateChain;
export const getDfspHubSCServerCertificate = state => state.dfsp.tls.server.hub.dfspHubSCServerCertificate;
export const getDfspHubSCRootCertificateInfo = state => state.dfsp.tls.server.hub.dfspHubSCRootCertificateInfo;
export const getDfspHubSCIntermediateChainInfo = state => state.dfsp.tls.server.hub.dfspHubSCIntermediateChainInfo;
export const getDfspHubSCServerCertificateInfo = state => state.dfsp.tls.server.hub.dfspHubSCServerCertificateInfo;
export const getDfspHubSCValidations = state => state.dfsp.tls.server.hub.dfspHubSCValidations;
export const getDfspHubSCValidationState = state => state.dfsp.tls.server.hub.dfspHubSCValidationState;
export const getIsDfspHubSCRootCertificateModalVisible = state =>
  state.dfsp.tls.server.hub.isDfspHubSCRootCertificateModalVisible;
export const getIsDfspHubSCIntermediateChainModalVisible = state =>
  state.dfsp.tls.server.hub.isDfspHubSCIntermediateChainModalVisible;
export const getIsDfspHubSCServerCertificateModalVisible = state =>
  state.dfsp.tls.server.hub.isDfspHubSCServerCertificateModalVisible;
export const getIsDfspHubSCPending = createPendingSelector('hubServerCerts.read');
