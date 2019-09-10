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
import { Button, DataList } from 'components';
import { getDfsps, getIsDfspsReadPending } from 'App/selectors';
import DFSPModal from './DFSPModal';
import { showHubDfspModal } from './DFSPModal/actions';
import './index.css';

const stateProps = state => ({
  dfsps: getDfsps(state),
  isDfspsPending: getIsDfspsReadPending(state),
});
const actionProps = dispatch => ({
  onAddClick: () => dispatch(showHubDfspModal()),
});

const DFSPs = ({ dfsps, isDfspsPending, onAddClick }) => {
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
