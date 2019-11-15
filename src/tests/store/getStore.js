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

import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import fetchMiddleware from 'modusbox-ui-components/dist/redux-fetch';
import history from '../dummy/history';
import reducer from 'reducers';

const historyMock = new history();

const ReduxRouter = routerMiddleware(historyMock);
const ReduxFetch = fetchMiddleware();

const getStore = (initialState = undefined) => {
  const middlewares = applyMiddleware(ReduxThunk, ReduxFetch, ReduxRouter);
  return createStore(reducer(historyMock), initialState, middlewares);
};

export default getStore;
export { historyMock };
