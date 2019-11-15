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
  RESET_DFSP_HUB_EXTERNAL_CA,
  SET_DFSP_HUB_EXTERNAL_CA_ERROR,
  SET_DFSP_HUB_EXTERNAL_CA_CERTIFICATES,
  SHOW_DFSP_HUB_EXTERNAL_CA_ROOT_CERTIFICATE_MODAL,
  HIDE_DFSP_HUB_EXTERNAL_CA_ROOT_CERTIFICATE_MODAL,
  SHOW_DFSP_HUB_EXTERNAL_CA_INTERMEDIATE_CHAIN_MODAL,
  HIDE_DFSP_HUB_EXTERNAL_CA_INTERMEDIATE_CHAIN_MODAL,
} from './actions';

const initialState = {
  dfspHubExternalCaError: undefined,
  dfspHubExternalCertificates: [],
  dfspHubExternalCaRootCert: undefined,
  dfspHubExternalCaIntermediateChain: undefined,
  dfspHubExternalCaName: undefined,
  isDfspHubExternalCaRootCertificateModalVisible: false,
  dfspHubExternalCaRootCertificateModalContent: undefined,
  isDfspHubExternalCaIntermediateChainModalVisible: false,
  dfspHubExternalCaIntermediateChainModalContent: undefined,
};

const DfspHubExternalCa = handleActions(
  {
    [RESET_DFSP_HUB_EXTERNAL_CA]: () => initialState,
    [SET_DFSP_HUB_EXTERNAL_CA_ERROR]: (state, action) => ({
      ...state,
      dfspHubExternalCaError: action.payload,
    }),
    [SET_DFSP_HUB_EXTERNAL_CA_CERTIFICATES]: (state, action) => ({
      ...state,
      dfspHubExternalCertificates: action.payload,
    }),
    [SHOW_DFSP_HUB_EXTERNAL_CA_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspHubExternalCaRootCertificateModalVisible: true,
      dfspHubExternalCaRootCertificateModalContent: action.payload,
    }),
    [HIDE_DFSP_HUB_EXTERNAL_CA_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspHubExternalCaRootCertificateModalVisible: false,
      dfspHubExternalCaRootCertificateModalContent: undefined,
    }),
    [SHOW_DFSP_HUB_EXTERNAL_CA_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isDfspHubExternalCaIntermediateChainModalVisible: true,
      dfspHubExternalCaIntermediateChainModalContent: action.payload,
    }),
    [HIDE_DFSP_HUB_EXTERNAL_CA_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isDfspHubExternalCaIntermediateChainModalVisible: false,
      dfspHubExternalCaIntermediateChainModalContent: undefined,
    }),
  },
  initialState
);

export default DfspHubExternalCa;
export { initialState };
