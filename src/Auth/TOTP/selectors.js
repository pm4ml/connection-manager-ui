import { createSelector } from 'reselect';
import { getIsValid, toValidationResult } from '@modusbox/modusbox-ui-components/dist/redux-validation';
import { createPendingSelector } from '@modusbox/modusbox-ui-components/dist/redux-fetch';
import { getTotpValidation } from './validators';

export const getIsQrScanAcknowledged = state => state.auth.totp.isQrScanAcknowledged;
export const getCode = state => state.auth.totp.code;

const getCodeModel = createSelector(getCode, code => ({ code }));
export const getValidationResult = createSelector(getCodeModel, getTotpValidation, toValidationResult);

export const getIsTotpSubmitEnabled = createSelector(getValidationResult, getIsValid);

export const getIsTotpPending = createPendingSelector('login2step.create');
