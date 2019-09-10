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
import * as testers from 'utils/testers';

export const getDfspSCError = state => state.dfsp.tls.server.dfsp.dfspSCError;
export const getPreviousDfspSCRootCertificate = state => state.dfsp.tls.server.dfsp.previousDfspSCRootCertificate;
export const getPreviousDfspSCIntermediateChain = state => state.dfsp.tls.server.dfsp.previousDfspSCIntermediateChain;
export const getPreviousDfspSCServerCertificate = state => state.dfsp.tls.server.dfsp.previousDfspSCServerCertificate;
export const getDfspSCRootCertificate = state => state.dfsp.tls.server.dfsp.dfspSCRootCertificate;
export const getDfspSCIntermediateChain = state => state.dfsp.tls.server.dfsp.dfspSCIntermediateChain;
export const getDfspSCServerCertificate = state => state.dfsp.tls.server.dfsp.dfspSCServerCertificate;
export const getDfspSCRootCertificateInfo = state => state.dfsp.tls.server.dfsp.dfspSCRootCertificateInfo;
export const getDfspSCIntermediateChainInfo = state => state.dfsp.tls.server.dfsp.dfspSCIntermediateChainInfo;
export const getDfspSCServerCertificateInfo = state => state.dfsp.tls.server.dfsp.dfspSCServerCertificateInfo;
export const getDfspSCValidations = state => state.dfsp.tls.server.dfsp.dfspSCValidations;
export const getDfspSCValidationState = state => state.dfsp.tls.server.dfsp.dfspSCValidationState;
export const getIsDfspSCRootCertificateModalVisible = state =>
  state.dfsp.tls.server.dfsp.isDfspSCRootCertificateModalVisible;
export const getIsDfspSCIntermediateChainModalVisible = state =>
  state.dfsp.tls.server.dfsp.isDfspSCIntermediateChainModalVisible;
export const getIsDfspSCServerCertificateModalVisible = state =>
  state.dfsp.tls.server.dfsp.isDfspSCServerCertificateModalVisible;

export const getIsDfspSCReadPending = createPendingSelector('dfspServerCerts.read');

const buildDfspSCModel = (rootCertificate, intermediateChain, serverCertificate) => ({
  rootCertificate,
  intermediateChain,
  serverCertificate,
});
const getPreviousDfspSCModel = createSelector(
  getPreviousDfspSCRootCertificate,
  getPreviousDfspSCIntermediateChain,
  getPreviousDfspSCServerCertificate,
  buildDfspSCModel
);
export const getDfspSCModel = createSelector(
  getDfspSCRootCertificate,
  getDfspSCIntermediateChain,
  getDfspSCServerCertificate,
  buildDfspSCModel
);
const getIsDfspSCModelChanged = createSelector(
  getPreviousDfspSCModel,
  getDfspSCModel,
  testers.isNotEqual
);
const getIsDfspSCServerCertificateValid = createSelector(
  getDfspSCServerCertificate,
  testers.isNotNil
);

export const getIsDfspSCEditingExisitingModel = createSelector(
  getPreviousDfspSCServerCertificate,
  testers.isNotNil
);
export const getIsDfspSCSubmitEnabled = createSelector(
  getIsDfspSCServerCertificateValid,
  getIsDfspSCModelChanged,
  testers.getAllAre(true)
);

export const getIsDfspSCCreatePending = createPendingSelector('dfspServerCerts.create');
export const getIsDfspSCUpdatePending = createPendingSelector('dfspServerCerts.update');
export const getIsDfspSCSubmitPending = createSelector(
  getIsDfspSCCreatePending,
  getIsDfspSCUpdatePending,
  testers.getAnyIs(true)
);
