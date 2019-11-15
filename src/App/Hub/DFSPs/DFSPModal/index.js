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
import { Modal, FormInput } from 'components';
import {
  getMonetaryZoneOptions,
  getHubDfspModalName,
  getHubDfspModalId,
  getHubDfspModalMonetaryZoneId,
  getHubDfspModalValidationResult,
  getIsHubDfspModalVisible,
  getIsExistingDfsp,
  getIsHubDfspModalSubmitEnabled,
  getIsHubDfspModalSubmitPending,
} from './selectors';
import {
  closeHubDfspModal,
  submitHubDfspModal,
  setHubDfspModalName,
  setHubDfspModalId,
  setHubDfspModalMonetaryZone,
} from './actions';

import './index.css';

const stateProps = state => ({
  dfspName: getHubDfspModalName(state),
  dfspId: getHubDfspModalId(state),
  dfspMonetaryZoneId: getHubDfspModalMonetaryZoneId(state),
  monetaryZoneOptions: getMonetaryZoneOptions(state),
  validation: getHubDfspModalValidationResult(state),
  isVisible: getIsHubDfspModalVisible(state),
  isExistingDfsp: getIsExistingDfsp(state),
  isSubmitEnabled: getIsHubDfspModalSubmitEnabled(state),
  isSubmitPending: getIsHubDfspModalSubmitPending(state),
});

const actionProps = dispatch => ({
  onClose: () => dispatch(closeHubDfspModal()),
  onSubmit: () => dispatch(submitHubDfspModal()),
  onNameChange: name => dispatch(setHubDfspModalName(name)),
  onIdChange: id => dispatch(setHubDfspModalId(id)),
  onMonetaryZoneChange: zone => dispatch(setHubDfspModalMonetaryZone(zone)),
});

const DFSPModal = ({
  dfspName,
  dfspId,
  dfspMonetaryZoneId,
  monetaryZoneOptions,
  validation,
  isExistingDfsp,
  isVisible,
  isSubmitEnabled,
  isSubmitPending,
  onNameChange,
  onIdChange,
  onMonetaryZoneChange,
  onClose,
  onSubmit,
}) => {
  if (!isVisible) {
    return <div />;
  }

  return (
    <Modal
      id="dfsp-modal"
      title="Add DFSP"
      allowSubmit
      isSubmitEnabled={isSubmitEnabled}
      isSubmitPending={isSubmitPending}
      onSubmit={onSubmit}
      onClose={onClose}
    >
      <div className="dfsp-modal__content">
        <div className="dfsp-modal__dfsp-name">
          <FormInput
            type="text"
            label="Name"
            onChange={onNameChange}
            value={dfspName}
            validation={validation.fields.name}
          />
        </div>
        <div className="dfsp-modal__dfsp-id">
          <FormInput
            type="text"
            label="ID"
            disabled={isExistingDfsp}
            onChange={onIdChange}
            value={dfspId}
            validation={validation.fields.dfspId}
          />
        </div>
        <div className="dfsp-modal__dfsp-monetary-zone">
          <FormInput
            type="select"
            options={monetaryZoneOptions}
            label="Monetary Zone"
            onChange={onMonetaryZoneChange}
            value={dfspMonetaryZoneId}
            validation={validation.fields.monetaryZoneId}
          />
        </div>
      </div>
    </Modal>
  );
};
// validation={validation.fields.dfspName}

export default connect(
  stateProps,
  actionProps
)(DFSPModal);
