import { handleActions } from 'redux-actions';

import {
  CHANGE_PASSWORD_RESET_OLD_PASSWORD,
  CHANGE_PASSWORD_RESET_NEW_PASSWORD,
  CHANGE_PASSWORD_RESET_CONFIRM_PASSWORD,
  SET_PASSWORD_RESET_ERROR,
} from './actions';

const initialState = {
  oldPassword: undefined,
  newPassword: undefined,
  confirmPassword: undefined,
  // load from the localstorage for refresh purposes
  isFailed: false,
  error: undefined,
};

const PasswordReset = handleActions(
  {
    [CHANGE_PASSWORD_RESET_OLD_PASSWORD]: (state, action) => ({
      ...state,
      oldPassword: action.payload,
      isFailed: false,
    }),
    [CHANGE_PASSWORD_RESET_NEW_PASSWORD]: (state, action) => ({
      ...state,
      newPassword: action.payload,
      isFailed: false,
    }),
    [CHANGE_PASSWORD_RESET_CONFIRM_PASSWORD]: (state, action) => ({
      ...state,
      confirmPassword: action.payload,
      isFailed: false,
    }),
    [SET_PASSWORD_RESET_ERROR]: (state, action) => ({
      ...state,
      error: action.payload,
      isFailed: true,
    }),
  },
  initialState
);

export default PasswordReset;
export { initialState };
