import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import {
  Button,
  ErrorBox,
  Modal,
  FormInput,
  TextField,
  Row,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from 'components';
import { TransferRequestDetailsModal } from './RequestDetailModal';
import { TransferPartyDetailsModal } from './PartyDetailsModal';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { TransferDetails } from '../../types';

const stateProps = (state: State) => ({
  model: selectors.getTransferDetails(state),
  transferDetailsError: selectors.getTransferDetailsError(state),
  isTransferDetailsPending: selectors.getIsTransferDetailsPending(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.toggleTransferDetailsModal()),
});

interface TransferDetailsModalProps {
  model?: TransferDetails;
  transferDetailsError: string | null;
  isTransferDetailsPending: boolean;
  onModalCloseClick: () => void;
}

const TransferDetailsModal: FC<TransferDetailsModalProps> = ({
  model,
  transferDetailsError,
  isTransferDetailsPending,
  onModalCloseClick,
}) => {
  let content = null;

  if (transferDetailsError || !model) {
    content = <ErrorBox>Transfer: Unable to load transfer details</ErrorBox>;
  } else if (isTransferDetailsPending) {
    content = (
      <div className="transfers__transfers__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (model) {
    content = (
      <div className="transfers__transfer__details">
        <TransferDetailsView model={model} />
      </div>
    );
  }

  return (
    <Modal
      title="Transfer Details"
      width="1000px"
      onClose={onModalCloseClick}
      isSubmitEnabled={false}
    >
      {content}
    </Modal>
  );
};

interface TransferDetailsProps {
  model: TransferDetails;
}

const TransferDetailsView: FC<TransferDetailsProps> = ({ model }) => {
  const [isRequestDetailsVisible, setIsRequestDetailsVisible] = useState(false);
  const [requestModel, setRequestModel] = useState(null);
  const [requestModalTitle, setRequestModalTitle] = useState('');

  const [isRequestPartyDetailsVisible, setIsRequestPartyDetailsVisible] = useState(false);
  const [partyModel, setPartyModel] = useState(null);
  const [partyModalTitle, setPartyModalTitle] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPayeeParty = (aModel: any) => {
    setPartyModel(aModel);
    setPartyModalTitle('Payee Party');
    setIsRequestPartyDetailsVisible(!isRequestPartyDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPayerParty = (aModel: any) => {
    setPartyModel(aModel);
    setPartyModalTitle('Payer Party');
    setIsRequestPartyDetailsVisible(!isRequestPartyDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showPartyLookupResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Party Lookup Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showQuoteRequest = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Quote Request');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showQuoteResponse = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Quote Response');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferPrepare = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Prepare');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferFulfil = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Fulfil');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showTransferError = (aModel: any) => {
    setRequestModel(aModel);
    setRequestModalTitle('Transfer Error');
    setIsRequestDetailsVisible(!isRequestDetailsVisible);
  };

  let transferStateInput = (
    <FormInput
      disabled={true}
      label="Transfer State"
      value={model.technicalDetails.transferState}
    />
  );

  if (model.technicalDetails.lastError) {
    transferStateInput = (
      <div className="forminput__row">
        <div className="forminput-input">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label>Transfer State</label>
          <TextField
            disabled={false}
            label="Transfer State"
            value={model.technicalDetails.transferState}
            onButtonClick={() => showTransferError(model.technicalDetails.lastError)}
            buttonText="View Error"
            buttonKind="secondary"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>Basic Information</Tab>
          <Tab>Technical Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput disabled={true} label="Transfer ID" type="text" value={model.id} />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Transfer State"
                  type="text"
                  value={model.technicalDetails.transferState}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput disabled={true} label="Batch" type="text" value="N/A" />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Date Submitted"
                  type="text"
                  value={model.initiatedTimestamp}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput disabled={true} label="Amount" type="text" value={model.amount} />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput disabled={true} label="Currency" type="text" value={model.currency} />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Sender"
                  type="text"
                  value={model.technicalDetails.payerParty.displayName}
                />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Sender Details"
                  type="text"
                  value={`${model.technicalDetails.payerParty.idType} ${model.technicalDetails.payerParty.idValue}`}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Recipient"
                  type="text"
                  value={model.technicalDetails.payeeParty.displayName}
                />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Recipient Details"
                  type="text"
                  value={`${model.technicalDetails.payeeParty.idType} ${model.technicalDetails.payeeParty.idValue}`}
                />
              </div>
            </Row>
            <Row align="flex-start" style={{ marginTop: '5px' }}>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput
                  disabled={true}
                  label="Institution"
                  type="text"
                  value={model.institution}
                />
              </div>
              <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                <FormInput disabled={true} label="Direction" type="text" value={model.direction} />
              </div>
            </Row>
          </TabPanel>
          <TabPanel>
            <Row align="flex-start stretch">
              <div style={{ flex: '0 0 50%', marginRight: '10px' }}>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    disabled={true}
                    label="Scheme Transfer ID"
                    value={model.technicalDetails.schemeTransferId}
                  />
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    disabled={true}
                    label="Transaction ID"
                    value={model.technicalDetails.transactionId}
                  />
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    disabled={true}
                    label="Quote ID"
                    value={model.technicalDetails.quoteId}
                  />
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <FormInput
                    disabled={true}
                    label="Home Transfer ID"
                    value={model.technicalDetails.homeTransferId}
                  />
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {transferStateInput}
                </Row>
              </div>
              <div style={{ alignItems: 'flex-start', flex: '0 0 50%', marginRight: '5px' }}>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                    Party Information
                  </label>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px', marginRight: '5px' }}>
                  <div style={{ flex: '0 0 50%', marginRight: '5px' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      noFill={true}
                      label="Payer Information"
                      onClick={() => showPayerParty(model.technicalDetails.payerParty)}
                    />
                  </div>
                  <div style={{ flex: '0 0 50%', paddingRight: '5px', marginRight: '5px' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      noFill={true}
                      label="Payee Information"
                      onClick={() => showPayeeParty(model.technicalDetails.payeeParty)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label style={{ paddingTop: '5px', paddingBottom: '5px' }}>
                    View Message Details
                  </label>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      disabled={
                        !(
                          model.technicalDetails.getPartiesResponse &&
                          model.technicalDetails.getPartiesResponse.body
                        )
                      }
                      tooltip={
                        !(
                          model.technicalDetails.getPartiesResponse &&
                          model.technicalDetails.getPartiesResponse
                        ) &&
                        'This option is only available when a GET /parties response can be found for the transfer'
                      }
                      noFill={true}
                      label="Party Lookup Response"
                      onClick={() => {
                        showPartyLookupResponse(model.technicalDetails.getPartiesResponse);
                      }}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      noFill={true}
                      label="Quote Request"
                      onClick={() => showQuoteRequest(model.technicalDetails.quoteRequest)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      noFill={true}
                      label="Quote Response"
                      onClick={() => showQuoteResponse(model.technicalDetails.quoteResponse)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      noFill={true}
                      label="Transfer Prepare"
                      onClick={() => showTransferPrepare(model.technicalDetails.transferPrepare)}
                    />
                  </div>
                </Row>
                <Row align="flex-start" style={{ marginTop: '5px' }}>
                  <div style={{ width: '100%' }}>
                    <Button
                      kind="secondary"
                      style={{ width: '100%' }}
                      noFill={true}
                      label="Transfer Fulfil"
                      onClick={() => showTransferFulfil(model.technicalDetails.transferFulfilment)}
                    />
                  </div>
                </Row>
              </div>
            </Row>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {isRequestDetailsVisible && (
        <TransferRequestDetailsModal
          model={requestModel}
          title={requestModalTitle}
          onCloseClick={() => {
            setIsRequestDetailsVisible(!isRequestDetailsVisible);
          }}
        />
      )}
      {isRequestPartyDetailsVisible && (
        <TransferPartyDetailsModal
          model={partyModel}
          title={partyModalTitle}
          onCloseClick={() => {
            setIsRequestPartyDetailsVisible(!isRequestPartyDetailsVisible);
          }}
        />
      )}
    </div>
  );
};

export default connect(stateProps, dispatchProps)(TransferDetailsModal);
