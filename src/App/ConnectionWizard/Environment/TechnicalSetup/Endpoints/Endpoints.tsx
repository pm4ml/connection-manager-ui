import React, { FC } from 'react';
import { Tab, Tabs, TabList, TabPanel, TabPanels } from 'components';
import Egress from './Egress';
import Ingress from './Ingress';
import Hub from './Hub';

import './Endpoints.css';

interface EndpointsProps {}

const Endpoints: FC<EndpointsProps> = () => (
  <div className="endpoints">
    <Tabs>
      <TabList>
        <Tab>Egress Endpoints</Tab>
        <Tab>Ingress Endpoints</Tab>
        <Tab>Hub Endpoints</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Egress />
        </TabPanel>
        <TabPanel>
          <Ingress />
        </TabPanel>
        <TabPanel>
          <Hub />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
);
export default Endpoints;
