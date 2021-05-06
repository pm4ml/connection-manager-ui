import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux';
import apis from 'utils/apis';
import { fetchTransfersErrors } from 'App/Transfers/sagas';
import { is20x } from 'utils/http';
import {
  REQUEST_DASHBOARD_PAGE_DATA,
  REQUEST_RECONCILIATION_OVERVIEW_BATCHES,
  SELECT_RECONCILIATION_OVERVIEW_BATCH,
  SELECT_RECONCILIATION_OVERVIEW_BATCH_TRANSFER,
  REQUEST_WEEKLY_POSITIONS,
  REQUEST_WEEKLY_FLOWS,
  SelectReconciliationOverviewBatchAction,
  SelectReconciliationOverviewBatchTransferAction,
  RequestReconciliationOverviewBatchesAction,
  RequestWeeklyPositionsAction,
  RequestWeeklyFlowsAction,
} from './types';
import {
  setReconciliationOverviewBatches,
  setReconciliationOverviewBatchesError,
  setReconciliationOverviewBatchTransfers,
  setReconciliationOverviewBatchTransfersError,
  setReconciliationOverviewBatchTransferDetails,
  setReconciliationOverviewBatchTransferDetailsError,
  setWeeklyPositions,
  setWeeklyPositionsError,
  setWeeklyFlows,
  setWeeklyFlowsError,
} from './actions';
// TODO: use helpers with api chart data import * as helpers from './helpers';
import { weeklyPositions, weeklyFlows } from './_mockData';

function* fetchReconciliationOverviewBatches(action: RequestReconciliationOverviewBatchesAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.batches.read, {});
    if (is20x(response.status)) {
      yield put(setReconciliationOverviewBatches({ data: response.data }));
    } else {
      yield put(setReconciliationOverviewBatchesError({ error: response.status }));
    }
  } catch (e) {
    yield put(setReconciliationOverviewBatchesError({ error: e.message }));
  }
}

export function* reconciliationOverviewBatchesSaga() {
  yield takeLatest([REQUEST_RECONCILIATION_OVERVIEW_BATCHES], fetchReconciliationOverviewBatches);
}

function* fetchReconciliationOverviewBatchTransfers(
  action: SelectReconciliationOverviewBatchAction
) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.batchTransfers.read, { batchId: action.item.id });
    if (is20x(response.status)) {
      yield put(setReconciliationOverviewBatchTransfers({ data: response.data.slice(0, 100) }));
    } else {
      yield put(setReconciliationOverviewBatchTransfersError({ error: response.status }));
    }
  } catch (e) {
    yield put(setReconciliationOverviewBatchTransfersError({ error: e.message }));
  }
}

export function* reconciliationOverviewBatchTransfersSaga() {
  yield takeLatest(
    [SELECT_RECONCILIATION_OVERVIEW_BATCH],
    fetchReconciliationOverviewBatchTransfers
  );
}

function* fetchReconciliationOverviewBatchTransferDetails(
  action: SelectReconciliationOverviewBatchTransferAction
) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.transferDetails.read, {
      transferId: action.item.id,
    });
    if (is20x(response.status)) {
      yield put(
        setReconciliationOverviewBatchTransferDetails({
          data: response.data,
        })
      );
    } else {
      yield put(setReconciliationOverviewBatchTransferDetailsError({ error: response.status }));
    }
  } catch (e) {
    yield put(setReconciliationOverviewBatchTransferDetailsError({ error: e.message }));
  }
}

export function* reconciliationOverviewBatchTransferDetailsSaga() {
  yield takeLatest(
    [SELECT_RECONCILIATION_OVERVIEW_BATCH_TRANSFER],
    fetchReconciliationOverviewBatchTransferDetails
  );
}

function* fetchWeeklyPositions(action: RequestWeeklyPositionsAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.weeklyPositions.read, {
      params: { hoursPrevious: 24 * 7 },
    });
    yield put(
      setWeeklyPositions({
        data: weeklyPositions,
        // TODO: use real data
        /* helpers.toLineChartData(response.data, [
          { key: 'position', color: '#4fc7e7' },
          { key: 'reserved', color: '#12d670' },
          { key: 'committed', color: '#ff9016' },
          { key: 'liquidity', color: '#e23a54' },
        ]),
        */
      })
    );
  } catch (e) {
    yield put(setWeeklyPositionsError({ error: e.message }));
  }
}

export function* weeklyPositionsSaga() {
  yield takeLatest([REQUEST_WEEKLY_POSITIONS], fetchWeeklyPositions);
}

interface Flow {
  inbound: string;
  outbound: string;
  timestamp: string;
}
function* fetchWeeklyFlows(action: RequestWeeklyFlowsAction) {
  try {
    // eslint-disable-next-line
    const response = yield call(apis.weeklyFlows.read, {
      params: { hoursPrevious: 24 * 7 },
    });
    yield put(
      setWeeklyFlows({
        data: weeklyFlows,
        // TODO use real api data helpers.toLineChartData(response.data, [
        /*
        {
            color: '#4fc7e7',
            key: 'inbound',
          },
          {
            color: '#e23a54',
            key: 'outbound',
          },
        ]),
        */
      })
    );
  } catch (e) {
    yield put(setWeeklyFlowsError({ error: e.message }));
  }
}

export function* weeklyFlowsSaga() {
  yield takeLatest([REQUEST_WEEKLY_FLOWS], fetchWeeklyFlows);
}

function* fetchOverviewAllData(action: Action) {
  yield all([
    call(fetchReconciliationOverviewBatches, action),
    call(fetchWeeklyPositions, action),
    call(fetchWeeklyFlows, action),
    call(fetchTransfersErrors, action),
  ]);
}

export function* dashboardPageSaga() {
  yield takeLatest([REQUEST_DASHBOARD_PAGE_DATA], fetchOverviewAllData);
}

export default function* rootSaga() {
  yield all([
    dashboardPageSaga(),
    reconciliationOverviewBatchesSaga(),
    reconciliationOverviewBatchTransfersSaga(),
    reconciliationOverviewBatchTransferDetailsSaga(),
    weeklyPositionsSaga(),
    weeklyFlowsSaga(),
  ]);
}
