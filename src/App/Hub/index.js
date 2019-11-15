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

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import { Heading, ScrollBox, Spinner } from 'components';

import { getEnvironmentName } from 'App/selectors';
import { getIsHubLoading } from './selectors';
import { initHub } from './actions';

import Menu from './Menu';
import UnprocessedEndpoints from './UnprocessedEndpoints';
import Endpoints from './Endpoints';
import CertificateAuthorities from './CertificateAuthorities';
import TLSClientCertificates from './TLSClientCertificates';
import TLSServerCertificates from './TLSServerCertificates';
import DFSPs from './DFSPs';
import './Hub.css';

const stateProps = state => ({
  environmentName: getEnvironmentName(state),
  isHubLoading: getIsHubLoading(state),
});

const actionProps = dispatch => ({
  initHub: () => dispatch(initHub()),
});

class HubWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.props.initHub();
  }
  componentDidUpdate(prevProps) {
    const { isHubLoading, history } = this.props;
    if (!isHubLoading && isHubLoading !== prevProps.isHubLoading) {
      history.replace('/hub/unprocessed');
    }
  }
  render() {
    if (this.props.isHubLoading) {
      return <HubLoader />;
    }
    return <Hub {...this.props} />;
  }
}
const HubLoader = () => <Spinner center size="m" />;

const Hub = ({ environmentName }) => (
  <div id="hub">
    <div id="hub__menu">
      <Menu />
    </div>
    <ScrollBox>
      <div id="hub__content">
        <Heading size="3">Hub Name</Heading>
        <Heading size="4">{environmentName}</Heading>
        <Route path="/hub/endpoints" component={Endpoints} />
        <Route path="/hub/unprocessed" component={UnprocessedEndpoints} />
        <Route path="/hub/ca" component={CertificateAuthorities} />
        <Route path="/hub/tls/client" component={TLSClientCertificates} />
        <Route path="/hub/tls/server" component={TLSServerCertificates} />
        <Route path="/hub/dfsps" component={DFSPs} />
      </div>
    </ScrollBox>
  </div>
);

const ConneectedHUB = connect(
  stateProps,
  actionProps
)(HubWrapper);
export default withRouter(ConneectedHUB);
