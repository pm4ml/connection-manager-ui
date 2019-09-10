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
import HUBCertificateAuthority from './HUBCertificateAuthority';
import HUBExternalCertificateAuthority from './HUBExternalCertificateAuthority';
import DFSPCertificateAuthority from './DFSPCertificateAuthority';

import { getIsHubCaMissing } from 'App/Hub/CertificateAuthorities/HUBCertificateAuthority/selectors';
import { getIsHubExternalCasMissing } from 'App/Hub/CertificateAuthorities/HUBExternalCertificateAuthority/selectors';

const stateProps = state => ({
  isHubCaMissing: getIsHubCaMissing(state),
  isHubExternalCasMissing: getIsHubExternalCasMissing(state),
});

const CertificateAuthorities = ({ isHubCaMissing, isHubExternalCasMissing }) => (
  <div>
    <Tabs>
      <TabList>
        <Tab>
          <Row align="center">
            {isHubCaMissing && <Icon size={8} name="circle" className="hub-tls__notification-icon" />}
            HUB Certificate Authority
          </Row>
        </Tab>
        <Tab>
          <Row align="center">
            {isHubExternalCasMissing && <Icon size={8} name="circle" className="hub-tls__notification-icon" />}
            HUB External Certificate Authority
          </Row>
        </Tab>
        <Tab>DFSP Certificate Authority</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <HUBCertificateAuthority />
        </TabPanel>
        <TabPanel>
          <HUBExternalCertificateAuthority />
        </TabPanel>
        <TabPanel>
          <DFSPCertificateAuthority />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);

export default connect(
  stateProps,
  null
)(CertificateAuthorities);
