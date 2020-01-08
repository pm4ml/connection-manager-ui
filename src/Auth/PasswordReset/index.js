import React from 'react';
import { connect } from 'react-redux';
import { Button, FormInput, MessageBox } from 'components';
import { withMount } from 'utils/hocs';
import './PasswordReset.scss';

import {
  getPasswordResetOldPassword,
  getPasswordResetNewPassword,
  getPasswordResetConfirmPassword,
  getIsPasswordResetPending,
  getPasswordResetError,
  getIsPasswordResetSubmitEnabled,
  getValidationResult,
} from './selectors';

import {
  changePasswordResetOldPassword,
  changePasswordResetNewPassword,
  changePasswordResetConfirmPassword,
  changePassword,
  redirectIfNotFirstTimeLogin,
} from './actions';

const PasswordReset = ({
  oldPassword,
  newPassword,
  confirmPassword,
  validation,
  error,
  isSubmitEnabled,
  isAuthFailed,
  isAuthPending,
  onOldPasswordReset,
  onNewPasswordReset,
  onConfirmPasswordReset,
  onPasswordResetClick,
}) => (
  <div className="auth">
    <div className="auth__form">
      {isAuthFailed && <MessageBox icon="warning-sign" kind="error" message={error} size={16} fontSize={14} />}

      <div className="auth__form__password">
        <FormInput
          type="password"
          placeholder="Old Password"
          value={oldPassword}
          onChange={onOldPasswordReset}
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
          onChange={onNewPasswordReset}
          validation={validation.fields.newPassword}
          disabled={isAuthPending}
        />
      </div>

      <div className="auth__form__password">
        <FormInput
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={onConfirmPasswordReset}
          validation={validation.fields.confirmPassword}
          disabled={isAuthPending}
        />
      </div>
      <div className="auth__form__submit">
        <Button
          kind="primary"
          label="Change Password"
          className="auth__form__submit__btn"
          disabled={!isSubmitEnabled}
          onClick={onPasswordResetClick}
          pending={isAuthPending}
        />
      </div>
    </div>
  </div>
);

const stateProps = state => ({
  oldPassword: getPasswordResetOldPassword(state),
  newPassword: getPasswordResetNewPassword(state),
  confirmPassword: getPasswordResetConfirmPassword(state),
  validation: getValidationResult(state),
  error: getPasswordResetError(state),
  isAuthPending: getIsPasswordResetPending(state),
  isSubmitEnabled: getIsPasswordResetSubmitEnabled(state),
});
const actionProps = dispatch => ({
  onOldPasswordReset: oldPassword => dispatch(changePasswordResetOldPassword(oldPassword)),
  onNewPasswordReset: newPassword => dispatch(changePasswordResetNewPassword(newPassword)),
  onConfirmPasswordReset: confirmPassword => dispatch(changePasswordResetConfirmPassword(confirmPassword)),
  onPasswordResetClick: () => dispatch(changePassword()),
  onMount: () => dispatch(redirectIfNotFirstTimeLogin()),
});

const MountedPasswordReset = withMount(PasswordReset, 'onMount');

export default connect(
  stateProps,
  actionProps
)(MountedPasswordReset);
