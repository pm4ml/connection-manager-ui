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
import { is200, is404 } from 'utils/http';
import { downloadFile } from 'utils/html';
import { getEnvironmentId, getDfspName } from 'App/selectors';
import { getDfspHubCaRootCertificate } from './selectors';

export const RESET_DFSP_HUB_CA = 'DFSP HUB CA / Reset';
export const SET_DFSP_HUB_CA_ERROR = 'DFSP HUB CA / Set Root Cert Error';
export const SET_DFSP_HUB_CA_ROOT_CERTIFICATE = 'DFSP HUB CA / Set Root Certificate';
export const SHOW_DFSP_HUB_CA_ROOT_CERTIFICATE_MODAL = 'DFSP HUB CA / Show Root Certificate Modal';
export const HIDE_DFSP_HUB_CA_ROOT_CERTIFICATE_MODAL = 'DFSP HUB CA / Hide Root Certificate Modal';

export const resetDfspHubCa = createAction(RESET_DFSP_HUB_CA);
export const setDfspHubCaError = createAction(SET_DFSP_HUB_CA_ERROR);
export const setDfspHubCaRootCertificate = createAction(SET_DFSP_HUB_CA_ROOT_CERTIFICATE);
export const showDfspHubCaRootCertificateModal = createAction(SHOW_DFSP_HUB_CA_ROOT_CERTIFICATE_MODAL);
export const hideDfspHubCaRootCertificateModal = createAction(HIDE_DFSP_HUB_CA_ROOT_CERTIFICATE_MODAL);

export const storeDfspHubCa = () => async (dispatch, getState) => {
  const environmentId = getEnvironmentId(getState());
  const { data, status } = await dispatch(api.hubCa.read({ environmentId }));
  if (is200(status)) {
    const { certificate } = data;
    dispatch(setDfspHubCaRootCertificate(certificate));
  } else if (!is404(status)) {
    dispatch(setDfspHubCaError(data));
  }
};

export const downloadDfspHubCaRootCertificate = () => (dispatch, getState) => {
  const dfspName = getDfspName(getState());
  const rootCertificate = getDfspHubCaRootCertificate(getState());
  downloadFile(rootCertificate, `${dfspName}-hub-root.pem`);
};
