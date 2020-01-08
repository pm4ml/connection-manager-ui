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
  getAuthMessage,
  getAuthMessageType,
  getIsAuthSubmitEnabled,
  getValidationResult,
} from './selectors';

import { changeUsername, changePassword, login, unsetLoginFields } from './actions';

const Auth = ({
  username,
  password,
  validation,
  message,
  messageType,
  successMessage,
  isSubmitEnabled,
  isAuthFailed,
  isAuthPending,
  onUsernameChange,
  onPasswordChange,
  onLoginClick,
}) => (
  <div className="auth">
    <div className="auth__form">
      {message && (
        <MessageBox
          icon={messageType === 'success' ? 'check-small' : 'warning-sign'}
          kind={messageType === 'success' ? 'success' : 'danger'}
          message={message}
          size={16}
          fontSize={14}
          className="auth__form__message-box"
        />
      )}

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
  message: getAuthMessage(state),
  messageType: getAuthMessageType(state),
  isAuthPending: getIsAuthPending(state),
  isAuthFailed: getIsAuthFailed(state),
  isSubmitEnabled: getIsAuthSubmitEnabled(state),
});
const actionProps = dispatch => ({
  onUsernameChange: username => dispatch(changeUsername(username)),
  onPasswordChange: password => dispatch(changePassword(password)),
  onLoginClick: () => dispatch(login()),
  onMount: () => dispatch(unsetLoginFields()),
});

const MountedAuth = withMount(Auth, 'onMount');

export default connect(
  stateProps,
  actionProps
)(MountedAuth);
