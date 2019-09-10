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

import getStore, { historyMock } from './getStore';

import { setEnvironments, setEnvironmentId, setDfsps, setDfspId } from 'App/actions';

const prepareStore = ({ url, environments, environmentId, dfsps, dfspId }) => {
  // Create the store
  const store = getStore();

  if (environments) {
    store.dispatch(setEnvironments(environments));
  }

  if (environmentId) {
    store.dispatch(setEnvironmentId(environmentId));
  }

  if (dfsps) {
    store.dispatch(setDfsps(dfsps));
  }

  if (dfspId) {
    store.dispatch(setDfspId(dfspId));
  }

  if (url) {
    // when we want to test programatic route changes and redirections
    // it can be useful to set the history location to a specific url
    historyMock.set(url);
  }

  return store;
};

export default prepareStore;
