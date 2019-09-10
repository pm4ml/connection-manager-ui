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
import { getEnvironmentId } from 'App/selectors';

export const RESET_DFSP_HUB_ENDPOINTS = 'DFSP Hub Endpoints / Reset';
export const SET_DFSP_HUB_ENDPOINTS_ENDPOINTS = 'DFSP Hub Endpoints / Set Endpoints';
export const SET_DFSP_HUB_ENDPOINTS_ENDPOINTS_ERROR = 'DFSP Hub Endpoints / Set Endpoints Error';

export const resetDfspHubEndpoints = createAction(RESET_DFSP_HUB_ENDPOINTS);
export const setDfspHubEndpointsEndpoints = createAction(SET_DFSP_HUB_ENDPOINTS_ENDPOINTS);
export const setDfspHubEndpointsEndpointsError = createAction(SET_DFSP_HUB_ENDPOINTS_ENDPOINTS_ERROR);

const apiToUnprocessedModel = item => ({
  ...item,
});

export const storeDfspHubEndpoints = () => async (dispatch, getState) => {
  const environmentId = getEnvironmentId(getState());
  const { data, status } = await dispatch(api.hubEndpoints.read({ environmentId }));
  if (is200(status)) {
    const endpoints = data.map(apiToUnprocessedModel);
    dispatch(setDfspHubEndpointsEndpoints(endpoints));
  } else {
    dispatch(setDfspHubEndpointsEndpointsError(data));
  }
};
