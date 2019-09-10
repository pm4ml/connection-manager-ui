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

const is200 = statusCode => statusCode === 200;
const is204 = statusCode => statusCode === 204;
const is400 = statusCode => statusCode === 400;
const is422 = statusCode => statusCode === 422;
const is401 = statusCode => statusCode === 401;
const is404 = statusCode => statusCode === 404;
const is500 = statusCode => statusCode === 500;
const is20x = statusCode => statusCode >= 200 && statusCode <= 299;

export { is200, is204, is20x, is400, is401, is404, is422, is500 };
