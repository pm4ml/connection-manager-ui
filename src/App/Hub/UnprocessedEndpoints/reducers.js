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
  RESET_HUB_UNPROCESSED,
  SET_HUB_UNPROCESSED_ENDPOINTS,
  SET_HUB_UNPROCESSED_ENDPOINTS_ERROR,
  CHANGE_UNPROCESSED_ENDPOINTS_FILTER,
  CHANGE_HUB_UNPROCESSED_ENDPOINT_SELECTION,
} from './actions';

const initialState = {
  unprocessedEndpointsFilter: '',
  hubUnprocessedEndpoints: [],
  hubUnprocessedEndpointsError: undefined,
  confirming: {},
};

const Hub = handleActions(
  {
    [RESET_HUB_UNPROCESSED]: () => initialState,
    [SET_HUB_UNPROCESSED_ENDPOINTS]: (state, action) => ({
      ...state,
      hubUnprocessedEndpoints: action.payload,
    }),
    [SET_HUB_UNPROCESSED_ENDPOINTS_ERROR]: (state, action) => ({
      ...state,
      hubUnprocessedEndpointsError: action.payload,
    }),
    [CHANGE_UNPROCESSED_ENDPOINTS_FILTER]: (state, action) => ({
      ...state,
      unprocessedEndpointsFilter: action.payload || '',
    }),
    [CHANGE_HUB_UNPROCESSED_ENDPOINT_SELECTION]: (state, action) => {
      const { checked, id } = action.payload;
      return {
        ...state,
        confirming: {
          ...state.confirming,
          [id]: checked,
        },
      };
    },
  },
  initialState
);

export default Hub;
