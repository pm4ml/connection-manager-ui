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
  RESET_HUB_DFSP_MODAL,
  SET_HUB_DFSP_MODEL,
  SHOW_HUB_DFSP_MODAL,
  HIDE_HUB_DFSP_MODAL,
  SET_HUB_DFSP_MODAL_NAME,
  SET_HUB_DFSP_MODAL_ID,
  SET_HUB_DFSP_MODAL_MONETARY_ZONE,
} from './actions';

const initialHubDfspModel = {
  id: undefined,
  name: '',
  monetaryZoneId: undefined,
};

const initialState = {
  previousHubDfspMonetaryZoneId: initialHubDfspModel.monetaryZoneId,
  previousHubDfspName: initialHubDfspModel.name,
  previousHubDfspId: initialHubDfspModel.id,
  hubDfspMonetaryZoneId: initialHubDfspModel.monetaryZoneId,
  hubDfspName: initialHubDfspModel.name,
  hubDfspOverrideId: initialHubDfspModel.id,
  hubDfspDefaultId: undefined,
  isHubDfspOverrideIdSet: false,
  isHubDfspModalVisible: false,
};

const HubDfspModal = handleActions(
  {
    [RESET_HUB_DFSP_MODAL]: () => initialState,
    [SET_HUB_DFSP_MODEL]: (state, action) => {
      const model = action.payload || initialHubDfspModel;
      return {
        ...state,
        previousHubDfspMonetaryZoneId: model.monetaryZoneId,
        previousHubDfspName: model.name,
        previousHubDfspId: model.id,
        hubDfspMonetaryZoneId: model.monetaryZoneId,
        hubDfspName: model.name,
        hubDfspOverrideId: model.id,
        isHubDfspOverrideIdSet: action.payload !== undefined,
      };
    },
    [SET_HUB_DFSP_MODAL_NAME]: (state, action) => ({
      ...state,
      hubDfspName: action.payload,
      hubDfspDefaultId: action.payload,
    }),
    [SET_HUB_DFSP_MODAL_ID]: (state, action) => ({
      ...state,
      hubDfspOverrideId: action.payload,
      isHubDfspOverrideIdSet: true,
    }),
    [SET_HUB_DFSP_MODAL_MONETARY_ZONE]: (state, action) => ({
      ...state,
      hubDfspMonetaryZoneId: action.payload,
    }),
    [SHOW_HUB_DFSP_MODAL]: (state, action) => ({
      ...state,
      isHubDfspModalVisible: true,
    }),
    [HIDE_HUB_DFSP_MODAL]: (state, action) => ({
      ...state,
      isHubDfspModalVisible: false,
    }),
  },
  initialState
);

export default HubDfspModal;
export { initialState };
