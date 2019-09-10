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

import { fetchMock } from 'fetch-mock';
import prepareStore, { getStore, historyMock } from 'tests/store';
import environments from 'tests/resources/environments.json';
import dfsps from 'tests/resources/dfsps.json';

import { setDfspLoading, unsetDfspLoading, initDfsp } from './actions';

import { getIsDfspLoading } from './selectors';

let dispatch;
let getState;

describe('Test the dfsp actions', () => {
  beforeEach(() => {
    const store = getStore();
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should set the dfsp loading', () => {
    dispatch(setDfspLoading());
    expect(getIsDfspLoading(getState())).toBe(true);
  });

  it('Should unset the dfsp loading', () => {
    dispatch(unsetDfspLoading());
    expect(getIsDfspLoading(getState())).toBe(false);
  });
});

describe('Test the dfsp thunk actions', () => {
  beforeEach(() => {
    historyMock.restore();
    fetchMock.restore();
    fetchMock.get('*', 404);
  });

  it('Should redirect to root when environment is not set', async () => {
    const store = prepareStore({ environments, dfsps, url: '/test' });
    ({ dispatch, getState } = store);
    await dispatch(initDfsp());
    expect(historyMock.push).toHaveBeenCalledWith('/');
    expect(getIsDfspLoading(getState())).toBe(false);
    expect(fetchMock.calls()).toHaveLength(0);
  });

  it('Should initialize the DFSP app', async () => {
    const store = prepareStore({ environments, dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);
    await dispatch(initDfsp());
    expect(historyMock.push).not.toHaveBeenCalled();
    expect(fetchMock.calls()).not.toHaveLength(0);
    expect(getIsDfspLoading(getState())).toBe(false);
  });
});
