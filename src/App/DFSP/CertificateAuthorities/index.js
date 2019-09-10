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
import { Tab, Tabs, TabList, TabPanel, TabPanels } from 'components';
import DFSPCertificateAuthority from './DFSPCertificateAuthority';
import HUBCertificateAuthority from './HUBCertificateAuthority';
import HUBExternalCertificateAuthority from './HUBExternalCertificateAuthority';

const CertificateAuthorities = () => (
  <div>
    <Tabs>
      <TabList>
        <Tab>DFSP Certificate Authority</Tab>
        <Tab>HUB Certificate Authority</Tab>
        <Tab>HUB External Certificate Authority</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DFSPCertificateAuthority />
        </TabPanel>
        <TabPanel>
          <HUBCertificateAuthority />
        </TabPanel>
        <TabPanel>
          <HUBExternalCertificateAuthority />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);

export default CertificateAuthorities;
