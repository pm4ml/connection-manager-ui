import { fetchMock, MATCHED } from 'fetch-mock';
import prepareStore, { getStore } from 'tests/store';
import dfsps from 'tests/resources/dfsps.json';

import { resetDfspCsr, setDfspCsrCertificate, showDfspCsrModal, hideDfspCsrModal, submitDfspCsr } from './actions';

import {
  getDfspCsrCertificate,
  getIsDfspCsrModalVisible,
  getIsDfspCsrSubmitPending,
  getIsDfspCsrSubmitEnabled,
} from './selectors';

import { getIsSuccessToastVisible, getIsErrorModalVisible } from 'App/selectors';

import { initialState } from './reducers';

let dispatch;
let getState;

describe('Test the dfsp ca actions', () => {
  beforeEach(async () => {
    const store = getStore();
    ({ dispatch, getState } = store);
  });

  it('Should reset the reducers', () => {
    dispatch(resetDfspCsr());
    expect(getState().dfsp.tls.client.csr).toEqual(initialState);
  });

  it('Should set the CSR', () => {
    dispatch(setDfspCsrCertificate('CSR_CERT'));
    expect(getDfspCsrCertificate(getState())).toBe('CSR_CERT');
  });

  /*it('Should set the validations', () => {
    dispatch(setDfspCsrValidations([]));
    expect(getDfspCsrValidations(getState())).toEqual([]);
  });

  it('Should set the validation state', () => {
    dispatch(setDfspCsrValidationState('VALID'));
    expect(getDfspCsrValidationState(getState())).toBe('VALID');
  });*/

  it('Should show the CSR modal', () => {
    dispatch(showDfspCsrModal());
    expect(getIsDfspCsrModalVisible(getState())).toBe(true);
  });

  it('Should hide the CSR modal', () => {
    dispatch(hideDfspCsrModal());
    expect(getIsDfspCsrModalVisible(getState())).toBe(false);
  });
});

describe('Test the dfsp csr thunk actions', () => {
  const fetchResponse = {
    rootCertificate: 'CSR_CERT',
  };

  beforeEach(async () => {
    const store = prepareStore({ dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should submit the dfsp csr', async () => {
    fetchMock.post('end:/enrollments/inbound', fetchResponse);
    await dispatch(submitDfspCsr());
    expect(fetchMock.calls(MATCHED)).toHaveLength(1);
    expect(getIsSuccessToastVisible(getState())).toBe(true);
  });

  it('Should show the error modal when the submit fails', async () => {
    fetchMock.post('end:/enrollments/inbound', 500);
    await dispatch(submitDfspCsr());
    expect(fetchMock.calls(MATCHED)).toHaveLength(1);
    expect(getIsErrorModalVisible(getState())).toBe(true);
  });
});

describe('Test the submit selectors', () => {
  beforeEach(async () => {
    const store = getStore();
    ({ dispatch, getState } = store);
  });

  it('Should not enable the submit button when certificate is not set', () => {
    dispatch(setDfspCsrCertificate(undefined));
    expect(getIsDfspCsrSubmitEnabled(getState())).toBe(false);
  });

  it('Should enable the submit button when certificate is set', () => {
    dispatch(setDfspCsrCertificate('CSR'));
    expect(getIsDfspCsrSubmitEnabled(getState())).toBe(true);
  });
});

describe('Test the api pending selectors', () => {
  beforeEach(async () => {
    const store = prepareStore({ dfsps, dfspId: dfsps[0].id });
    ({ dispatch, getState } = store);

    fetchMock.restore();
  });

  it('Should detect the api is pending when creating', () => {
    fetchMock.post('end:/enrollments/inbound', 200);
    fetchMock.get('end:/enrollments/inbound', 200);
    dispatch(submitDfspCsr());
    expect(getIsDfspCsrSubmitPending(getState())).toBe(true);
  });

  it('Should detect the api is not pending when finished creating', async () => {
    fetchMock.post('end:/enrollments/inbound', 200);
    fetchMock.get('end:/enrollments/inbound', 200);
    await dispatch(submitDfspCsr());
    expect(getIsDfspCsrSubmitPending(getState())).not.toBe(true);
  });
});
