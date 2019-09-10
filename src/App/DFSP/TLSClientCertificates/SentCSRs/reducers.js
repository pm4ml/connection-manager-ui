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
  RESET_DFSP_SENT_CSRS,
  SET_DFSP_SENT_CSRS_ERROR,
  SET_DFSP_SENT_CSRS_FILTER,
  SET_DFSP_SENT_CSRS_CERTIFICATES,
  SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL,
  HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL,
} from './actions';

const initialState = {
  dfspSentCsrsError: undefined,
  dfspSentCsrsFilter: '',
  dfspSentCsrsCertificates: [],
  isDfspSentCsrsCertificateModalVisible: false,
  dfspSentCsrsCertificateModalContent: undefined,
  dfspSentCsrsCertificateModalTitle: undefined,
};

const DfspSentCsrs = handleActions(
  {
    [RESET_DFSP_SENT_CSRS]: () => initialState,
    [SET_DFSP_SENT_CSRS_ERROR]: (state, action) => ({
      ...state,
      dfspSentCsrsError: action.payload,
    }),
    [SET_DFSP_SENT_CSRS_FILTER]: (state, action) => ({
      ...state,
      dfspSentCsrsFilter: action.payload || '',
    }),
    [SET_DFSP_SENT_CSRS_CERTIFICATES]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      dfspSentCsrsCertificates: action.payload || [],
    }),
    [SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspSentCsrsCertificateModalVisible: true,
      dfspSentCsrsCertificateModalContent: action.payload.certificate,
      dfspSentCsrsCertificateModalTitle: action.payload.title,
    }),
    [HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspSentCsrsCertificateModalVisible: false,
      dfspSentCsrsCertificateModalContent: undefined,
      dfspSentCsrsCertificateModalTitle: undefined,
    }),
  },
  initialState
);

export default DfspSentCsrs;
export { initialState };
