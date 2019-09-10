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

export const getDfspJWSError = state => state.dfsp.jws.dfsp.dfspJWSError;
export const getPreviousDfspJWSJwsCertificate = state => state.dfsp.jws.dfsp.previousDfspJWSJwsCertificate;
export const getPreviousDfspJWSIntermediateChain = state => state.dfsp.jws.dfsp.previousDfspJWSIntermediateChain;
export const getDfspJWSJwsCertificate = state => state.dfsp.jws.dfsp.dfspJWSJwsCertificate;
export const getDfspJWSIntermediateChain = state => state.dfsp.jws.dfsp.dfspJWSIntermediateChain;
export const getDfspJWSJwsCertificateInfo = state => state.dfsp.jws.dfsp.dfspJWSJwsCertificateInfo;
export const getDfspJWSIntermediateChainInfo = state => state.dfsp.jws.dfsp.dfspJWSIntermediateChainInfo;
export const getDfspJWSValidations = state => state.dfsp.jws.dfsp.dfspJWSValidations;
export const getDfspJWSValidationState = state => state.dfsp.jws.dfsp.dfspJWSValidationState;
export const getIsDfspJWSJwsCertificateModalVisible = state => state.dfsp.jws.dfsp.isDfspJWSJwsCertificateModalVisible;
export const getIsDfspJWSIntermediateChainModalVisible = state =>
  state.dfsp.jws.dfsp.isDfspJWSIntermediateChainModalVisible;

const buildDfspJWSModel = (jwsCertificate, intermediateChain, serverCertificate) => ({
  jwsCertificate,
  intermediateChain,
});
const getPreviousDfspJWSModel = createSelector(
  getPreviousDfspJWSJwsCertificate,
  getPreviousDfspJWSIntermediateChain,
  buildDfspJWSModel
);
export const getDfspJWSModel = createSelector(
  getDfspJWSJwsCertificate,
  getDfspJWSIntermediateChain,
  buildDfspJWSModel
);
const getIsDfspJWSModelChanged = createSelector(
  getPreviousDfspJWSModel,
  getDfspJWSModel,
  testers.isNotEqual
);
const getIsDfspJWSJwsCertificateValid = createSelector(
  getDfspJWSJwsCertificate,
  testers.isNotNil
);

export const getIsDfspJWSEditingExisitingModel = createSelector(
  getPreviousDfspJWSJwsCertificate,
  testers.isNotNil
);
export const getIsDfspJWSSubmitEnabled = createSelector(
  getIsDfspJWSJwsCertificateValid,
  getIsDfspJWSModelChanged,
  testers.getAllAre(true)
);

export const getIsDfspJWSCreatePending = createPendingSelector('dfspJWSCerts.create');
export const getIsDfspJWSUpdatePending = createPendingSelector('dfspJWSCerts.update');
export const getIsDfspJWSSubmitPending = createSelector(
  getIsDfspJWSCreatePending,
  getIsDfspJWSUpdatePending,
  testers.getAnyIs(true)
);
