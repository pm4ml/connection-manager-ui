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

import { handleActions } from 'redux-actions';

import {
  CHANGE_PASSWORD_CHANGE_OLD_PASSWORD,
  CHANGE_PASSWORD_CHANGE_NEW_PASSWORD,
  CHANGE_PASSWORD_CHANGE_CONFIRM_PASSWORD,
  SET_PASSWORD_CHANGE_ERROR,
} from './actions';

const initialState = {
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
  // load from the localstorage for refresh purposes
  isFailed: false,
  error: undefined,
};

const PasswordChange = handleActions(
  {
    [CHANGE_PASSWORD_CHANGE_OLD_PASSWORD]: (state, action) => ({
      ...state,
      oldPassword: action.payload,
      isFailed: false,
    }),
    [CHANGE_PASSWORD_CHANGE_NEW_PASSWORD]: (state, action) => ({
      ...state,
      newPassword: action.payload,
      isFailed: false,
    }),
    [CHANGE_PASSWORD_CHANGE_CONFIRM_PASSWORD]: (state, action) => ({
      ...state,
      confirmPassword: action.payload,
      isFailed: false,
    }),
    [SET_PASSWORD_CHANGE_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
      isFailed: true,
    }),
  },
  initialState
);

export default PasswordChange;
export { initialState };
