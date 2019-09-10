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
import { Button, CertificateModal, FileControls, FormInput } from 'components';
import { setDfspCsrCertificate, submitDfspCsr, showDfspCsrModal, hideDfspCsrModal } from './actions';
import {
  getDfspCsrCertificate,
  getIsDfspCsrModalVisible,
  getIsDfspCsrSubmitEnabled,
  getIsDfspCsrSubmitPending,
} from './selectors';

import './index.css';

const stateProps = state => ({
  certificate: getDfspCsrCertificate(state),
  isModalVisible: getIsDfspCsrModalVisible(state),
  isSubmitEnabled: getIsDfspCsrSubmitEnabled(state),
  isSubmitPending: getIsDfspCsrSubmitPending(state),
});

const actionProps = dispatch => ({
  onChange: cert => dispatch(setDfspCsrCertificate(cert)),
  onSubmit: () => dispatch(submitDfspCsr()),
  onViewClick: () => dispatch(showDfspCsrModal()),
  onModalCloseClick: () => dispatch(hideDfspCsrModal()),
});

const CSR = ({
  certificate,
  isModalVisible,
  isSubmitEnabled,
  isSubmitPending,
  onChange,
  onSubmit,
  onViewClick,
  onModalCloseClick,
}) => {
  return (
    <div className="dfsp__csr">
      <div>
        <Button
          className="dfsp__csr__submit"
          label="Submit"
          icon="check-small"
          onClick={onSubmit}
          pending={isSubmitPending}
          disabled={!isSubmitEnabled}
        />
      </div>
      <div className="dfsp__csr__csr">
        <FormInput
          type="file"
          label="CSR"
          parseFileAsText
          onChange={onChange}
          elementWidth="400px"
          value={certificate}
          required
        />
        {certificate && <FileControls onViewClick={onViewClick} />}
      </div>

      {isModalVisible && <CertificateModal title="CSR" onClose={onModalCloseClick} content={certificate} />}
    </div>
  );
};

export default connect(
  stateProps,
  actionProps
)(CSR);
