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

import { createAction } from 'redux-actions';
import api from 'utils/api';
import { is200 } from 'utils/http';
import { showSuccessToast, showErrorModal } from 'App/actions';
import { getEnvironmentId, getDfspId } from 'App/selectors';
import { getDfspCsrCertificate } from './selectors';

export const RESET_DFSP_CSR = 'DFSP CSR / Reset';
export const SET_DFSP_CSR_CERTIFICATE = 'DFSP CSR / Set Certificate';
export const SHOW_DFSP_CSR_CERTIFICATE_MODAL = 'DFSP CSR / Show Certificate Modal';
export const HIDE_DFSP_CSR_CERTIFICATE_MODAL = 'DFSP CSR / Hide Certificate Modal';

export const resetDfspCsr = createAction(RESET_DFSP_CSR);
export const setDfspCsrCertificate = createAction(SET_DFSP_CSR_CERTIFICATE);
export const showDfspCsrModal = createAction(SHOW_DFSP_CSR_CERTIFICATE_MODAL);
export const hideDfspCsrModal = createAction(HIDE_DFSP_CSR_CERTIFICATE_MODAL);

export const submitDfspCsr = () => async (dispatch, getState) => {
  const environmentId = getEnvironmentId(getState());
  const dfspId = getDfspId(getState());
  const clientCSR = getDfspCsrCertificate(getState());
  const body = { clientCSR };

  const { data, status } = await dispatch(api.inboundEnrollments.create({ environmentId, dfspId, body }));
  if (is200(status)) {
    dispatch(showSuccessToast());
    dispatch(resetDfspCsr());
  } else {
    dispatch(showErrorModal({ status, data }));
  }
};
