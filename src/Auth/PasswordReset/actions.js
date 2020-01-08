import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';
import api from 'utils/api';
import { is204 } from 'utils/http';
import { getPasswordResetNewPassword } from './selectors';
import { getUsername, getUserGuid } from '../selectors';
import { setAuthError, setAuthSuccess } from '../actions';

export const SET_PASSWORD_RESET_ERROR = 'Auth / Set Error';
export const CHANGE_PASSWORD_RESET_OLD_PASSWORD = 'Password Change / Change Old Password';
export const CHANGE_PASSWORD_RESET_NEW_PASSWORD = 'Password Change / Change New Password';
export const CHANGE_PASSWORD_RESET_CONFIRM_PASSWORD = 'Password Change / Change Confirm Password';

export const changePasswordResetOldPassword = createAction(CHANGE_PASSWORD_RESET_OLD_PASSWORD);
export const changePasswordResetNewPassword = createAction(CHANGE_PASSWORD_RESET_NEW_PASSWORD);
export const changePasswordResetConfirmPassword = createAction(CHANGE_PASSWORD_RESET_CONFIRM_PASSWORD);
export const setPasswordResetAuthError = createAction(SET_PASSWORD_RESET_ERROR);

export const changePassword = () => async (dispatch, getState) => {
  const body = {
    username: getUsername(getState()),
    newPassword: getPasswordResetNewPassword(getState()),
    userguid: getUserGuid(getState()),
  };
  const { status } = await dispatch(api.passwordReset.create({ body }));
  if (is204(status)) {
    dispatch(setAuthSuccess('Password successfully changed'));
    dispatch(push('/login'));
  } else {
    dispatch(push('/'));
    dispatch(setAuthError('Password reset failed'));
  }
};

export const redirectIfNotFirstTimeLogin = () => (dispatch, getState) => {
  if (!getUserGuid(getState())) {
    dispatch(push('/login'));
  }
};
