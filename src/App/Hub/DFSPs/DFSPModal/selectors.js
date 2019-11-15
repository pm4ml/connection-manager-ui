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
import * as testers from 'utils/testers';
import { getIsValid, toValidationResult } from 'modusbox-ui-components/dist/redux-validation';
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import { getDfsps } from 'App/selectors';
import { getMonetaryZones } from 'App/MonetaryZones/selectors';
import { getHubDfspModalValidators } from './validators';

const buildDfspModel = (name, dfspId, monetaryZoneId) => ({ name, dfspId, monetaryZoneId });

export const getHubDfspModalName = state => state.hub.dfspModal.hubDfspName;
export const getHubDfspModalDefaultId = state => state.hub.dfspModal.hubDfspDefaultId;
export const getHubDfspModalMonetaryZoneId = state => state.hub.dfspModal.hubDfspMonetaryZoneId;
export const getIsHubDfspModalOverrideIdSet = state => state.hub.dfspModal.isHubDfspOverrideIdSet;
export const getHubDfspModalOverrideId = state => state.hub.dfspModal.hubDfspOverrideId;
export const getIsHubDfspModalVisible = state => state.hub.dfspModal.isHubDfspModalVisible;
export const getPreviousHubDfspModalName = state => state.hub.dfspModal.previousHubDfspName;
export const getPreviousHubDfspModalId = state => state.hub.dfspModal.previousHubDfspId;
export const getPreviousHubDfspModalMonetaryZoneId = state => state.hub.dfspModal.previousHubDfspMonetaryZoneId;

export const getIsExistingDfsp = createSelector(
  getPreviousHubDfspModalId,
  id => id !== undefined
);

export const getMonetaryZoneOptions = createSelector(
  getMonetaryZones,
  zones =>
    zones.map(zone => ({
      label: zone.name,
      value: zone.monetaryZoneId,
    }))
);

export const getHubDfspModalId = createSelector(
  getHubDfspModalDefaultId,
  getHubDfspModalOverrideId,
  getIsHubDfspModalOverrideIdSet,
  (defaultId, overrideId, isOverrideSet) => (isOverrideSet ? overrideId : defaultId)
);

const getHubDfspModalIsNameUnique = createSelector(
  getDfsps,
  getHubDfspModalName,
  getPreviousHubDfspModalName,
  (dfsps, name, previousName) => !find(dfsps, dfsp => dfsp.name === name && previousName !== dfsp.name)
);

const getHubDfspModalIsIdUnique = createSelector(
  getDfsps,
  getHubDfspModalId,
  getPreviousHubDfspModalId,
  (dfsps, id, previousId) => !find(dfsps, dfsp => dfsp.id === id && previousId !== dfsp.id)
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
  getHubDfspModalMonetaryZoneId,
  buildDfspModel
);

export const getPreviousHubDfspModalModel = createSelector(
  getPreviousHubDfspModalName,
  getPreviousHubDfspModalId,
  getPreviousHubDfspModalMonetaryZoneId,
  buildDfspModel
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

const isModelChanged = createSelector(
  getPreviousHubDfspModalModel,
  getHubDfspModalModel,
  testers.isNotEqual
);

export const getIsHubDfspModalSubmitEnabled = createSelector(
  isModelValid,
  isModelChanged,
  testers.getAllAre(true)
);

export const getIsHubDfspCreatePending = createPendingSelector('dfsps.create');
export const getIsHubDfspUpdatePending = createPendingSelector('dfsp.update');
export const getIsHubDfspModalSubmitPending = createSelector(
  getIsHubDfspCreatePending,
  getIsHubDfspUpdatePending,
  testers.getAnyIs(true)
);
