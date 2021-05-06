import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';
import * as testers from 'utils/testers';

export const getDfspCsrCertificate = (state: State) =>
  state.wizard.environment.tls.tlsclient.csr.dfspCsrCertificate;
export const getIsDfspCsrModalVisible = (state: State) =>
  state.wizard.environment.tls.tlsclient.csr.isDfspCsrModalVisible;

export const getIsDfspCsrSubmitPending = createSelector(
  (state: State) => state.api,
  isPending('inboundEnrollments.create')
);

export const getIsDfspCsrSubmitEnabled = createSelector(getDfspCsrCertificate, testers.isNotNil);
export const getIsDfspCsrAutogeneratePending = createSelector(
  (state: State) => state.api,
  isPending('inboundEnrollmentsCsr.create')
);
