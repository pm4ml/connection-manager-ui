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

const getConfig = async () => {
  const { REACT_APP_API_BASE_URL } = process.env;
  const { protocol, host } = window.location;

  // Using the same protocol as we've been loaded from to avoid Mixed Content error.
  let apiBaseUrl = REACT_APP_API_BASE_URL ? REACT_APP_API_BASE_URL : `${protocol}//localhost:3001`;
  let isAuthEnabled = true;
  const infos = [`fetching ${protocol}//${host}/config`];

  try {
    const response = await fetch(`${protocol}//${host}/config`);
    const { AUTH_ENABLED, API_BASE_URL } = await response.json();

    isAuthEnabled = AUTH_ENABLED ? AUTH_ENABLED !== 'FALSE' : isAuthEnabled;
    apiBaseUrl = API_BASE_URL ? API_BASE_URL : apiBaseUrl;

    infos.push({ AUTH_ENABLED, API_BASE_URL });
    infos.push(`- after processing config, apiBaseUrl: ${apiBaseUrl}`);
  } catch (err) {
    infos.push('returned error:');
    infos.push(err);
    infos.push(`- calling boot() without loading config.`);
  }

  console.info(...infos);

  return { apiBaseUrl, isAuthEnabled };
};

export default getConfig;
