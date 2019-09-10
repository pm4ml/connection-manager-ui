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

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import ReduxThunk from 'redux-thunk';
import fetchMiddleware from 'modusbox-ui-components/dist/redux-fetch';
import reducers from '../reducers';

export default function configureStore(history, config) {
  const { isDevelopment, isAuthEnabled } = config;
  const ReduxRouter = routerMiddleware(history);
  const ReduxFetch = fetchMiddleware();

  const middlewareList = [ReduxThunk, ReduxRouter, ReduxFetch];
  let composers = [];

  if (isDevelopment) {
    // add devTool composer
    const devToolsComposer = window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f;
    composers.push(devToolsComposer);
  }

  composers.unshift(applyMiddleware(...middlewareList));
  const middlewares = compose(...composers);

  return createStore(reducers(history, isAuthEnabled), undefined, middlewares);
}
