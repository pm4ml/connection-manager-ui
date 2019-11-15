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
import { SET_HUB_LOADING, UNSET_HUB_LOADING } from './actions';

const initialState = {
  isHubLoading: true,
};

const Egress = handleActions(
  {
    [SET_HUB_LOADING]: (state, action) => ({
      ...state,
      isHubLoading: true,
    }),
    [UNSET_HUB_LOADING]: (state, action) => ({
      ...state,
      isHubLoading: false,
    }),
  },
  initialState
);

export default Egress;
export { initialState };
