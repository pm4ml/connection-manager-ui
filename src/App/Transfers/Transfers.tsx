import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Button, Heading, Row } from 'components';
import { State, Dispatch } from 'store/types';
import { loadTransfers } from './hocs';
import * as selectors from './selectors';
import * as actions from './actions';
import { TransfersStatus, TransferError } from './types';
import { XYCoordinate } from '../types';
import TransferFinderModal from './components/TransferFinderModal';
import TransferDetailsModal from './components/TransferDetails';
import TransfersErrors from './components/TransfersErrors';
import TransfersErrorsChart from './components/TransfersErrorsChart';
import TransfersSuccessPerc from './components/TransfersSuccessPerc';
import TransfersAvgTime from './components/TransfersAvgTime';
import TransfersStatuses from './components/TransfersStatuses';
import './Transfers.css';

const stateProps = (state: State) => ({
  transfersErrors: selectors.getTransfersErrors(state),
  transfersErrorsError: selectors.getTransfersErrorsError(state),
  isTransfersErrorsViewAllActive: selectors.getIsTransfersErrorsViewAllActive(state),
  isTransfersErrorsPending: selectors.getIsTransfersErrorsPending(state),
  transfersStatuses: selectors.getTransfersStatuses(state),
  transfersStatusesError: selectors.getTransfersStatusesError(state),
  isTransfersStatusesPending: selectors.getIsTransfersStatusesPending(state),
  isTransferFinderModalVisible: selectors.getIsTransferFinderModalVisible(state),
  transfersSuccessPerc: selectors.getTransfersSuccessPercTransformed(state),
  transfersSuccessPercError: selectors.getTransfersSuccessPercError(state),
  isTransfersSuccessPercPending: selectors.getIsTransfersSuccessPercPending(state),
  transfersAvgTime: selectors.getTransfersAvgTimeTransformed(state),
  transfersAvgTimeError: selectors.getTransfersAvgTimeError(state),
  isTransfersAvgTimePending: selectors.getIsTransfersAvgTimePending(state),
  isTransferDetailsModalVisible: selectors.getIsTransferDetailsModalVisible(state),
});

const dispatchProps = (dispatch: Dispatch) => ({
  onViewAllReconcilationErrorsButtonClick: () => dispatch(actions.toggleTransfersErrorsViewAll()),
  onTransferFinderButtonClick: () => dispatch(actions.toggleTransferFinderModal()),
  onModalCloseClick: () => dispatch(actions.toggleTransferFinderModal()),
  onTransferRowClick: (transferError: TransferError) => {
    dispatch(actions.requestTransferDetails({ transferId: transferError.id }));
  },
});

type TransfersProps = {
  transfersErrors: TransferError[];
  transfersErrorsError: string | null;
  isTransfersErrorsViewAllActive: boolean;
  isTransfersErrorsPending?: boolean;
  isTransferFinderModalVisible: boolean;
  isTransferDetailsModalVisible: boolean;
  transfersStatuses: TransfersStatus[];
  transfersStatusesError: string | null;
  isTransfersStatusesPending: boolean;
  transfersSuccessPerc?: XYCoordinate[];
  transfersSuccessPercError: string | null;
  isTransfersSuccessPercPending: boolean;
  transfersAvgTime?: XYCoordinate[];
  transfersAvgTimeError: string | null;
  isTransfersAvgTimePending: boolean;
  onViewAllReconcilationErrorsButtonClick: () => void;
  onTransferFinderButtonClick: () => void;
  onTransferRowClick: (transferError: TransferError) => void;
};

const Transfers: FC<TransfersProps> = ({
  transfersErrors,
  transfersErrorsError,
  isTransfersErrorsViewAllActive,
  isTransfersErrorsPending,
  isTransferFinderModalVisible,
  isTransferDetailsModalVisible,
  transfersStatuses,
  transfersStatusesError,
  isTransfersStatusesPending,
  transfersSuccessPerc,
  transfersSuccessPercError,
  isTransfersSuccessPercPending,
  transfersAvgTime,
  transfersAvgTimeError,
  isTransfersAvgTimePending,
  onViewAllReconcilationErrorsButtonClick,
  onTransferFinderButtonClick,
  onTransferRowClick,
}) => {
  return (
    <div className="transfers">
      <Heading size="3">Transfers Overview</Heading>
      <Row style={{ marginBottom: '20px' }}>
        <Button onClick={onTransferFinderButtonClick} label="Find a Transfer" kind="secondary" />
      </Row>
      <TransfersSuccessPerc
        data={transfersSuccessPerc}
        error={transfersSuccessPercError}
        isPending={isTransfersSuccessPercPending}
      />
      <TransfersAvgTime
        data={transfersAvgTime}
        error={transfersAvgTimeError}
        isPending={isTransfersAvgTimePending}
      />
      <TransfersStatuses
        isPending={isTransfersStatusesPending}
        items={transfersStatuses}
        error={transfersStatusesError}
      />
      <TransfersErrorsChart />
      <TransfersErrors
        isPending={isTransfersErrorsPending}
        items={transfersErrors}
        error={transfersErrorsError}
        onViewAllClick={onViewAllReconcilationErrorsButtonClick}
        isViewAllActive={isTransfersErrorsViewAllActive}
        onTransferRowClick={onTransferRowClick}
      />
      {isTransferFinderModalVisible && <TransferFinderModal />}
      {isTransferDetailsModalVisible && <TransferDetailsModal />}
    </div>
  );
};

export default loadTransfers(connect(stateProps, dispatchProps)(Transfers));
