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
  RESET_DFSP_CSR,
  SET_DFSP_CSR_CERTIFICATE,
  SHOW_DFSP_CSR_CERTIFICATE_MODAL,
  HIDE_DFSP_CSR_CERTIFICATE_MODAL,
} from './actions';

const initialState = {
  dfspCsrCertificate: undefined,
  isDfspCsrModalVisible: false,
};

const DfspCsr = handleActions(
  {
    [RESET_DFSP_CSR]: () => initialState,
    [SET_DFSP_CSR_CERTIFICATE]: (state, action) => ({
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      ...state,
      dfspCsrCertificate: action.payload || null,
    }),
    [SHOW_DFSP_CSR_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspCsrModalVisible: true,
    }),
    [HIDE_DFSP_CSR_CERTIFICATE_MODAL]: (state, action) => ({
      ...state,
      isDfspCsrModalVisible: false,
    }),
  },
  initialState
);

export default DfspCsr;
export { initialState };
