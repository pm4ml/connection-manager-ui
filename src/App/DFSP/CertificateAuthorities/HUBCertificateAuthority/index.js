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
import { CertificateModal, MessageBox, FileControls, FormInput } from 'components';
import { withMount } from 'utils/hocs';
import { getDfspName } from 'App/selectors';
import {
  storeDfspHubCa,
  downloadDfspHubCaRootCertificate,
  showDfspHubCaRootCertificateModal,
  hideDfspHubCaRootCertificateModal,
} from './actions';
import {
  getDfspHubCaError,
  getDfspHubCaRootCertificate,
  getIsDfspHubCaRootCertificateModalVisible,
  getIsDfspHubCaPending,
} from './selectors';

import './index.css';

const stateProps = state => ({
  dfspName: getDfspName(state),
  error: getDfspHubCaError(state),
  rootCertificate: getDfspHubCaRootCertificate(state),
  isRootCertificateModalVisible: getIsDfspHubCaRootCertificateModalVisible(state),
  isDfspHubCaPending: getIsDfspHubCaPending(state),
});

const actionProps = dispatch => ({
  onMount: () => dispatch(storeDfspHubCa()),
  onRootCertificateViewClick: () => dispatch(showDfspHubCaRootCertificateModal()),
  onRootCertificateDownloadClick: () => dispatch(downloadDfspHubCaRootCertificate()),
  onRootCertificateModalCloseClick: () => dispatch(hideDfspHubCaRootCertificateModal()),
});

const HubCertificateAuthority = ({
  dfspName,
  error,
  rootCertificate,
  isRootCertificateModalVisible,
  isDfspHubCaPending,
  onRootCertificateViewClick,
  onRootCertificateDownloadClick,
  onRootCertificateModalCloseClick,
}) => {
  if (error) {
    return (
      <MessageBox
        icon="warning-sign"
        kind="error"
        message="There was an error while loading the certificates"
        center
        size={30}
        fontSize={17}
      />
    );
  }
  return (
    <div className="dfsp__hub-ca">
      <div className="dfsp__hub-ca__root-certificate">
        <FormInput
          type="text"
          label="Root Certificate"
          elementWidth="400px"
          value={rootCertificate ? `${dfspName}-hub-root.pem` : 'Unavailable'}
          icon={rootCertificate && 'documents'}
          pending={isDfspHubCaPending}
          disabled
        />
        {rootCertificate && (
          <FileControls onViewClick={onRootCertificateViewClick} onDownloadClick={onRootCertificateDownloadClick} />
        )}
      </div>

      {isRootCertificateModalVisible && (
        <CertificateModal
          onClose={onRootCertificateModalCloseClick}
          content={rootCertificate}
          title="Root Certificate"
        />
      )}
    </div>
  );
};

const MountedHubCertificateAuthority = withMount(HubCertificateAuthority, 'onMount');
export default connect(
  stateProps,
  actionProps
)(MountedHubCertificateAuthority);
