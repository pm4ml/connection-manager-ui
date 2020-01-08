import { createSelector } from 'reselect';
import { getIsValid, toValidationResult } from '@modusbox/modusbox-ui-components/dist/redux-validation';
import { createPendingSelector } from '@modusbox/modusbox-ui-components/dist/redux-fetch';
import { getPasswordResetValidators } from './validators';
import { getPassword } from '../selectors';

export const getPasswordResetOldPassword = state => state.auth.passwordReset.oldPassword;
export const getPasswordResetNewPassword = state => state.auth.passwordReset.newPassword;
export const getPasswordResetConfirmPassword = state => state.auth.passwordReset.confirmPassword;
export const getPasswordResetError = state => state.auth.passwordReset.error;

const getPasswordResetModel = createSelector(
  getPasswordResetOldPassword,
  getPasswordResetNewPassword,
  getPasswordResetConfirmPassword,
  (oldPassword, newPassword, confirmPassword) => ({
    oldPassword,
    newPassword,
    confirmPassword,
  })
);

const getPasswordResetValidation = createSelector(
  getPassword,
  getPasswordResetNewPassword,
  getPasswordResetValidators
);

export const getValidationResult = createSelector(
  getPasswordResetModel,
  getPasswordResetValidation,
  toValidationResult
);

export const getIsPasswordResetSubmitEnabled = createSelector(
  getValidationResult,
  getIsValid
);

export const getIsPasswordResetPending = createPendingSelector('passwordReset.create');
