import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { getCurrencyValue } from 'utils/currencies';
import { TransferStatus } from 'App/types';
import {
  AnimateFadeIn,
  Column,
  DataLabel,
  DataList,
  ErrorBox,
  Modal,
  Pill,
  Row,
  Select,
  Spinner,
} from 'components';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { ReconciliationOverviewBatch, ReconciliationOverviewBatchTransfer } from '../../types';
import * as helpers from '../../helpers';
import TransferDetailsModal from './TransferDetailsModal';

const transferStatuses = [
  { label: helpers.toSpacedPascalCase(TransferStatus.Success), value: TransferStatus.Success },
  { label: helpers.toSpacedPascalCase(TransferStatus.Pending), value: TransferStatus.Pending },
  { label: helpers.toSpacedPascalCase(TransferStatus.Error), value: TransferStatus.Error },
];

const stateProps = (state: State) => ({
  selectedReconciliationOverviewBatch: selectors.getSelectedReconciliationOverviewBatch(
    state
  ) as ReconciliationOverviewBatch,
  // eslint-disable-next-line max-len
  reconciliationOverviewBatchTransfers: selectors.getReconciliationOverviewBatchStatusFilteredTransfers(
    state
  ),
  reconciliationOverviewBatchTransfersError: selectors.getReconciliationOverviewBatchTransfersError(
    state
  ),
  // eslint-disable-next-line max-len
  reconciliationOverviewBatchTransfersStatusFilter: selectors.getReconciliationOverviewBatchTransfersStatusFilter(
    state
  ),
  // eslint-disable-next-line max-len
  isReconciliationOverviewBatchTransfersPending: selectors.getIsReconciliationOverviewBatchTransfersPending(
    state
  ),
  // eslint-disable-next-line max-len
  selectedReconciliationOverviewBatchTransfer: selectors.getSelectedReconciliationOverviewBatchTransfer(
    state
  ) as ReconciliationOverviewBatchTransfer,
});

const dispatchProps = (dispatch: Dispatch) => ({
  onChangeReconciliationOverviewBatchTransferFilter: (filter: string) =>
    dispatch(actions.setReconciliationOverviewBatchTransfersStatusFilter({ filter })),
  onSelectReconciliationOverviewBatchTransfer: (item: ReconciliationOverviewBatchTransfer) =>
    dispatch(actions.selectReconciliationOverviewBatchTransfer({ item })),
  onModalCloseClick: () => dispatch(actions.hideReconciliationOverviewBatchModal()),
});

const reconciliationOverviewBathTransfersColumns = [
  {
    label: 'ID',
    key: 'id',
  },
  {
    label: 'Institution',
    key: 'institution',
  },
  {
    label: 'Direction',
    key: 'direction',
    func: helpers.toSpacedPascalCase,
  },
  {
    label: 'Type',
    key: 'type',
  },
  {
    label: 'Value',
    key: 'amount',
    func: (amount: string, item: ReconciliationOverviewBatchTransfer) =>
      `${item.currency} ${amount}`,
  },
  {
    label: 'Status',
    key: 'status',
    func: helpers.toSpacedPascalCase,
  },
  {
    label: 'Committed Date',
    key: 'initiatedTimestamp',
    func: helpers.toDashboardDate,
  },
];

interface BatchWindowModalProps {
  selectedReconciliationOverviewBatch: ReconciliationOverviewBatch;
  reconciliationOverviewBatchTransfers: ReconciliationOverviewBatchTransfer[];
  reconciliationOverviewBatchTransfersError: string | null;
  reconciliationOverviewBatchTransfersStatusFilter: string | undefined;
  isReconciliationOverviewBatchTransfersPending?: boolean;
  selectedReconciliationOverviewBatchTransfer: ReconciliationOverviewBatchTransfer;
  onChangeReconciliationOverviewBatchTransferFilter: (filter: string) => void;
  onSelectReconciliationOverviewBatchTransfer: (item: ReconciliationOverviewBatchTransfer) => void;
  onModalCloseClick: () => void;
}

const BatchWindowModal: FC<BatchWindowModalProps> = ({
  selectedReconciliationOverviewBatch,
  reconciliationOverviewBatchTransfers,
  reconciliationOverviewBatchTransfersError,
  reconciliationOverviewBatchTransfersStatusFilter,
  isReconciliationOverviewBatchTransfersPending,
  selectedReconciliationOverviewBatchTransfer,
  onChangeReconciliationOverviewBatchTransferFilter,
  onSelectReconciliationOverviewBatchTransfer,
  onModalCloseClick,
}) => {
  let content = null;
  if (isReconciliationOverviewBatchTransfersPending) {
    content = (
      <div className="dashboard__overview__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (reconciliationOverviewBatchTransfersError) {
    content = <ErrorBox>Batch transfers: Unable to load data</ErrorBox>;
  } else
    content = (
      <>
        <Row align="space-between flex-end">
          <Select
            size="s"
            type="select"
            placeholder="Filter Status"
            onChange={onChangeReconciliationOverviewBatchTransferFilter}
            selected={reconciliationOverviewBatchTransfersStatusFilter}
            options={transferStatuses}
          />
          <AnimateFadeIn delay={0.5} initial={{ x: 5 }} animate={{ x: 0 }}>
            <Pill icon="info-small" label="Click on a row to open details" kind="tertiary" />
          </AnimateFadeIn>
        </Row>
        <div className="dashboard__overview__window__list">
          <DataList
            columns={reconciliationOverviewBathTransfersColumns}
            list={reconciliationOverviewBatchTransfers}
            onSelect={onSelectReconciliationOverviewBatchTransfer}
          />
        </div>
      </>
    );
  return (
    <Modal title="Batch Window Management" width="1200px" onClose={onModalCloseClick}>
      <Row align="flex-start flex-start">
        <Column>
          <Row align="flex-start flex-start">
            <Column grow="0" className="dashboard__overview__window__batch-details-block">
              <DataLabel size="s" light>
                Batch ID
              </DataLabel>
              <DataLabel size="m">{selectedReconciliationOverviewBatch.id}</DataLabel>
            </Column>
            <Column grow="0" className="dashboard__overview__window__batch-details-block">
              <DataLabel size="s" light>
                Status
              </DataLabel>
              <DataLabel size="m">
                {helpers.toSpacedPascalCase(selectedReconciliationOverviewBatch.status)}
              </DataLabel>
            </Column>
            <Column grow="0" className="dashboard__overview__window__batch-details-block">
              <DataLabel size="s" light>
                Total Value
              </DataLabel>
              <DataLabel size="m">$18,382.11</DataLabel>
            </Column>
            <Column grow="0" className="dashboard__overview__window__batch-details-block">
              <DataLabel size="s" light>
                Volume
              </DataLabel>
              <DataLabel size="m">
                {getCurrencyValue('USD')(selectedReconciliationOverviewBatch.transferTotals)}
              </DataLabel>
            </Column>
          </Row>
        </Column>
        <Column grow="0">
          <div className="dashboard__overview__window__batch-dates-block">
            <DataLabel size="s" light>
              Batch Opened
            </DataLabel>
            <DataLabel size="m">
              {helpers.toDashboardDate(selectedReconciliationOverviewBatch.startingTimestamp)}
            </DataLabel>
          </div>
          <div className="dashboard__overview__window__batch-dates-block">
            <DataLabel size="s" light>
              Batch Closed
            </DataLabel>
            <DataLabel size="m">
              {helpers.toDashboardDate(selectedReconciliationOverviewBatch.closingTimestamp)}
            </DataLabel>
          </div>
        </Column>
      </Row>
      {content}
      {selectedReconciliationOverviewBatchTransfer && <TransferDetailsModal />}
    </Modal>
  );
};

export default connect(stateProps, dispatchProps)(BatchWindowModal);
