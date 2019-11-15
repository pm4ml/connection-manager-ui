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

import { handleActions } from 'redux-actions';
import {
  RESET_HUB_DFSP_CAS,
  SET_HUB_DFSP_CAS_CERTIFICATES,
  SET_HUB_DFSP_CAS_ERROR,
  SHOW_HUB_DFSP_CAS_ROOT_CERTIFICATE_MODAL,
  HIDE_HUB_DFSP_CAS_ROOT_CERTIFICATE_MODAL,
  SHOW_HUB_DFSP_CAS_INTERMEDIATE_CHAIN_MODAL,
  HIDE_HUB_DFSP_CAS_INTERMEDIATE_CHAIN_MODAL,
} from './actions';

const initialState = {
  hubDfspCasError: undefined,
  hubDfspCasCertificates: [],
  isHubDfspCasRootCertificateModalVisible: false,
  isHubDfspCasIntermediateChainModalVisible: false,
  hubDfspCasRootCertificateModalContent: undefined,
  hubDfspCasIntermediateChainModalContent: undefined,
};

const HubDfspCas = handleActions(
  {
    [RESET_HUB_DFSP_CAS]: () => initialState,
    [SET_HUB_DFSP_CAS_ERROR]: (state, action) => ({
      ...state,
      hubDfspCasError: action.payload,
    }),
    [SET_HUB_DFSP_CAS_CERTIFICATES]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      hubDfspCasCertificates: action.payload || [],
    }),
    [SHOW_HUB_DFSP_CAS_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isHubDfspCasRootCertificateModalVisible: true,
      hubDfspCasRootCertificateModalContent: action.payload,
    }),
    [HIDE_HUB_DFSP_CAS_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isHubDfspCasRootCertificateModalVisible: false,
      hubDfspCasRootCertificateModalContent: undefined,
    }),
    [SHOW_HUB_DFSP_CAS_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isHubDfspCasIntermediateChainModalVisible: true,
      hubDfspCasIntermediateChainModalContent: action.payload,
    }),
    [HIDE_HUB_DFSP_CAS_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isHubDfspCasIntermediateChainModalVisible: false,
      hubDfspCasIntermediateChainModalContent: undefined,
    }),
  },
  initialState
);

export default HubDfspCas;
export { initialState };
