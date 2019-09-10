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

import React from 'react';
import { TYPES } from '../../constants';
import './EndpointEntry.css';

const EndpointDetail = ({ title, value }) => (
  <div className="endpoint__entry__detail">
    <span className="endpoint__entry__title">{title}:</span>
    <span className="endpoint__entry__value">{value}</span>
  </div>
);
const EndpointDetails = ({ type, value }) => {
  if (type === TYPES.IP) {
    return [
      <EndpointDetail title="IP" value={value.address} key="ip" />,
      <EndpointDetail title={`Port${value.ports.length > 1 ? 's' : ''}`} value={value.ports.join(', ')} key="ports" />,
    ];
  }
  return <EndpointDetail title="URL" value={value.url} />;
};

const EndpointEntry = ({ type, value }) => (
  <div className="endpoint__entry">
    <EndpointDetails type={type} value={value} />
  </div>
);

export default EndpointEntry;
