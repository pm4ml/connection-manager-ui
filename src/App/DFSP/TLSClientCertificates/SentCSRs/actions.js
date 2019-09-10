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
import { downloadFile } from 'utils/html';
import { getEnvironmentId, getDfspId, getDfspName } from 'App/selectors';

export const RESET_DFSP_SENT_CSRS = 'DFSP Sent CSRs / Reset';
export const SET_DFSP_SENT_CSRS_FILTER = 'DFSP Sent CSRs / Set Filter';
export const SET_DFSP_SENT_CSRS_ERROR = 'DFSP Sent CSRs / Set Error';
export const SET_DFSP_SENT_CSRS_CERTIFICATES = 'DFSP Sent CSRs / Set Certificates';
export const SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL = 'DFSP Sent CSRs / Show Certificate Modal';
export const HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL = 'DFSP Sent CSRs / Hide Certificate Modal';

export const resetDfspSentCsrs = createAction(RESET_DFSP_SENT_CSRS);
export const setDfspSentCsrsError = createAction(SET_DFSP_SENT_CSRS_ERROR);
export const setDfspSentCsrsFilter = createAction(SET_DFSP_SENT_CSRS_FILTER);
export const setDfspSentCsrsCertificates = createAction(SET_DFSP_SENT_CSRS_CERTIFICATES);
export const showDfspSentCsrsCertificateModal = createAction(SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL);
export const hideDfspSentCsrsCertificateModal = createAction(HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL);

export const storeDfspSentCsrs = () => async (dispatch, getState) => {
  const environmentId = getEnvironmentId(getState());
  const dfspId = getDfspId(getState());
  const { data, status } = await dispatch(api.inboundEnrollments.read({ environmentId, dfspId }));

  if (is200(status)) {
    dispatch(setDfspSentCsrsCertificates(data));
  } else {
    dispatch(setDfspSentCsrsError('Generic'));
  }
};

export const downloadDfspSentCsrCertificate = (certificate, extension) => (dispatch, getState) => {
  const dfspName = getDfspName(getState());
  downloadFile(certificate, `${dfspName}-${extension}`);
};
