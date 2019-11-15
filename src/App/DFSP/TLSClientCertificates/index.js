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
import { connect } from 'react-redux';
import { Icon, Row, Tab, Tabs, TabList, TabPanel, TabPanels } from 'components';
import CSR from './CSR';
import SentCSRs from './SentCSRs';
import HubCSRs from './HubCSRs';
import './index.css';

import { getDfspHasUnsignedHubCsrs } from 'App/DFSP/TLSClientCertificates/HubCSRs/selectors';

const stateProps = state => ({
  hasUnsignedCsrs: getDfspHasUnsignedHubCsrs(state),
});

const TLSClientCertificates = ({ hasUnsignedCsrs, hasUnvalidatedCsrs }) => (
  <div>
    <Tabs>
      <TabList>
        <Tab>CSR</Tab>
        <Tab>Sent CSRs</Tab>
        <Tab>
          <Row align="center">
            {hasUnsignedCsrs && <Icon size={8} name="circle" className="dfsp-tls__notification-icon" />}
            Unprocessed Hub CSRs
          </Row>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CSR />
        </TabPanel>
        <TabPanel>
          <SentCSRs />
        </TabPanel>
        <TabPanel>
          <HubCSRs />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);

export default connect(
  stateProps,
  null
)(TLSClientCertificates);
