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

import _isEqual from 'lodash/isEqual';

const getAnyIs = value => (...args) => args.some(arg => arg === value);
const getAllAre = value => (...args) => args.every(arg => arg === value);
const getAnyIsDefined = (...args) => args.some(isDefined);

const isDefined = value => value !== undefined;
const isUndefined = value => value === undefined;
const isEqual = (a, b) => _isEqual(a, b);
const isNotEqual = (a, b) => !_isEqual(a, b);
const isNil = value => value === undefined || value === null;
const isNotNil = value => value !== undefined && value !== null;

/*Arrays*/
const isNotEmptyCollection = collection => collection.length > 0;
const not = {};

export {
  getAnyIs,
  getAllAre,
  getAnyIsDefined,
  isNotEqual,
  isDefined,
  isNil,
  isNotNil,
  isUndefined,
  isEqual,
  isNotEmptyCollection,
  not,
};
