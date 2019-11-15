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

const MenuStructure = ({ pathname, onChange, icons }) => {
  const { csrs } = icons;
  return (
    <Menu path="/dfsp" pathname={pathname} onChange={onChange}>
      <MenuSection label="General">
        <MenuItem path="/dfsp/hubEndpoints" label="Hub Endpoints" />
        <MenuItem path="/dfsp/endpoints" label="Endpoint Configuration" />
      </MenuSection>
      <MenuSection label="Certificates">
        <MenuItem path="/dfsp/ca" label="Certificate Authorities" />
        <MenuItem path="/dfsp/tls/client" label="TLS Client Certificates" icon={csrs.icon} fill={csrs.fill} size={8} />
        <MenuItem path="/dfsp/tls/server" label="TLS Server Certificates" />
        <MenuItem path="/dfsp/jws" label="JWS Certificates" />
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
