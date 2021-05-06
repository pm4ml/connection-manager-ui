import React from 'react';
import { Tab, Tabs, TabList, TabPanel, TabPanels } from 'components';
import OtherDFSPsJWS from './OtherDFSPsJWS/OtherDFSPsJWS';
import DFSPJWS from './DFSPJWS/DFSPJWS';

const DFSPJWSCertificates = () => (
  <div>
    <Tabs>
      <TabList>
        <Tab>DFSP JWS Certificates</Tab>
        <Tab>Other DFSPs JWS Certificates</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DFSPJWS />
        </TabPanel>
        <TabPanel>
          <OtherDFSPsJWS />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);

export default DFSPJWSCertificates;
