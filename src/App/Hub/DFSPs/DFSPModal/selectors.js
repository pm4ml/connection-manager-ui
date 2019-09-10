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

import { createSelector } from 'reselect';
import find from 'lodash/find';
import { getIsValid, toValidationResult } from 'modusbox-ui-components/dist/redux-validation';
import { getHubDfspModalValidators } from './validators';
import { getDfsps } from 'App/selectors';
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';

export const getHubDfspModalName = state => state.hub.dfspModal.hubDfspName;
export const getHubDfspModalDefaultId = state => state.hub.dfspModal.hubDfspDefaultId;
export const getIsHubDfspModalOverrideIdSet = state => state.hub.dfspModal.isHubDfspOverrideIdSet;
export const getHubDfspModalOverrideId = state => state.hub.dfspModal.hubDfspOverrideId;
export const getIsHubDfspModalVisible = state => state.hub.dfspModal.isHubDfspModalVisible;

export const getHubDfspModalId = createSelector(
  getHubDfspModalDefaultId,
  getHubDfspModalOverrideId,
  getIsHubDfspModalOverrideIdSet,
  (defaultId, overrideId, isOverrideSet) => (isOverrideSet ? overrideId : defaultId)
);

const getHubDfspModalIsNameUnique = createSelector(
  getDfsps,
  getHubDfspModalName,
  (dfsps, name) => !find(dfsps, { name })
);

const getHubDfspModalIsIdUnique = createSelector(
  getDfsps,
  getHubDfspModalId,
  (dfsps, id) => !find(dfsps, { id })
);

const getHubDfspModalValidation = createSelector(
  getHubDfspModalName,
  getHubDfspModalIsNameUnique,
  getHubDfspModalId,
  getHubDfspModalIsIdUnique,
  getHubDfspModalValidators
);

export const getHubDfspModalModel = createSelector(
  getHubDfspModalName,
  getHubDfspModalId,
  (name, dfspId) => ({ name, dfspId })
);

export const getHubDfspModalValidationResult = createSelector(
  getHubDfspModalModel,
  getHubDfspModalValidation,
  toValidationResult
);

const isModelValid = createSelector(
  getHubDfspModalValidationResult,
  getIsValid
);

export const getIsHubDfspModalSubmitEnabled = createSelector(
  isModelValid,
  isValid => isValid === true
);

export const getIsHubDfspCreatePending = createPendingSelector('dfsps.create');
