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

import { push } from 'connected-react-router';
import find from 'lodash/find';
import { setDfspId, initEnvironment, unsetEnvironmentId, unsetDfsps } from 'App/actions';
import { getDfsps } from 'App/selectors';
import { getJwt, getIsHubUser, getLoggedDfspId } from 'Auth/selectors';

export const selectHub = () => dispatch => dispatch(push('/hub'));

export const selectDFSP = dfspId => dispatch => {
  dispatch(setDfspId(dfspId));
  dispatch(push('/dfsp'));
};

export const selectEnvironment = id => async (dispatch, getState) => {
  if (getState().auth.login.isDisabled) {
    dispatch(initEnvironment(id));
    return;
  }

  await dispatch(initEnvironment(id));
  const isHubUser = getIsHubUser(getState());

  if (!getJwt(getState())) {
    dispatch(push('/login'));
    return;
  }

  if (isHubUser) {
    dispatch(push('/hub'));
    return;
  }

  const dfspId = getLoggedDfspId(getState());

  if (!dfspId) {
    dispatch(push('/login'));
    return;
  }

  if (!find(getDfsps(getState()), { id: dfspId })) {
    dispatch(push('/login'));
    return;
  }

  dispatch(setDfspId(dfspId));
  dispatch(push('/dfsp'));
};

export const clearEnvironment = () => dispatch => {
  dispatch(unsetEnvironmentId());
  dispatch(unsetDfsps());
};
