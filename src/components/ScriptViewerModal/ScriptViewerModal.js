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
import { Button, Modal } from 'src/components';
import ContentReader from 'src/components/ContentReader';

class ScriptViewerModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }
  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    return (
      <div style={this.props.style}>
        <Button
          style={{ marginLeft: '10px', height: '45px' }}
          kind="primary"
          noFill
          icon="studio-project"
          disabled={this.props.disabled}
          onClick={this.openModal}
          label="View"
        />
        {this.state.modalOpen && (
          <Modal title={this.props.title} onClose={this.closeModal} primaryAction="Close" width="800px" flex>
            <ContentReader data={this.props.script} style={{ height: 300 }} />
          </Modal>
        )}
      </div>
    );
  }
}

export default ScriptViewerModal;
