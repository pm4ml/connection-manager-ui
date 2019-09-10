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
import sortBy from 'lodash/sortBy';
import { createPendingSelector } from 'modusbox-ui-components/dist/redux-fetch';
import * as testers from 'utils/testers';
import { DIRECTIONS, TYPES } from '../constants';

export const getDfspHubEndpointsEndpoints = state => state.dfsp.endpoints.hub.dfspHubEndpoints;
export const getDfspHubEndpointsEndpointsError = state => state.dfsp.endpoints.hub.dfspHubEndpointsError;

export const getDfspHubEndpointsPerDirection = createSelector(
  getDfspHubEndpointsEndpoints,
  (endpoints, dfsps) => {
    const hasDirection = direction => endpoint => endpoint.direction === direction;
    const egress = endpoints.filter(hasDirection(DIRECTIONS.EGRESS));
    const ingressEndpoints = endpoints.filter(hasDirection(DIRECTIONS.INGRESS));
    const ingress = sortBy(ingressEndpoints, { type: TYPES.IP });
    return {
      egress,
      ingress,
    };
  }
);

const getIsendpointsReadPending = createPendingSelector('hubEndpoints.read');

export const getIsDfspHubEndpointsLoading = createSelector(
  getIsendpointsReadPending,
  testers.getAnyIs(true)
);
