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
import './PasswordChange.scss';

import {
  getPasswordChangeOldPassword,
  getPasswordChangeNewPassword,
  getPasswordChangeConfirmPassword,
  getIsPasswordChangePending,
  getPasswordChangeError,
  getIsPasswordChangeSubmitEnabled,
  getValidationResult,
} from './selectors';

import {
  changePasswordChangeOldPassword,
  changePasswordChangeNewPassword,
  changePasswordChangeConfirmPassword,
  changePassword,
} from './actions';

const PasswordChange = ({
  oldPassword,
  newPassword,
  confirmPassword,
  validation,
  error,
  isSubmitEnabled,
  isAuthFailed,
  isAuthPending,
  onOldPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onPasswordChangeClick,
}) => (
  <div className="auth">
    <div className="auth__form">
      {isAuthFailed && <MessageBox icon="warning-sign" kind="error" message={error} size={16} fontSize={14} />}

      <div className="auth__form__password">
        <FormInput
          type="text"
          placeholder="Old Password"
          value={oldPassword}
          onChange={onOldPasswordChange}
          validation={validation.fields.oldPassword}
          disabled={isAuthPending}
          autofocus={true}
        />
      </div>
      <div className="auth__form__password">
        <FormInput
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={onNewPasswordChange}
          validation={validation.fields.newPassword}
          disabled={isAuthPending}
        />
      </div>

      <div className="auth__form__password">
        <FormInput
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          validation={validation.fields.confirmPassword}
          disabled={isAuthPending}
        />
      </div>
      <div className="auth__form__submit">
        <Button
          kind="primary"
          label="Login"
          className="auth__form__submit__btn"
          disabled={!isSubmitEnabled}
          onClick={onPasswordChangeClick}
          pending={isAuthPending}
        />
      </div>
    </div>
  </div>
);

const stateProps = state => ({
  oldPassword: getPasswordChangeOldPassword(state),
  newPassword: getPasswordChangeNewPassword(state),
  confirmPassword: getPasswordChangeConfirmPassword(state),
  validation: getValidationResult(state),
  error: getPasswordChangeError(state),
  isAuthPending: getIsPasswordChangePending(state),
  isSubmitEnabled: getIsPasswordChangeSubmitEnabled(state),
});
const actionProps = dispatch => ({
  onOldPasswordChange: oldPassword => dispatch(changePasswordChangeOldPassword(oldPassword)),
  onNewPasswordChange: newPassword => dispatch(changePasswordChangeNewPassword(newPassword)),
  onConfirmPasswordChange: confirmPassword => dispatch(changePasswordChangeConfirmPassword(confirmPassword)),
  onPasswordChangeClick: () => dispatch(changePassword()),
});

export default connect(
  stateProps,
  actionProps
)(PasswordChange);
