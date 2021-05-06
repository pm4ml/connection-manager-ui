import {
  REQUEST_TRANSFERS_PAGE_DATA,
  RequestTransfersPageDataAction,
  REQUEST_TRANSFERS_ERRORS,
  SET_TRANSFERS_ERRORS,
  SET_TRANSFERS_ERRORS_ERROR,
  TOGGLE_TRANSFERS_ERRORS_VIEW_ALL,
  SET_TRANSFERS_ERRORS_TYPE_FILTER,
  RequestTransfersErrorsAction,
  SetTransfersErrorsAction,
  SetTransfersErrorsErrorAction,
  ToggleTransfersErrorsViewAllAction,
  SetTransfersErrorsTypeFilterAction,
  TOGGLE_TRANSFER_FINDER_MODAL,
  ToggleTransferFinderModalAction,
  SET_TRANSFER_FINDER_FILTER,
  SetTransferFinderFilterAction,
  REQUEST_TRANSFERS,
  UNREQUEST_TRANSFERS,
  SET_TRANSFERS,
  SET_TRANSFERS_ERROR,
  RequestTransfersAction,
  UnrequestTransfersAction,
  SetTransfersAction,
  SetTransfersErrorAction,
  REQUEST_TRANSFERS_STATUSES,
  SET_TRANSFERS_STATUSES,
  SET_TRANSFERS_STATUSES_ERROR,
  RequestTransfersStatusesAction,
  SetTransfersStatusesAction,
  SetTransfersStatusesErrorAction,
  REQUEST_TRANSFERS_SUCCESS_PERC,
  SET_TRANSFERS_SUCCESS_PERC,
  SET_TRANSFERS_SUCCESS_PERC_ERROR,
  REQUEST_TRANSFERS_AVG_TIME,
  SET_TRANSFERS_AVG_TIME,
  SET_TRANSFERS_AVG_TIME_ERROR,
  RequestTransfersSuccessPercAction,
  SetTransfersSuccessPercAction,
  SetTransfersSuccessPercErrorAction,
  RequestTransfersAvgTimeAction,
  SetTransfersAvgTimeAction,
  SetTransfersAvgTimeErrorAction,
  TransferError,
  Transfer,
  TransferDetails,
  TransferFilter,
  TransfersStatus,
  SuccessPerc,
  AvgTime,
  REQUEST_TRANSFER_DETAILS,
  SET_TRANSFER_DETAILS,
  RequestTransferDetailsAction,
  SetTransferDetailsAction,
  ToggleTransferDetailsModalAction,
  TOGGLE_TRANSFER_DETAILS_MODAL,
  SetTransferDetailsErrorAction,
  SET_TRANSFER_DETAILS_ERROR,
} from './types';

export function requestTransfersPageData(): RequestTransfersPageDataAction {
  return {
    type: REQUEST_TRANSFERS_PAGE_DATA,
  };
}

export function setTransfersErrors({ data }: { data: TransferError[] }): SetTransfersErrorsAction {
  return {
    type: SET_TRANSFERS_ERRORS,
    data,
  };
}

export function setTransfersErrorsError({
  error,
}: {
  error: string;
}): SetTransfersErrorsErrorAction {
  return {
    type: SET_TRANSFERS_ERRORS_ERROR,
    error,
  };
}

export function requestTransfersErrors(): RequestTransfersErrorsAction {
  return {
    type: REQUEST_TRANSFERS_ERRORS,
  };
}

// eslint-disable-next-line max-len
export function toggleTransfersErrorsViewAll(): ToggleTransfersErrorsViewAllAction {
  return {
    type: TOGGLE_TRANSFERS_ERRORS_VIEW_ALL,
  };
}

// eslint-disable-next-line max-len
export function setTransfersErrorsTypeFilter({
  filter,
}: {
  filter: string;
}): SetTransfersErrorsTypeFilterAction {
  return {
    type: SET_TRANSFERS_ERRORS_TYPE_FILTER,
    filter,
  };
}

export function toggleTransferFinderModal(): ToggleTransferFinderModalAction {
  return {
    type: TOGGLE_TRANSFER_FINDER_MODAL,
  };
}

export function setTransferFinderFilter({
  field,
  value,
}: {
  field: string;
  value: string | number;
}): SetTransferFinderFilterAction {
  return {
    type: SET_TRANSFER_FINDER_FILTER,
    field,
    value,
  };
}

export function setTransfers({ data }: { data: Transfer[] }): SetTransfersAction {
  return {
    type: SET_TRANSFERS,
    data,
  };
}

export function setTransfersError({ error }: { error: string }): SetTransfersErrorAction {
  return {
    type: SET_TRANSFERS_ERROR,
    error,
  };
}

export function requestTransfers({ filters }: { filters: TransferFilter }): RequestTransfersAction {
  return {
    type: REQUEST_TRANSFERS,
    filters,
  };
}

export function unrequestTransfers(): UnrequestTransfersAction {
  return {
    type: UNREQUEST_TRANSFERS,
  };
}

export function setTransfersStatuses({
  data,
}: {
  data: TransfersStatus[];
}): SetTransfersStatusesAction {
  return {
    type: SET_TRANSFERS_STATUSES,
    data,
  };
}

export function setTransfersStatusesError({
  error,
}: {
  error: string;
}): SetTransfersStatusesErrorAction {
  return {
    type: SET_TRANSFERS_STATUSES_ERROR,
    error,
  };
}

export function requestTransfersStatuses(): RequestTransfersStatusesAction {
  return {
    type: REQUEST_TRANSFERS_STATUSES,
  };
}

export function requestTransferDetails({
  transferId,
}: {
  transferId: string;
}): RequestTransferDetailsAction {
  return {
    type: REQUEST_TRANSFER_DETAILS,
    transferId,
  };
}

export function setTransferDetails({ data }: { data: TransferDetails }): SetTransferDetailsAction {
  return {
    type: SET_TRANSFER_DETAILS,
    data,
  };
}

export function setTransferDetailsError({
  error,
}: {
  error: string;
}): SetTransferDetailsErrorAction {
  return {
    type: SET_TRANSFER_DETAILS_ERROR,
    error,
  };
}

export function toggleTransferDetailsModal(): ToggleTransferDetailsModalAction {
  return {
    type: TOGGLE_TRANSFER_DETAILS_MODAL,
  };
}

export function requestTransfersSuccessPerc(): RequestTransfersSuccessPercAction {
  return {
    type: REQUEST_TRANSFERS_SUCCESS_PERC,
  };
}

export function setTransfersSuccessPerc({
  data,
}: {
  data: SuccessPerc;
}): SetTransfersSuccessPercAction {
  return {
    type: SET_TRANSFERS_SUCCESS_PERC,
    data,
  };
}

export function setTransfersSuccessPercError({
  error,
}: {
  error: string;
}): SetTransfersSuccessPercErrorAction {
  return {
    type: SET_TRANSFERS_SUCCESS_PERC_ERROR,
    error,
  };
}

export function requestTransfersAvgTime(): RequestTransfersAvgTimeAction {
  return {
    type: REQUEST_TRANSFERS_AVG_TIME,
  };
}

export function setTransfersAvgTime({ data }: { data: AvgTime }): SetTransfersAvgTimeAction {
  return {
    type: SET_TRANSFERS_AVG_TIME,
    data,
  };
}

export function setTransfersAvgTimeError({
  error,
}: {
  error: string;
}): SetTransfersAvgTimeErrorAction {
  return {
    type: SET_TRANSFERS_AVG_TIME_ERROR,
    error,
  };
}
