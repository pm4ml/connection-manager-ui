import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';
import { XYCoordinate, LinesConfig } from '../types';

export const getTransfersErrors = (state: State) => state.transfers.transfersErrors;
export const getTransfersErrorsError = (state: State) => state.transfers.transfersErrorsError;
export const getIsTransfersErrorsPending = createSelector(
  (state: State) => state.api,
  isPending('transfersErrors.read')
);
export const getIsTransfersErrorsViewAllActive = (state: State) =>
  state.transfers.isTransfersErrorsViewAllActive;
export const getTransfersErrorsTypeFilter = (state: State) =>
  state.transfers.transfersErrorsTypeFilter;
export const getIsTransferFinderModalVisible = (state: State) =>
  state.transfers.isTransferFinderModalVisible;
export const getTransferFinderFilter = (state: State) => state.transfers.transferFinderFilter;

export const getFilteredByStatusTransfersErrors = createSelector(
  getTransfersErrors,
  getTransfersErrorsTypeFilter,
  (errors, status) => {
    if (status) {
      return errors.filter((error) => error.errorType === status);
    }
    return errors;
  }
);

export const getIsTransfersRequested = (state: State) => state.transfers.isTransfersRequested;
export const getTransfers = (state: State) => state.transfers.transfers;
export const getTransfersError = (state: State) => state.transfers.transfersError;
export const getIsTransfersPending = createSelector(
  (state: State) => state.api,
  isPending('transfers.read')
);

export const getTransfersStatuses = (state: State) => state.transfers.transfersStatuses;
export const getTransfersStatusesError = (state: State) => state.transfers.transfersStatusesError;
export const getIsTransfersStatusesPending = createSelector(
  (state: State) => state.api,
  isPending('transfersStatuses.read')
);

const transformRawTransferData = (lines?: LinesConfig) => {
  const data: [number, number][] = [];

  const now: Date = new Date();
  const start: Date = new Date();

  start.setSeconds(0);
  start.setMilliseconds(0);
  start.setHours(now.getHours() - 24);

  const fullSeries: [number, number][] = [];

  while (start.getTime() < now.getTime()) {
    fullSeries.push([start.getTime(), 0]);
    start.setMinutes(start.getMinutes() + 1, 0, 0);
  }

  // merge our real data points with the background zero set
  if (lines && lines.points) {
    fullSeries.forEach((p) => {
      const realPoint = lines.points.find((l) => {
        return l[0] === p[0];
      });

      if (realPoint) {
        data.push(realPoint);
        return;
      }
      data.push(p);
    });
  }

  data.sort((a, b) => {
    if (a[0] < b[0]) {
      return -1;
    }
    if (a[0] > b[0]) {
      return 1;
    }
    return 0;
  });

  return data.map((d: [number, number]) => {
    return {
      x: d[0],
      y: d[1],
    } as XYCoordinate;
  });
};

export const getTransfersSuccessPerc = (state: State) => state.transfers.transfersSuccessPerc;
export const getTransfersSuccessPercError = (state: State) =>
  state.transfers.transfersSuccessPercError;
export const getIsTransfersSuccessPercPending = createSelector(
  (state: State) => state.api,
  isPending('transfersSuccessPerc.read')
);
export const getTransfersSuccessPercTransformed = createSelector(
  getTransfersSuccessPerc,
  transformRawTransferData
);

export const getTransfersAvgTime = (state: State) => state.transfers.transfersAvgTime;
export const getTransfersAvgTimeError = (state: State) => state.transfers.transfersAvgTimeError;
export const getIsTransfersAvgTimePending = createSelector(
  (state: State) => state.api,
  isPending('transfersAvgTime.read')
);
export const getTransfersAvgTimeTransformed = createSelector(
  getTransfersAvgTime,
  transformRawTransferData
);

export const getIsTransferDetailsModalVisible = (state: State) =>
  state.transfers.isTransferDetailsModalVisible;

export const getTransferDetails = (state: State) => state.transfers.transferDetails;
export const getTransferDetailsError = (state: State) => state.transfers.transferDetailsError;
export const getIsTransferDetailsPending = createSelector(
  (state: State) => state.api,
  isPending('transferDetails.read')
);
