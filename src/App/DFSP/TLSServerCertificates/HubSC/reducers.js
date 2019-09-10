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
  RESET_DFSP_HUB_SC,
  SET_DFSP_HUB_SC_ROOT_CERTIFICATE,
  SET_DFSP_HUB_SC_ERROR,
  SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
  SET_DFSP_HUB_SC_SERVER_CERTIFICATE,
  SET_DFSP_HUB_SC_ROOT_CERTIFICATE_INFO,
  SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN_INFO,
  SET_DFSP_HUB_SC_SERVER_CERTIFICATE_INFO,
  SET_DFSP_HUB_SC_VALIDATIONS,
  SET_DFSP_HUB_SC_VALIDATION_STATE,
  SHOW_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL,
  HIDE_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL,
  SHOW_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  HIDE_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  SHOW_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL,
  HIDE_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL,
} from './actions';

const initialState = {
  dfspHubSCError: undefined,
  dfspHubSCRootCertificate: undefined,
  dfspHubSCIntermediateChain: undefined,
  dfspHubSCServerCertificate: undefined,
  dfspHubSCRootCertificateInfo: undefined,
  dfspHubSCIntermediateChainInfo: undefined,
  dfspHubSCServerCertificateInfo: undefined,
  dfspHubSCValidations: [],
  dfspHubSCValidationState: undefined,
  isDfspHubSCRootCertificateModalVisible: false,
  isDfspHubSCIntermediateChainModalVisible: false,
  isDfspHubSCServerCertificateModalVisible: false,
};

const DfspHubSC = handleActions(
  {
    [RESET_DFSP_HUB_SC]: () => initialState,
    [SET_DFSP_HUB_SC_ERROR]: (state, action) => ({
      ...state,
      dfspHubSCError: action.payload,
    }),
    [SET_DFSP_HUB_SC_ROOT_CERTIFICATE]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      dfspHubSCRootCertificate: action.payload || null,
    }),
    [SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      dfspHubSCIntermediateChain: action.payload || null,
    }),
    [SET_DFSP_HUB_SC_SERVER_CERTIFICATE]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      dfspHubSCServerCertificate: action.payload || null,
    }),
    [SET_DFSP_HUB_SC_ROOT_CERTIFICATE_INFO]: (state, action) => ({
      ...state,
      dfspHubSCRootCertificateInfo: action.payload,
    }),
    [SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN_INFO]: (state, action) => ({
      ...state,
      dfspHubSCIntermediateChainInfo: action.payload,
    }),
    [SET_DFSP_HUB_SC_SERVER_CERTIFICATE_INFO]: (state, action) => ({
      ...state,
      dfspHubSCServerCertificateInfo: action.payload,
    }),
    [SET_DFSP_HUB_SC_VALIDATIONS]: (state, action) => ({
      ...state,
      dfspHubSCValidations: action.payload,
    }),
    [SET_DFSP_HUB_SC_VALIDATION_STATE]: (state, action) => ({
      ...state,
      dfspHubSCValidationState: action.payload,
    }),
    [SHOW_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspHubSCRootCertificateModalVisible: true,
    }),
    [HIDE_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspHubSCRootCertificateModalVisible: false,
    }),
    [SHOW_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isDfspHubSCIntermediateChainModalVisible: true,
    }),
    [HIDE_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL]: (state, action) => ({
      ...state,
      isDfspHubSCIntermediateChainModalVisible: false,
    }),
    [SHOW_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspHubSCServerCertificateModalVisible: true,
    }),
    [HIDE_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspHubSCServerCertificateModalVisible: false,
    }),
  },
  initialState
);

export default DfspHubSC;
export { initialState };
