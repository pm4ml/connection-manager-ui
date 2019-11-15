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
import { withRouter } from 'react-router-dom';
import { Menu, MenuItem, MenuSection } from 'components';
import { getMenuIcons } from './selectors';

const stateProps = state => ({
  icons: getMenuIcons(state),
});

const MenuStructure = ({ companyId, pathname, icons, onChange }) => {
  const { unprocessed, csrs, ca } = icons;
  return (
    <Menu path="/hub" pathname={pathname} onChange={onChange}>
      <MenuSection label="General">
        <MenuItem path="/hub/endpoints" label="Endpoint Configuration" />
        <MenuItem
          path="/hub/unprocessed"
          label="Unprocessed Endpoints"
          icon={unprocessed.icon}
          fill={unprocessed.fill}
          size={8}
        />
      </MenuSection>
      <MenuSection label="Certificates">
        <MenuItem path="/hub/ca" label="Certificate Authorities" icon={ca.icon} fill={ca.fill} size={8} />
        <MenuItem path="/hub/tls/client" label="TLS Client Certificates" icon={csrs.icon} fill={csrs.fill} size={8} />
        <MenuItem path="/hub/tls/server" label="TLS Server Certificates" />
      </MenuSection>
      <MenuSection label="Administration">
        <MenuItem path="/hub/dfsps" label="DFSPs" />
      </MenuSection>
    </Menu>
  );
};

const RouterMenu = ({ icons, location, history }) => (
  <MenuStructure pathname={location.pathname} onChange={history.push} icons={icons} />
);
const ConnectedRouter = connect(
  stateProps,
  null
)(RouterMenu);
export default withRouter(ConnectedRouter);
