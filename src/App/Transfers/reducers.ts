import moment from 'moment';
import {
  SET_TRANSFERS_ERRORS,
  SET_TRANSFERS_ERRORS_ERROR,
  TOGGLE_TRANSFERS_ERRORS_VIEW_ALL,
  SET_TRANSFERS_ERRORS_TYPE_FILTER,
  TOGGLE_TRANSFER_FINDER_MODAL,
  SET_TRANSFER_FINDER_FILTER,
  REQUEST_TRANSFERS,
  UNREQUEST_TRANSFERS,
  SET_TRANSFERS,
  SET_TRANSFERS_ERROR,
  SET_TRANSFERS_STATUSES,
  SET_TRANSFERS_STATUSES_ERROR,
  SET_TRANSFERS_SUCCESS_PERC,
  SET_TRANSFERS_SUCCESS_PERC_ERROR,
  SET_TRANSFERS_AVG_TIME,
  SET_TRANSFERS_AVG_TIME_ERROR,
  TransfersActionTypes,
  TransfersState,
  DateRange,
  SET_TRANSFER_DETAILS,
  TOGGLE_TRANSFER_DETAILS_MODAL,
} from './types';

const dateRanges = {
  TODAY: [moment().startOf('day').format('x'), moment().endOf('day').format('x')],
  PAST_48_HOURS: [moment().subtract(48, 'hours').format('x'), moment().format('x')],
  '1_WEEK': [
    moment().subtract(1, 'week').startOf('day').format('x'),
    moment().endOf('day').format('x'),
  ],
  '1_MONTH': [
    moment().subtract(1, 'month').startOf('day').format('x'),
    moment().endOf('day').format('x'),
  ],
  CUSTOM: [moment().startOf('day').format('x'), moment().endOf('day').format('x')],
};

function getFromDateBySelection(range: DateRange) {
  return parseInt(dateRanges[range][0], 10);
}

function getToDateBySelection(range: DateRange) {
  return parseInt(dateRanges[range][1], 10);
}

function getTransferFinderFilterInitialState() {
  return {
    transferId: undefined,
    dates: DateRange.Today,
    from: getFromDateBySelection(DateRange.Today),
    to: getToDateBySelection(DateRange.Today),
    institution: undefined,
    status: undefined,
  };
}

export const initialState: TransfersState = {
  transfersErrors: [],
  transfersErrorsError: null,
  isTransfersErrorsViewAllActive: false,
  transfersErrorsTypeFilter: undefined,
  isTransferFinderModalVisible: false,
  transferFinderFilter: getTransferFinderFilterInitialState(),
  isTransfersRequested: false,
  transfers: [],
  transfersError: null,
  transfersStatuses: [],
  transfersStatusesError: null,
  transfersSuccessPercError: null,
  transfersAvgTimeError: null,
  isTransferDetailsModalVisible: false,
  transferDetailsError: null,
};

export default function transfersReducer(
  state = initialState,
  action: TransfersActionTypes
): TransfersState {
  switch (action.type) {
    case SET_TRANSFERS_ERRORS:
      return {
        ...state,
        transfersErrors: action.data,
      };
    case SET_TRANSFERS_ERRORS_ERROR:
      return {
        ...state,
        transfersErrorsError: action.error,
      };
    case TOGGLE_TRANSFERS_ERRORS_VIEW_ALL:
      return {
        ...state,
        isTransfersErrorsViewAllActive: !state.isTransfersErrorsViewAllActive,
        transfersErrorsTypeFilter: initialState.transfersErrorsTypeFilter,
      };
    case SET_TRANSFERS_ERRORS_TYPE_FILTER:
      return {
        ...state,
        transfersErrorsTypeFilter: action.filter,
      };
    case TOGGLE_TRANSFER_FINDER_MODAL: {
      return {
        ...state,
        isTransferFinderModalVisible: !state.isTransferFinderModalVisible,
        transferFinderFilter: getTransferFinderFilterInitialState(),
        isTransfersRequested: false,
      };
    }
    case TOGGLE_TRANSFER_DETAILS_MODAL: {
      return {
        ...state,
        isTransferDetailsModalVisible: !state.isTransferDetailsModalVisible,
      };
    }
    case SET_TRANSFER_FINDER_FILTER: {
      const { field, value } = action;

      if (field === 'dates' && value) {
        return {
          ...state,
          transferFinderFilter: {
            ...state.transferFinderFilter,
            dates: value,
            from: getFromDateBySelection(value as DateRange),
            to: getToDateBySelection(value as DateRange),
          },
        };
      }
      if (field === 'from' || field === 'to') {
        return {
          ...state,
          transferFinderFilter: {
            ...state.transferFinderFilter,
            [field]: value,
            dates: 'CUSTOM',
          },
        };
      }
      return {
        ...state,
        transferFinderFilter: {
          ...state.transferFinderFilter,
          [field]: value,
        },
      };
    }
    case REQUEST_TRANSFERS:
      return {
        ...state,
        isTransfersRequested: true,
      };
    case UNREQUEST_TRANSFERS:
      return {
        ...state,
        isTransfersRequested: false,
      };
    case SET_TRANSFERS:
      return {
        ...state,
        transfers: action.data,
      };
    case SET_TRANSFERS_ERROR:
      return {
        ...state,
        transfersError: action.error,
      };
    case SET_TRANSFERS_STATUSES:
      return {
        ...state,
        transfersStatuses: action.data,
      };
    case SET_TRANSFERS_STATUSES_ERROR:
      return {
        ...state,
        transfersStatusesError: action.error,
      };
    case SET_TRANSFERS_SUCCESS_PERC:
      return {
        ...state,
        transfersSuccessPerc: action.data,
      };
    case SET_TRANSFERS_SUCCESS_PERC_ERROR:
      return {
        ...state,
        transfersSuccessPercError: action.error,
      };
    case SET_TRANSFERS_AVG_TIME:
      return {
        ...state,
        transfersAvgTime: action.data,
      };
    case SET_TRANSFERS_AVG_TIME_ERROR:
      return {
        ...state,
        transfersAvgTimeError: action.error,
      };
    case SET_TRANSFER_DETAILS:
      return {
        ...state,
        transferDetails: action.data,
        isTransferDetailsModalVisible: true,
      };
    default:
      return state;
  }
}
