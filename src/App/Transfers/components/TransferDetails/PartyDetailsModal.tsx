import React, { FC, useState } from 'react';
import { Modal, FormInput, ErrorBox, Row, Button } from 'components';
import { TransferParty } from '../../types';
import { ExtensionListModal } from './ExtensionListModal';

interface TransferPartyDetailModalProps {
  model: TransferParty | null;
  title: string;
  onCloseClick: () => void;
}

export const TransferPartyDetailsModal: FC<TransferPartyDetailModalProps> = ({
  model,
  title,
  onCloseClick,
}) => {
  let content = null;

  const [isExtensionListVisible, setIsExtensionListVisible] = useState(false);

  const showExtensionList = () => {
    setIsExtensionListVisible(!isExtensionListVisible);
  };

  if (!model) {
    content = <ErrorBox>Transfer: Unable to load transfer details</ErrorBox>;
  } else {
    content = (
      <div style={{ width: '100%' }}>
        <Row>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }}>
            <FormInput label="Id Type" type="text" value={model.idType} />
          </div>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }}>
            <FormInput label="Id Value" type="text" value={model.idValue} />
          </div>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }} />
        </Row>
        <Row>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }}>
            <FormInput label="Display Name" type="text" value={model.displayName} />
          </div>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }} />
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }} />
        </Row>
        <Row>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }}>
            <FormInput label="First Name" type="text" value={model.firstName} />
          </div>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }}>
            <FormInput label="Middle Name" type="text" value={model.middleName} />
          </div>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }}>
            <FormInput label="Last Name" type="text" value={model.lastName} />
          </div>
        </Row>
        <Row>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }}>
            <FormInput label="Date Of Birth" type="text" value={model.dateOfBirth} />
          </div>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }}>
            <FormInput
              label="Merchant Classification Code"
              type="text"
              value={model.merchantClassificationCode}
            />
          </div>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }}>
            <FormInput label="FSP Id" type="text" value={model.fspId} />
          </div>
        </Row>

        <Row>
          <div
            style={{ flex: '1 1 33%', paddingRight: '5px', paddingTop: '10px', minWidth: '0px' }}
          >
            <Button
              kind="secondary"
              style={{ width: '100%' }}
              noFill={true}
              label="View Extension List"
              disabled={typeof model.extensionList === 'undefined'}
              tooltip={
                !model.extensionList &&
                'This option is only available when an extension list is present in the party object within the quote request body'
              }
              onClick={() => {
                showExtensionList();
              }}
            />
          </div>
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }} />
          <div style={{ flex: '1 1 33%', paddingRight: '5px', minWidth: '0px' }} />
        </Row>

        {isExtensionListVisible && model.extensionList && (
          <ExtensionListModal
            model={model.extensionList}
            title="Party Extension List"
            onCloseClick={() => setIsExtensionListVisible(false)}
          />
        )}
      </div>
    );
  }

  return (
    <Modal title={title} width="1200px" onClose={onCloseClick} isSubmitEnabled={false}>
      {content}
    </Modal>
  );
};
