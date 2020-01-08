import { createValidator, createValidation, vd } from '@modusbox/modusbox-ui-components/dist/redux-validation';

const oldPasswordValidator = match =>
  createValidator('It must match the old password', value => (value !== undefined ? value === match : false));

const newPasswordValidator = match =>
  createValidator('It must match the new password', value => (value !== undefined ? value === match : false));

const minLen = length =>
  createValidator(`It must be at least ${length} characters long`, value =>
    value !== undefined ? value.length >= length : false
  );

const getPasswordResetValidators = (oldPassword, newPassword) => ({
  oldPassword: createValidation([vd.isRequired, oldPasswordValidator(oldPassword)]),
  newPassword: createValidation([vd.isRequired, minLen(5)]),
  confirmPassword: createValidation([vd.isRequired, newPasswordValidator(newPassword)]),
});

export { getPasswordResetValidators };
