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

import { createValidator, createValidation, vd } from 'modusbox-ui-components/dist/redux-validation';

const uniqueNameValidator = (name, isUnique) =>
  createValidator('Hub External CA name name must be unique', () => (name !== undefined ? isUnique : false));
const isRequiredIfNotSet = (depending, value) =>
  createValidator(`Required field when ${depending} is not set`, () => value !== undefined);

export const getHubExternalCaValidators = (name, isNameUnique, rootCertificate, intermediateChain) => {
  const validators = {
    name: createValidation([vd.isRequired, uniqueNameValidator(name, isNameUnique)]),
  };

  if (!rootCertificate) {
    validators.intermediateChain = createValidation([isRequiredIfNotSet('Root Certificate', intermediateChain)]);
  }
  if (!intermediateChain) {
    validators.rootCertificate = createValidation([isRequiredIfNotSet('Intermediate Chain', rootCertificate)]);
  }

  return validators;
};
