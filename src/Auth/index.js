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

import React from 'react';
import { connect } from 'react-redux';
import { Button, FormInput, MessageBox } from 'components';
import { withMount } from 'utils/hocs';
import './Auth.scss';

import {
  getUsername,
  getPassword,
  getIsAuthPending,
  getIsAuthFailed,
  getAuthError,
  getIsAuthSubmitEnabled,
  getValidationResult,
} from './selectors';

import { changeUsername, changePassword, login, unsetAuthQRProps } from './actions';

const Auth = ({
  username,
  password,
  validation,
  error,
  isSubmitEnabled,
  isAuthFailed,
  isAuthPending,
  onUsernameChange,
  onPasswordChange,
  onLoginClick,
}) => (
  <div className="auth">
    <div className="auth__form">
      {isAuthFailed && <MessageBox icon="warning-sign" kind="error" message={error} size={16} fontSize={14} />}

      <div className="auth__form__username">
        <FormInput
          type="text"
          placeholder="Username"
          value={username}
          onChange={onUsernameChange}
          validation={validation.fields.username}
          disabled={isAuthPending}
          autofocus={true}
        />
      </div>
      <div className="auth__form__password">
        <FormInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordChange}
          validation={validation.fields.password}
          disabled={isAuthPending}
        />
      </div>
      <div className="auth__form__submit">
        <Button
          kind="primary"
          label="Login"
          className="auth__form__submit__btn"
          disabled={!isSubmitEnabled}
          onClick={onLoginClick}
          pending={isAuthPending}
        />
      </div>
    </div>
  </div>
);

const stateProps = state => ({
  username: getUsername(state),
  password: getPassword(state),
  validation: getValidationResult(state),
  error: getAuthError(state),
  isAuthPending: getIsAuthPending(state),
  isAuthFailed: getIsAuthFailed(state),
  isSubmitEnabled: getIsAuthSubmitEnabled(state),
});
const actionProps = dispatch => ({
  onUsernameChange: username => dispatch(changeUsername(username)),
  onPasswordChange: password => dispatch(changePassword(password)),
  onLoginClick: () => dispatch(login()),
  onMount: () => dispatch(unsetAuthQRProps()),
});

const MountedAuth = withMount(Auth, 'onMount');

export default connect(
  stateProps,
  actionProps
)(MountedAuth);
