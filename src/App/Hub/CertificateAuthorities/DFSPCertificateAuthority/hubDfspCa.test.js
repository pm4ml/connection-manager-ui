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

import { fetchMock, MATCHED } from 'fetch-mock';
import prepareStore, { getStore } from 'tests/store';
import environments from 'tests/resources/environments.json';
import dfsps from 'tests/resources/dfsps.json';

import {
  resetHubDfspCas,
  setHubDfspCasError,
  setHubDfspCasCertificates,
  showHubDfspCasRootCertificateModal,
  hideHubDfspCasRootCertificateModal,
  showHubDfspCasIntermediateChainModal,
  hideHubDfspCasIntermediateChainModal,
  storeHubDfspCas,
} from './actions';

import { getHubDfspCasError, getHubDfspCasCertificates, getIsHubDfspCasRootCertificateModalVisible } from './selectors';

import { initialState } from './reducers';

let dispatch;
let getState;

describe('Test the hub dfsps ca actions', () => {
  beforeEach(async () => {
    const store = getStore();
    ({ dispatch, getState } = store);
  });

  it('Should reset the reducers', () => {
    dispatch(resetHubDfspCas());
    expect(getState().hub.ca.dfsps).toEqual(initialState);
  });

  it('Should set the error', () => {
    dispatch(setHubDfspCasError('ERROR'));
    expect(getHubDfspCasError(getState())).toBe('ERROR');
  });

  it('Should set the root cert', () => {
    dispatch(setHubDfspCasCertificates('ROOT_CERT'));
    expect(getHubDfspCasCertificates(getState())).toBe('ROOT_CERT');
  });

  it('Should show the root certificate modal', () => {
    dispatch(showHubDfspCasRootCertificateModal());
    expect(getIsHubDfspCasRootCertificateModalVisible(getState())).toBe(true);
  });

  it('Should hide the root certificate modal', () => {
    dispatch(hideHubDfspCasRootCertificateModal());
    expect(getIsHubDfspCasRootCertificateModalVisible(getState())).toBe(false);
  });
});

describe('Test the hub dfsps ca thunk actions', () => {
  const fetchResponse = {
    certificate: 'ROOT_CERT',
  };

  beforeEach(async () => {
    const store = prepareStore({ environments, environmentId: environments[0].id, dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should store the hub dfsps ca', async () => {
    fetchMock.get('end:/ca', fetchResponse);
    await dispatch(storeHubDfspCas());
    expect(fetchMock.calls(MATCHED)).toHaveLength(dfsps.length);
    expect(getHubDfspCasCertificates(getState())).toHaveLength(dfsps.length);
  });

  it('Should set the error when read operation is not successful', async () => {
    fetchMock.get('end:/ca', 500);
    await dispatch(storeHubDfspCas());
    expect(fetchMock.calls(MATCHED)).toHaveLength(dfsps.length);
    expect(getHubDfspCasError(getState())).toBe('Generic');
  });
});
