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

import fetchMock from 'fetch-mock';
// import partners from '../json/partners.json';

const prepareFetch = () => {
  //fetchMock.get('end:tpm/api/partners', partners);
  // fetchMock.get('express:tpm/api/partners/partnerships/:partnershipId/:resource', function(url){
  //   const regex = /^tpm\/api\/partners\/partnerships\/([a-f0-9\-]+)\/([a-zA-Z]+)$/;
  //   url.match(regex)
  //   console.log(url.match(regex))
  //   return partners;
  // })

  fetchMock.get('*', url => {
    const queryPosition = url.indexOf('?');
    const filename = url
      .substring(0, queryPosition !== -1 ? queryPosition : url.length)
      .replace('tpm/api', '../json')
      .concat('.json');

    try {
      const file = require(filename);
      return JSON.stringify(file);
    } catch (e) {
      return '{}';
    }
  });
  return fetchMock;
};

export default prepareFetch;
