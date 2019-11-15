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

export const getDfspHubExternalCaError = state => state.dfsp.ca.hubExternal.dfspHubExternalCaError;
export const getDfspHubExternalCaCertificates = state => state.dfsp.ca.hubExternal.dfspHubExternalCertificates;
export const getIsDfspHubExternalCaRootCertificateModalVisible = state =>
  state.dfsp.ca.hubExternal.isDfspHubExternalCaRootCertificateModalVisible;
export const getIsDfspHubExternalCaIntermediateChainModalVisible = state =>
  state.dfsp.ca.hubExternal.isDfspHubExternalCaIntermediateChainModalVisible;
export const getDfspHubExternalCaRootCertificateModalContent = state =>
  state.dfsp.ca.hubExternal.dfspHubExternalCaRootCertificateModalContent;
export const getDfspHubExternalCaIntermediateChainModalContent = state =>
  state.dfsp.ca.hubExternal.dfspHubExternalCaIntermediateChainModalContent;

export const getIsDfspHubExternalCaReadPending = createPendingSelector('hubExternalCas.read');
