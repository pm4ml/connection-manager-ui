import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { Column, FormInput, ErrorBox, Modal, Row, Spinner } from 'components';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { ReconciliationOverviewBatchTransfer, TransferDetails } from '../../types';
import * as helpers from '../../helpers';

const stateProps = (state: State) => ({
  // eslint-disable-next-line max-len
  selectedReconciliationOverviewBatchTransfer: selectors.getSelectedReconciliationOverviewBatchTransfer(
    state
  ) as ReconciliationOverviewBatchTransfer,
  // eslint-disable-next-line max-len
  reconciliationOverviewBatchTransferDetails: selectors.getReconciliationOverviewBatchTransferDetails(
    state
  ),
  // eslint-disable-next-line max-len
  reconciliationOverviewBatchTransferDetailsError: selectors.getReconciliationOverviewBatchTransferDetailsError(
    state
  ),
  // eslint-disable-next-line max-len
  isReconciliationOverviewBatchTransferDetailsPending: selectors.getIsReconciliationOverviewBatchTransferDetailsPending(
    state
  ),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.hideReconciliationOverviewBatchTransferDetailsModal()),
});

interface TransferDetailsModalProps {
  selectedReconciliationOverviewBatchTransfer: ReconciliationOverviewBatchTransfer;
  reconciliationOverviewBatchTransferDetails?: TransferDetails;
  reconciliationOverviewBatchTransferDetailsError: string | null;
  isReconciliationOverviewBatchTransferDetailsPending?: boolean;
  onModalCloseClick: () => void;
}

const TransferDetailsModal: FC<TransferDetailsModalProps> = ({
  selectedReconciliationOverviewBatchTransfer,
  reconciliationOverviewBatchTransferDetails = {} as TransferDetails,
  reconciliationOverviewBatchTransferDetailsError,
  isReconciliationOverviewBatchTransferDetailsPending,
  onModalCloseClick,
}) => {
  let content = null;
  if (isReconciliationOverviewBatchTransferDetailsPending) {
    content = (
      <div className="dashboard__overview__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (reconciliationOverviewBatchTransferDetailsError) {
    content = <ErrorBox>Transfers Details: Unable to load data</ErrorBox>;
  } else {
    content = (
      <Row align="center center">
        <Column grow="1" align="center">
          <TransferDetailBlock
            label="Transfer ID"
            value={reconciliationOverviewBatchTransferDetails.id}
          />
          <TransferDetailBlock
            label="Details"
            value={reconciliationOverviewBatchTransferDetails.details}
          />
          <TransferDetailBlock
            label="Sender"
            value={reconciliationOverviewBatchTransferDetails.sender}
          />
          <TransferDetailBlock
            label="Confirmation Number"
            value={reconciliationOverviewBatchTransferDetails.confirmationNumber}
          />
        </Column>
        <Column grow="1" align="center">
          <TransferDetailBlock
            label="Value"
            value={reconciliationOverviewBatchTransferDetails.amount}
          />
          <TransferDetailBlock
            label="Direction"
            value={helpers.toSpacedPascalCase(
              selectedReconciliationOverviewBatchTransfer.direction
            )}
          />
          <TransferDetailBlock
            label="Status"
            value={helpers.toSpacedPascalCase(reconciliationOverviewBatchTransferDetails.status)}
          />
          <TransferDetailBlock
            label="Initiated Timestamp"
            value={helpers.toDashboardDate(
              selectedReconciliationOverviewBatchTransfer.initiatedTimestamp
            )}
          />
        </Column>
      </Row>
    );
  }
  return (
    <Modal title="Transfer Details" width="860px" onClose={onModalCloseClick}>
      {content}
    </Modal>
  );
};

interface TransferDetailBlockProps {
  label: string;
  value?: string | number;
}

const TransferDetailBlock: FC<TransferDetailBlockProps> = ({ label, value = '' }) => (
  <FormInput type="text" value={value} label={label} disabled />
);

export default connect(stateProps, dispatchProps)(TransferDetailsModal);
