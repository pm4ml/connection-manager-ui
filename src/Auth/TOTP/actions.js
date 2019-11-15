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

import { createAction } from 'redux-actions';
import { replace } from 'connected-react-router';
import api from 'utils/api';
import { is200, is401, is500 } from 'utils/http';
import { setAuthToken, setAuthError, resetCredentials } from '../actions';
import { getUsername, getPassword } from '../selectors';
import { getCode } from './selectors';
import { TOTP_MESSAGES } from './constants';

export const RESET_TOTP = 'Totp / Reset';
export const ACKNOWLEDGE_QR_SCAN = 'Totp / ACKNOWLEDGE QR Scan';
export const CHANGE_TOTP_CODE = 'Totp / Change Code';
export const UNSET_TOTP_CODE = 'Totp / Usnet Code';

export const resetTotp = createAction(RESET_TOTP);
export const acknowledgeQRScan = createAction(ACKNOWLEDGE_QR_SCAN);
export const changeTotpCode = createAction(CHANGE_TOTP_CODE);
export const unsetTotpCode = createAction(UNSET_TOTP_CODE);

export const toptLogin = () => async (dispatch, getState) => {
  const body = {
    generatedToken: getCode(getState()),
    username: getUsername(getState()),
    password: getPassword(getState()),
  };
  let error;
  let token;
  try {
    const { data, status } = await dispatch(api.login2step.create({ body }));
    if (is200(status)) {
      token = data.token.payload;
    } else if (is500(status)) {
      error = TOTP_MESSAGES.SERVER_ERROR;
    } else if (is401(status)) {
      error = TOTP_MESSAGES.UNAUTHENTICATED;
    }
  } catch (e) {
    error = TOTP_MESSAGES.SERVER_ERROR;
  }

  if (!error && !token) {
    error = TOTP_MESSAGES.SERVER_ERROR;
  }
  if (error) {
    dispatch(setAuthError(error));
    dispatch(replace('/login'));
  } else {
    dispatch(resetCredentials());
    dispatch(setAuthToken(token));
    dispatch(replace('/'));
  }
};

export const setup2fa = () => async (dispatch, getState) => {
  dispatch(resetTotp());
  if (!getUsername(getState()) || !getPassword(getState())) {
    dispatch(replace('/login'));
  }
};
