import { createSelector } from 'reselect';
import { State } from 'store/types';
import { is422, is400, is500 } from 'utils/http';
import get from 'lodash/get';

export const getIsSuccessToastVisible = (state: State) => state.app.isSuccessToastVisible;
export const getIsErrorModalVisible = (state: State) => state.app.isErrorModalVisible;
export const getErrorModalPayload = (state: State) => state.app.errorModalPayload;

export const getUser = (state: State) => state.app.user;

export const getErrorModalContent = createSelector(getErrorModalPayload, (payload) => {
  if (payload === undefined) {
    return undefined;
  }
  if (typeof payload === 'string') {
    return payload;
  }
  if (typeof payload === 'object') {
    if (payload.status && payload.data) {
      if (is422(payload.status)) {
        return 'The was an error processing the request content';
      }
      if (is400(payload.status)) {
        return get(payload.data, 'error.message');
      }
      if (is500(payload.status)) {
        return 'There was an internal error. Please try again later';
      }
    }
    return '';
  }
  return 'There was an error. Please try again later';
});

export const getMetrics = (state: State) => state.app.metricsData;
