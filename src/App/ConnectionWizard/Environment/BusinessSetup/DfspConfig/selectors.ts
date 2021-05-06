import { createSelector } from 'reselect';
import { State } from 'store/types';
import { ValidationResults } from 'App/types';
import { DFSP } from 'App/ConnectionWizard/Environment/Main/types';

import { toValidationResult } from '@modusbox/modusbox-ui-components/dist/redux-validation';
import { getDfspConfigValidation } from './validators';

export const getDfspConfig = (state: State) => state.wizard.environment.main.dfsp;
export const getDfspConfigError = (state: State) => state.wizard.environment.main.dfspError;

export const DfspModelValidationResult = createSelector<
  State,
  DFSP | undefined,
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  any,
  ValidationResults
>(getDfspConfig, getDfspConfigValidation, toValidationResult);
