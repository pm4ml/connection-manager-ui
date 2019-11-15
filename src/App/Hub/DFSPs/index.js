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
import { Button, ControlIcon, DataList } from 'components';
import { getDfsps, getIsDfspsReadPending } from 'App/selectors';
import { getMonetaryZones } from 'App/MonetaryZones/selectors';
import DFSPModal from './DFSPModal';
import { openNewHubDfspModal, openExistingHubDfspModal } from './DFSPModal/actions';
import './index.css';

const stateProps = state => ({
  dfsps: getDfsps(state),
  monetaryZones: getMonetaryZones(state),
  isDfspsPending: getIsDfspsReadPending(state),
});
const actionProps = dispatch => ({
  onAddClick: () => dispatch(openNewHubDfspModal()),
  onEditClick: dfsp => dispatch(openExistingHubDfspModal(dfsp)),
});

const DFSPs = ({ dfsps, monetaryZones, isDfspsPending, onAddClick, onEditClick }) => {
  const columns = [
    {
      label: 'Id',
      key: 'id',
      className: 'hub__dfsps__id',
    },
    {
      label: 'Name',
      key: 'name',
      className: 'hub__dfsps__name',
    },
    {
      label: 'Security Group',
      key: 'securityGroup',
      className: 'hub__dfsps__security-group',
    },
    {
      label: 'Monetary Zone',
      key: 'monetaryZoneId',
      func: id => {
        const zone = monetaryZones.find(zone => zone.monetaryZoneId === id);
        if (zone) {
          return `${zone.monetaryZoneId} - ${zone.name}`;
        }
        return null;
      },
    },
    {
      label: '',
      key: 'id',
      sortable: false,
      searchable: false,
      func: (_, dfsp, index) => (
        <ControlIcon
          icon="edit-small"
          size={16}
          tooltip={`Edit ${dfsp.name}`}
          onClick={() => onEditClick(dfsp)}
          tooltipPosition="left"
        />
      ),
      className: 'icon-column',
    },
  ];
  return (
    <div className="hub__dfsps">
      <Button label="Add DFSP" onClick={onAddClick} />
      <div className="hub__dfsps__list">
        <DataList list={dfsps} columns={columns} isPending={isDfspsPending} />
        <DFSPModal />
      </div>
    </div>
  );
};

export default connect(
  stateProps,
  actionProps
)(DFSPs);
