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
  resetDfspSentCsrs,
  setDfspSentCsrsError,
  setDfspSentCsrsFilter,
  setDfspSentCsrsCertificates,
  showDfspSentCsrsCertificateModal,
  hideDfspSentCsrsCertificateModal,
  storeDfspSentCsrs,
} from './actions';

import {
  getDfspSentCsrsError,
  getDfspSentCsrsFilter,
  getDfspSentCsrsCertificates,
  getIsDfspSentCsrsCertificateModalVisible,
  getDfspSentCsrsCertificateModalContent,
  getDfspSentCsrsCertificateModalTitle,
  getIsDfspSentCsrsPending,
  getFilteredDfspSentCsrsCertificates,
} from './selectors';

import { getIsSuccessToastVisible, getIsErrorModalVisible } from 'App/selectors';
import { initialState } from './reducers';

// TODO: Test loading a file programmatically

let dispatch;
let getState;

describe('Test the dfsp ca actions', () => {
  beforeEach(async () => {
    const store = getStore();
    ({ dispatch, getState } = store);
  });

  it('Should reset the reducers', () => {
    dispatch(resetDfspSentCsrs());
    expect(getState().dfsp.tls.client.csrs).toEqual(initialState);
  });

  it('Should set the error', () => {
    dispatch(setDfspSentCsrsError('ERROR'));
    expect(getDfspSentCsrsError(getState())).toBe('ERROR');
  });

  it('Should set the CSR', () => {
    dispatch(setDfspSentCsrsCertificates([]));
    expect(getDfspSentCsrsCertificates(getState())).toEqual([]);
  });

  it('Should set the filter', () => {
    dispatch(setDfspSentCsrsFilter('TEST'));
    expect(getDfspSentCsrsFilter(getState())).toBe('TEST');
  });

  /*it('Should set the validations', () => {
    dispatch(setDfspSentCsrsValidations([]));
    expect(getDfspSentCsrsValidations(getState())).toEqual([]);
  });

  it('Should set the validation state', () => {
    dispatch(setDfspSentCsrsValidationState('VALID'));
    expect(getDfspSentCsrsValidationState(getState())).toBe('VALID');
  });*/

  it('Should show the CSR modal', () => {
    dispatch(showDfspSentCsrsCertificateModal({ certificate: 'CERT', title: 'title' }));
    expect(getIsDfspSentCsrsCertificateModalVisible(getState())).toBe(true);
    expect(getDfspSentCsrsCertificateModalContent(getState())).toBe('CERT');
    expect(getDfspSentCsrsCertificateModalTitle(getState())).toBe('title');
  });

  it('Should hide the CSR modal', () => {
    dispatch(hideDfspSentCsrsCertificateModal());
    expect(getIsDfspSentCsrsCertificateModalVisible(getState())).toBe(false);
    expect(getDfspSentCsrsCertificateModalContent(getState())).toBe(undefined);
    expect(getDfspSentCsrsCertificateModalTitle(getState())).toBe(undefined);
  });
});

describe('Test the dfsp csr thunk actions', () => {
  const response = [
    {
      csr: 'CSR_CERT',
    },
  ];

  beforeEach(async () => {
    const store = prepareStore({ environments, environmentId: environments[0].id, dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should submit the dfsp csr', async () => {
    fetchMock.get('end:/enrollments/inbound', response);
    await dispatch(storeDfspSentCsrs());
    expect(fetchMock.calls(MATCHED)).toHaveLength(1);
    expect(getDfspSentCsrsCertificates(getState())).toEqual(response);
  });

  it('Should show the error modal when the submit fails', async () => {
    fetchMock.get('end:/enrollments/inbound', 500);
    await dispatch(storeDfspSentCsrs());
    expect(fetchMock.calls(MATCHED)).toHaveLength(1);
    expect(getDfspSentCsrsError(getState())).toBe('Generic');
  });
});

describe('Test the api pending selectors', () => {
  const response = [
    {
      csr: 'CSR_CERT',
    },
  ];

  beforeEach(async () => {
    const store = prepareStore({ environments, environmentId: environments[0].id, dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should detect the api is pending when reading', () => {
    fetchMock.get('end:/enrollments/inbound', response);
    dispatch(storeDfspSentCsrs());
    expect(getIsDfspSentCsrsPending(getState())).toBe(true);
  });

  it('Should detect the api is not pending when finished reading', async () => {
    fetchMock.get('end:/enrollments/inbound', response);
    await dispatch(storeDfspSentCsrs());
    expect(getIsDfspSentCsrsPending(getState())).not.toBe(true);
  });
});
