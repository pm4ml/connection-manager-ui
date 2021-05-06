import React, { FC } from 'react';
import { State } from 'store/types';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel, TabPanels } from 'components';
import CSR from './CSR';
import SentCSRs from './SentCSRs';
import HubCSRs from './HubCSRs';

import './TLSClient.css';

import { getDfspHasUnsignedHubCsrs } from './HubCSRs/selectors';

const stateProps = (state: State) => ({
  hasUnsignedCsrs: getDfspHasUnsignedHubCsrs(state),
});

interface TLSClientProps {
  hasUnsignedCsrs: boolean;
}
const TLSClient: FC<TLSClientProps> = ({ hasUnsignedCsrs }) => (
  <div className="dfsp-tls">
    <Tabs>
      <TabList>
        <Tab>CSR</Tab>
        <Tab>Sent CSRs</Tab>
        {/* To be enabled later */}
        {/* <Tab>
          <Row align="center">
            {hasUnsignedCsrs && (
              <Icon size={8} name="circle" className="dfsp-tls__notification-icon" />
            )}
            Unprocessed Hub CSRs
          </Row>
        </Tab> */}
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

export default connect(stateProps)(TLSClient);
