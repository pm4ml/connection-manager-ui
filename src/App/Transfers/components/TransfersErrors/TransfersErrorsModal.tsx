import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { DataList, Modal, Spinner, Link } from 'components';
import * as actions from '../../actions';
import * as selectors from '../../selectors';
import { TransferError } from '../../types';
import * as helpers from '../../helpers';

const stateProps = (state: State) => ({
  transfersErrors: selectors.getFilteredByStatusTransfersErrors(state),
  transfersErrorsError: selectors.getTransfersErrorsError(state),
  isTransfersErrorsViewAllActive: selectors.getIsTransfersErrorsViewAllActive(state),
  isTransfersErrorsPending: selectors.getIsTransfersErrorsPending(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onModalCloseClick: () => dispatch(actions.toggleTransfersErrorsViewAll()),
  onTransferRowClick: (transferError: TransferError) => {
    dispatch(actions.requestTransferDetails({ transferId: transferError.id }));
  },
});

const transfersErrorsColumns = [
  {
    label: 'Transfer ID',
    key: 'id',
    func: (value: string, item: TransferError) => (
      <Link>
        <span style={{ textDecoration: 'underline' }}>{item.id}</span>
      </Link>
    ),
  },
  { label: 'Direction', key: 'direction', func: helpers.toSpacedPascalCase },
  { label: 'Type', key: 'type', className: 'col-100' },
  {
    label: 'Value',
    key: 'amount',
    func: (amount: string, item: TransferError) => `${item.currency} ${amount}`,
  },
  { label: 'Error Type', key: 'errorType', func: helpers.toSpacedPascalCase },
  {
    label: 'Date',
    key: 'initiatedTimestamp',
    func: helpers.toTransfersDate,
  },
];

interface TransfersErrorsModalProps {
  transfersErrors: TransferError[];
  transfersErrorsError: string | null;
  isTransfersErrorsViewAllActive: boolean;
  isTransfersErrorsPending?: boolean;
  onModalCloseClick: () => void;
  onTransferRowClick: (transferError: TransferError) => void;
}

const TransfersErrorsModal: FC<TransfersErrorsModalProps> = ({
  transfersErrors,
  transfersErrorsError,
  isTransfersErrorsViewAllActive,
  isTransfersErrorsPending,
  onModalCloseClick,
  onTransferRowClick,
}) => (
  <Modal title="Transfers Errors" width="1200px" onClose={onModalCloseClick}>
    {isTransfersErrorsPending ? (
      <div className="transfers__errors__loader">
        <Spinner size={20} />
      </div>
    ) : (
      <div className="transfers__errors__list">
        <DataList
          columns={transfersErrorsColumns}
          list={transfersErrors}
          onSelect={onTransferRowClick}
        />
      </div>
    )}
  </Modal>
);

export default connect(stateProps, dispatchProps)(TransfersErrorsModal);
