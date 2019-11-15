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
  RESET_DFSP_HUB_ENDPOINTS,
  SET_DFSP_HUB_ENDPOINTS_ENDPOINTS,
  SET_DFSP_HUB_ENDPOINTS_ENDPOINTS_ERROR,
} from './actions';

const initialState = {
  dfspHubEndpoints: [],
  dfspHubEndpointsError: undefined,
};

const dfspHubEndpoints = handleActions(
  {
    [RESET_DFSP_HUB_ENDPOINTS]: () => initialState,
    [SET_DFSP_HUB_ENDPOINTS_ENDPOINTS]: (state, action) => ({
      ...state,
      dfspHubEndpoints: action.payload,
    }),
    [SET_DFSP_HUB_ENDPOINTS_ENDPOINTS_ERROR]: (state, action) => ({
      ...state,
      dfspHubEndpointsError: action.payload,
    }),
  },
  initialState
);

export default dfspHubEndpoints;
