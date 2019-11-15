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

import { RESET_TOTP, ACKNOWLEDGE_QR_SCAN, CHANGE_TOTP_CODE, UNSET_TOTP_CODE } from './actions';

const initialState = {
  isQrScanAcknowledged: false,
  code: undefined,
};

const Auth = handleActions(
  {
    [RESET_TOTP]: (state, action) => ({
      ...initialState,
    }),
    [ACKNOWLEDGE_QR_SCAN]: (state, action) => ({
      ...state,
      isQrScanAcknowledged: action.payload,
    }),
    [CHANGE_TOTP_CODE]: (state, action) => ({
      ...state,
      code: action.payload,
    }),
    [UNSET_TOTP_CODE]: (state, action) => ({
      ...state,
      code: initialState.code,
    }),
  },
  initialState
);

export default Auth;
export { initialState };
