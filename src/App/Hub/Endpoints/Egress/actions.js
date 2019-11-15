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
import { is200, is204 } from 'utils/http';
import { showSuccessToast, showErrorModal } from 'App/actions';
import { getEnvironmentId } from 'App/selectors';
import { getIpsOperations } from './selectors';
import { apiToIpModel, ipToApiModel } from './models';

export const RESET_HUB_EGRESS = 'HUB Egress / Reset';
export const SET_HUB_EGRESS_IPS = 'HUB Egress / Set Ips';
export const SET_HUB_EGRESS_ERROR = 'HUB Egress / Set Error';
export const CHANGE_HUB_EGRESS_ADDRESS = 'HUB Egress / Change IP';
export const CHANGE_HUB_EGRESS_PORT = 'HUB Egress / Change Port';
export const ADD_HUB_EGRESS_IP = 'HUB Egress / Add Configuration';
export const REMOVE_HUB_EGRESS_IP = 'HUB Egress / Remove Configuration';
export const ADD_HUB_EGRESS_PORT = 'HUB Egress / Add Port';
export const REMOVE_HUB_EGRESS_PORT = 'HUB Egress / Remove Port';
export const UNDO_HUB_EGRESS_CHANGES = 'HUB Egress / Undo Changes';

export const resetHubEgress = createAction(RESET_HUB_EGRESS);
export const setHubEgressIps = createAction(SET_HUB_EGRESS_IPS);
export const setHubEgressError = createAction(SET_HUB_EGRESS_ERROR);
export const changeHubEgressAddress = createAction(CHANGE_HUB_EGRESS_ADDRESS);
export const changeHubEgressPort = createAction(CHANGE_HUB_EGRESS_PORT);
export const addHubEgressIp = createAction(ADD_HUB_EGRESS_IP);
export const removeHubEgressIp = createAction(REMOVE_HUB_EGRESS_IP);
export const addHubEgressPort = createAction(ADD_HUB_EGRESS_PORT);
export const removeHubEgressPort = createAction(REMOVE_HUB_EGRESS_PORT);
export const undoHubEgressChanges = createAction(UNDO_HUB_EGRESS_CHANGES);

export const storeHubEgressIps = () => async (dispatch, getState) => {
  const environmentId = getEnvironmentId(getState());
  const { data, status } = await dispatch(api.hubEgressIps.read({ environmentId }));
  if (is200(status)) {
    const ips = data.map(apiToIpModel);
    dispatch(setHubEgressIps(ips));
  } else {
    dispatch(setHubEgressError(data));
  }
};

export const submitHubEgressIps = () => async (dispatch, getState) => {
  const environmentId = getEnvironmentId(getState());
  const ipsOperations = getIpsOperations(getState());

  const createActions = ipsOperations.create.map(ip =>
    dispatch(api.hubEgressIps.create({ environmentId, body: ipToApiModel(ip) }))
  );
  const updateActions = ipsOperations.update.map(ip =>
    dispatch(api.hubEgressIp.update({ environmentId, ipId: ip.id, body: ipToApiModel(ip) }))
  );
  const deleteActions = ipsOperations.delete.map(ip =>
    dispatch(api.hubEgressIp.delete({ environmentId, ipId: ip.id }))
  );

  const results = await Promise.all([...createActions, ...updateActions, ...deleteActions]);

  const allSucceeded = results.every(({ status }) => is200(status) || is204(status));
  if (allSucceeded) {
    dispatch(showSuccessToast());
    dispatch(storeHubEgressIps());
  } else {
    dispatch(showErrorModal());
  }
};
