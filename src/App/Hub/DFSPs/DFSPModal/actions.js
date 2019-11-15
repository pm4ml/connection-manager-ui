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
import { is20x } from 'utils/http';
import { getEnvironmentId } from 'App/selectors';
import { storeDFSPs } from 'App/actions';
import { getIsExistingDfsp, getHubDfspModalModel } from './selectors';

export const RESET_HUB_DFSP_MODAL = 'HUB DFSP MODAL / Reset';
export const SET_HUB_DFSP_MODEL = 'HUB DFSP MODAL / Set Model';
export const SHOW_HUB_DFSP_MODAL = 'HUB DFSP MODAL / Show';
export const HIDE_HUB_DFSP_MODAL = 'HUB DFSP MODAL / Hide';
export const SET_HUB_DFSP_MODAL_NAME = 'HUB DFSP MODAL / Set Name';
export const SET_HUB_DFSP_MODAL_ID = 'HUB DFSP MODAL / Set Id';
export const SET_HUB_DFSP_MODAL_MONETARY_ZONE = 'HUB DFSP MODAL / Set Monetary Zone';

export const resetHubDfspModal = createAction(RESET_HUB_DFSP_MODAL);
export const setHubDfspModel = createAction(SET_HUB_DFSP_MODEL);
export const showHubDfspModal = createAction(SHOW_HUB_DFSP_MODAL);
export const hideHubDfspModal = createAction(HIDE_HUB_DFSP_MODAL);
export const setHubDfspModalName = createAction(SET_HUB_DFSP_MODAL_NAME);
export const setHubDfspModalId = createAction(SET_HUB_DFSP_MODAL_ID);
export const setHubDfspModalMonetaryZone = createAction(SET_HUB_DFSP_MODAL_MONETARY_ZONE);

export const closeHubDfspModal = () => (dispatch, getState) => {
  dispatch(hideHubDfspModal());
  dispatch(resetHubDfspModal());
};

export const submitHubDfspModal = () => async (dispatch, getState) => {
  const model = getHubDfspModalModel(getState());
  const environmentId = getEnvironmentId(getState());
  const isExistingDfsp = getIsExistingDfsp(getState());
  let result;

  if (isExistingDfsp) {
    result = await dispatch(api.dfsp.update({ environmentId, dfspId: model.dfspId, body: model }));
  } else {
    result = await dispatch(api.dfsps.create({ environmentId, body: model }));
  }

  if (is20x(result.status)) {
    dispatch(storeDFSPs(environmentId));
    dispatch(resetHubDfspModal());
  }
};

export const openNewHubDfspModal = () => async (dispatch, getState) => {
  dispatch(setHubDfspModel());
  dispatch(showHubDfspModal());
};

export const openExistingHubDfspModal = dfspModel => async (dispatch, getState) => {
  dispatch(setHubDfspModel(dfspModel));
  dispatch(showHubDfspModal());
};
