import { all, call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { Action } from 'redux';
import apis from 'utils/apis';
import { is20x } from 'utils/http';
import {
  REQUEST_TRANSFERS_PAGE_DATA,
  REQUEST_TRANSFERS_ERRORS,
  REQUEST_TRANSFERS,
  REQUEST_TRANSFERS_STATUSES,
  REQUEST_TRANSFERS_SUCCESS_PERC,
  REQUEST_TRANSFERS_AVG_TIME,
  REQUEST_TRANSFER_DETAILS,
  RequestTransfersAction,
  RequestTransfersErrorsAction,
  RequestTransfersStatusesAction,
  RequestTransfersSuccessPercAction,
  RequestTransfersAvgTimeAction,
  RequestTransferDetailsAction,
  SuccessPercApi,
  AvgTimeApi,
} from './types';
import {
  setTransfers,
  setTransfersError,
  setTransfersErrors,
  setTransfersErrorsError,
  setTransfersStatuses,
  setTransfersStatusesError,
  setTransfersSuccessPerc,
  setTransfersSuccessPercError,
  setTransfersAvgTime,
  setTransfersAvgTimeError,
  setTransferDetailsError,
  setTransferDetails,
} from './actions';

export function* fetchTransfersErrors(action: RequestTransfersErrorsAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.transfersErrors.read, {});
    if (is20x(response.status)) {
      yield put(setTransfersErrors({ data: response.data }));
    } else {
      yield put(setTransfersErrorsError({ error: response.status }));
    }
  } catch (e) {
    yield put(setTransfersErrorsError({ error: e.message }));
  }
}

export function* transfersErrorsSaga() {
  yield takeLatest([REQUEST_TRANSFERS_ERRORS], fetchTransfersErrors);
}

function* fetchTransfers(action: RequestTransfersAction) {
  try {
    let params;
    if (action.filters.transferId) {
      params = {
        id: action.filters.transferId,
      };
    } else {
      params = {
        startTimestamp: new Date(action.filters.from as number).toISOString(),
        endTimestamp: new Date(action.filters.to as number).toISOString(),
        institution: action.filters.institution,
        status: action.filters.status,
      };
    }
    // eslint-disable-next-line
    const response = yield call(apis.transfers.read, { params });
    if (is20x(response.status)) {
      yield put(setTransfers({ data: response.data.slice(0, 50) }));
    } else {
      yield put(setTransfersError({ error: response.status }));
    }
  } catch (e) {
    yield put(setTransfersError({ error: e.message }));
  }
}

export function* transfersSaga() {
  yield takeLatest([REQUEST_TRANSFERS], fetchTransfers);
}

function* fetchTransfersStatuses(action: RequestTransfersStatusesAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.transfersStatuses.read, {});
    if (is20x(response.status)) {
      yield put(setTransfersStatuses({ data: response.data }));
    } else {
      yield put(setTransfersStatusesError({ error: response.status }));
    }
  } catch (e) {
    yield put(setTransfersStatusesError({ error: e.message }));
  }
}

export function* transfersStatusesSaga() {
  yield takeLatest([REQUEST_TRANSFERS_STATUSES], fetchTransfersStatuses);
}

function* fetchTransfersSuccessPerc(action: RequestTransfersSuccessPercAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.transfersSuccessPerc.read, {
      params: { minutePrevious: 1440 },
    });
    yield put(
      setTransfersSuccessPerc({
        data: {
          color: '',
          points: response.data.map((d: SuccessPercApi) => {
            return [Number(d.timestamp), Number(d.percentage)];
          }),
        },
      })
    );
  } catch (e) {
    yield put(setTransfersSuccessPercError({ error: e.message }));
  }
}

export function* transfersSuccessPercSaga() {
  yield takeLatest([REQUEST_TRANSFERS_SUCCESS_PERC], fetchTransfersSuccessPerc);
}

function* fetchTransfersAvgTime(action: RequestTransfersAvgTimeAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.transfersAvgTime.read, { params: { minutePrevious: 1440 } });

    yield put(
      setTransfersAvgTime({
        data: {
          color: '',
          points: response.data.map((d: AvgTimeApi) => {
            return [Number(d.timestamp), Number(d.averageResponseTime)];
          }),
        },
      })
    );
  } catch (e) {
    yield put(setTransfersAvgTimeError({ error: e.message }));
  }
}

export function* transfersAvgTimeSaga() {
  yield takeLatest([REQUEST_TRANSFERS_AVG_TIME], fetchTransfersAvgTime);
}

function* fetchTransferDetails(action: RequestTransferDetailsAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.transferDetails.read, { transferId: action.transferId });

    if (is20x(response.status)) {
      yield put(setTransferDetails({ data: response.data }));
    } else {
      yield put(setTransferDetailsError({ error: response.status }));
    }
  } catch (e) {
    yield put(setTransferDetailsError({ error: e.message }));
  }
}

export function* transferDetailsSaga() {
  yield takeEvery([REQUEST_TRANSFER_DETAILS], fetchTransferDetails);
}

function* fetchTransfersAllData(action: Action) {
  yield all([
    call(fetchTransfersErrors, action),
    call(fetchTransfersStatuses, action),
    call(fetchTransfersSuccessPerc, action),
    call(fetchTransfersAvgTime, action),
  ]);
}

export function* transfersPageSaga() {
  yield takeLatest([REQUEST_TRANSFERS_PAGE_DATA], fetchTransfersAllData);
}

export default function* rootSaga() {
  yield all([
    transfersPageSaga(),
    transfersErrorsSaga(),
    transfersSaga(),
    transfersStatusesSaga(),
    transfersSuccessPercSaga(),
    transfersAvgTimeSaga(),
    transferDetailsSaga(),
  ]);
}
