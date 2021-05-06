import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { TransferStatus } from 'App/types';
import {
  DataLabel,
  DataList,
  DatePicker,
  Link,
  ErrorBox,
  Modal,
  FormInput,
  Row,
  Select,
  Spinner,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from 'components';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { Transfer, TransferError, TransferFilter, DateRange } from '../../types';
import * as helpers from '../../helpers';

type FilterChangeValue = string | number;

const stateProps = (state: State) => ({
  model: selectors.getTransferFinderFilter(state),
  transfers: selectors.getTransfers(state),
  transfersError: selectors.getTransfersError(state),
  isTransfersPending: selectors.getIsTransfersPending(state),
  isTransfersRequested: selectors.getIsTransfersRequested(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.toggleTransferFinderModal()),
  onFiltersSubmitClick: (filters: TransferFilter) =>
    dispatch(actions.requestTransfers({ filters })),
  onTransfersSubmitClick: () => dispatch(actions.unrequestTransfers()),
  onFilterChange: ({ field, value }: { field: string; value: FilterChangeValue }) =>
    dispatch(actions.setTransferFinderFilter({ field, value })),
  onTransferRowClick: (transferError: TransferError) => {
    dispatch(actions.requestTransferDetails({ transferId: transferError.id }));
  },
});

interface TransferFinderModalProps {
  model: TransferFilter;
  transfers: Transfer[];
  transfersError: string | null;
  isTransfersPending: boolean;
  isTransfersRequested: boolean;
  onFiltersSubmitClick: (filters: TransferFilter) => void;
  onTransfersSubmitClick: () => void;
  onModalCloseClick: () => void;
  onFilterChange: ({ field, value }: { field: string; value: FilterChangeValue }) => void;
  onTransferRowClick: (transferError: TransferError) => void;
}

const TransferFinderModal: FC<TransferFinderModalProps> = ({
  model,
  transfers,
  transfersError,
  isTransfersPending,
  isTransfersRequested,
  onFiltersSubmitClick,
  onTransfersSubmitClick,
  onModalCloseClick,
  onFilterChange,
  onTransferRowClick,
}) => {
  let content = null;
  let onSubmit;
  let submitLabel;

  const transfersColumns = [
    {
      label: 'Transfer ID',
      key: 'id',
      func: (value: string, item: Transfer) => (
        <Link>
          <span style={{ textDecoration: 'underline' }}>{item.id}</span>
        </Link>
      ),
    },
    {
      label: 'Amount',
      key: 'amount',
      func: (value: string, item: Transfer) => `${item.currency} ${item.amount}`,
    },
    {
      label: 'Direction',
      key: 'direction',
      func: helpers.toSpacedPascalCase,
    },
    {
      label: 'Status',
      key: 'status',
      func: helpers.toSpacedPascalCase,
    },
    {
      label: 'Batch ID',
      key: 'batchId',
    },
    {
      label: 'Institution',
      key: 'institution',
    },
    {
      label: 'Date',
      key: 'initiatedTimestamp',
      func: helpers.toTransfersDate,
    },
  ];

  if (!isTransfersRequested) {
    content = <TransferFilters model={model} onFilterChange={onFilterChange} />;
    onSubmit = () => onFiltersSubmitClick(model);
    submitLabel = 'Find Transfers';
  } else if (transfersError) {
    content = <ErrorBox>Transfer: Unable to load transfers</ErrorBox>;
  } else if (isTransfersPending) {
    content = (
      <div className="transfers__transfers__loader">
        <Spinner size={20} />
      </div>
    );
  } else {
    content = (
      <div className="transfers__transfers__list">
        <DataList columns={transfersColumns} list={transfers} onSelect={onTransferRowClick} />
      </div>
    );
    onSubmit = onTransfersSubmitClick;
    submitLabel = 'Back to filtering';
  }
  return (
    <Modal
      title="Find a Transfer"
      width="1200px"
      onClose={onModalCloseClick}
      onSubmit={onSubmit}
      allowSubmit
      isSubmitEnabled={onSubmit !== undefined}
      primaryAction={submitLabel}
    >
      {content}
    </Modal>
  );
};

const dateRanges = [
  { label: 'Custom', value: 'CUSTOM' },
  { label: helpers.toSpacedPascalCase(DateRange.Today), value: DateRange.Today },
  { label: helpers.toSpacedPascalCase(DateRange.Past48Hours), value: DateRange.Past48Hours },
  { label: helpers.toSpacedPascalCase(DateRange.OneWeek), value: DateRange.OneWeek },
  { label: helpers.toSpacedPascalCase(DateRange.OneMonth), value: DateRange.OneMonth },
];

const transferStatuses = [
  { label: helpers.toSpacedPascalCase(TransferStatus.Success), value: TransferStatus.Success },
  { label: helpers.toSpacedPascalCase(TransferStatus.Pending), value: TransferStatus.Pending },
  { label: helpers.toSpacedPascalCase(TransferStatus.Error), value: TransferStatus.Error },
];

interface TransferFiltersProps {
  model: TransferFilter;
  onFilterChange: ({ field, value }: { field: string; value: FilterChangeValue }) => void;
}

const TransferFilters: FC<TransferFiltersProps> = ({ model, onFilterChange }) => (
  <Tabs>
    <TabList>
      <Tab>Basic Find a Transfer</Tab>
      <Tab>Advanced Filtering</Tab>
    </TabList>
    <TabPanels>
      <TabPanel>
        <DataLabel size="l">Find an exact transfer by entering the ID:</DataLabel>
        <br />
        <br />
        <FormInput
          label="Transfer ID"
          type="text"
          value={model.transferId || ''}
          onChange={(value: FilterChangeValue) => onFilterChange({ field: 'transferId', value })}
        />
      </TabPanel>
      <TabPanel>
        <DataLabel size="l">Filter transfers:</DataLabel>
        <br />
        <br />
        <DataLabel size="m">Approximate time of transfer</DataLabel>
        <Row align="flex-start">
          <Select
            placeholder="Date"
            type="select"
            options={dateRanges}
            selected={model.dates || ''}
            onChange={(value: FilterChangeValue) => onFilterChange({ field: 'dates', value })}
          />
          <DatePicker
            placeholder="From"
            withTime
            value={model.from || ''}
            onSelect={(value: FilterChangeValue) => onFilterChange({ field: 'from', value })}
            format="x"
          />
          <DatePicker
            placeholder="To"
            withTime
            value={model.to || ''}
            onSelect={(value: FilterChangeValue) => onFilterChange({ field: 'to', value })}
            format="x"
          />
        </Row>
        <br />
        <FormInput
          label="Contains Institution"
          type="text"
          value={model.institution || ''}
          onChange={(value: FilterChangeValue) => onFilterChange({ field: 'institution', value })}
        />
        <FormInput
          label="Transfer Status"
          type="select"
          options={transferStatuses}
          value={model.status || ''}
          onChange={(value: FilterChangeValue) => onFilterChange({ field: 'status', value })}
        />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

export default connect(stateProps, dispatchProps)(TransferFinderModal);
