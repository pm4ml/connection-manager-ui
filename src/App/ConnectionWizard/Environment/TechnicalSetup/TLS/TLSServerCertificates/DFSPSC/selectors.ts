import { State } from 'store/types';
import { createSelector } from 'reselect';
import { isPending } from 'utils/api';

import * as testers from 'utils/testers';

export const getDfspSCError = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.dfspSCError;
export const getPreviousDfspSCRootCertificate = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.previousDfspSCRootCertificate || '';
export const getPreviousDfspSCIntermediateChain = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.previousDfspSCIntermediateChain || '';
export const getPreviousDfspSCServerCertificate = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.previousDfspSCServerCertificate || '';
export const getDfspSCRootCertificate = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.dfspSCRootCertificate || '';
export const getDfspSCIntermediateChain = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.dfspSCIntermediateChain || '';
export const getDfspSCServerCertificate = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.dfspSCServerCertificate || '';
export const getDfspSCRootCertificateInfo = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.dfspSCRootCertificateInfo;
export const getDfspSCIntermediateChainInfo = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.dfspSCIntermediateChainInfo;
export const getDfspSCServerCertificateInfo = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.dfspSCServerCertificateInfo;
export const getDfspSCValidations = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.dfspSCValidations;
export const getDfspSCValidationState = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.dfspSCValidationState;
export const getIsDfspSCRootCertificateModalVisible = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.isDfspSCRootCertificateModalVisible;
export const getIsDfspSCIntermediateChainModalVisible = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.isDfspSCIntermediateChainModalVisible;
export const getIsDfspSCServerCertificateModalVisible = (state: State) =>
  state.wizard.environment.tls.tlsserver.dfsps.isDfspSCServerCertificateModalVisible;

export const getIsDfspSCReadPending = createSelector(
  (state: State) => state.api,
  isPending('dfspServerCerts.read')
);

const buildDfspSCModel = (
  rootCertificate: string,
  intermediateChain: string,
  serverCertificate: string
) => ({
  rootCertificate,
  intermediateChain,
  serverCertificate,
});
const getPreviousDfspSCModel = createSelector(
  getPreviousDfspSCRootCertificate,
  getPreviousDfspSCIntermediateChain,
  getPreviousDfspSCServerCertificate,
  buildDfspSCModel
);
export const getDfspSCModel = createSelector(
  getDfspSCRootCertificate,
  getDfspSCIntermediateChain,
  getDfspSCServerCertificate,
  buildDfspSCModel
);

const getIsDfspSCModelChanged = createSelector(
  getPreviousDfspSCModel,
  getDfspSCModel,
  testers.isNotEqual
);
const getIsDfspSCServerCertificateValid = createSelector(
  getDfspSCServerCertificate,
  testers.isNotNil
);

export const getIsDfspSCEditingExistingModel = createSelector(
  getPreviousDfspSCServerCertificate,
  testers.isNotNilNorEmpty
);
export const getIsDfspSCSubmitEnabled = createSelector(
  getIsDfspSCServerCertificateValid,
  getIsDfspSCModelChanged,
  testers.getAllAre(true)
);

export const getIsDfspSCCreatePending = createSelector(
  (state: State) => state.api,
  isPending('dfspServerCerts.create')
);

export const getIsDfspSCUpdatePending = createSelector(
  (state: State) => state.api,
  isPending('dfspServerCerts.update')
);

export const getIsDfspSCSubmitPending = createSelector(
  getIsDfspSCCreatePending,
  getIsDfspSCUpdatePending,
  testers.getAnyIs(true)
);
