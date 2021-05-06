import { State } from 'store/types';
import { createSelector } from 'reselect';
import { isPending } from 'utils/api';

import * as testers from 'utils/testers';

export const getDfspHubSCError = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.dfspHubSCError;
export const getPreviousDfspHubSCRootCertificate = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.previousDfspHubSCRootCertificate || '';
export const getPreviousDfspHubSCIntermediateChain = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.previousDfspHubSCIntermediateChain || '';
export const getPreviousDfspHubSCServerCertificate = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.previousDfspHubSCServerCertificate || '';
export const getDfspHubSCRootCertificate = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.dfspHubSCRootCertificate || '';
export const getDfspHubSCIntermediateChain = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.dfspHubSCIntermediateChain || '';
export const getDfspHubSCServerCertificate = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.dfspHubSCServerCertificate || '';
export const getDfspHubSCRootCertificateInfo = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.dfspHubSCRootCertificateInfo;
export const getDfspHubSCIntermediateChainInfo = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.dfspHubSCIntermediateChainInfo;
export const getDfspHubSCServerCertificateInfo = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.dfspHubSCServerCertificateInfo;
export const getDfspHubSCValidations = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.dfspHubSCValidations;
export const getDfspHubSCValidationState = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.dfspHubSCValidationState;
export const getIsDfspHubSCRootCertificateModalVisible = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.isDfspHubSCRootCertificateModalVisible;
export const getIsDfspHubSCIntermediateChainModalVisible = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.isDfspHubSCIntermediateChainModalVisible;
export const getIsDfspHubSCServerCertificateModalVisible = (state: State) =>
  state.wizard.environment.tls.tlsserver.hubsc.isDfspHubSCServerCertificateModalVisible;

export const getIsDfspHubSCReadPending = createSelector(
  (state: State) => state.api,
  isPending('dfspServerCerts.read')
);

const buildDfspHubSCModel = (
  rootCertificate: string,
  intermediateChain: string,
  serverCertificate: string
) => ({
  rootCertificate,
  intermediateChain,
  serverCertificate,
});
const getPreviousDfspHubSCModel = createSelector(
  getPreviousDfspHubSCRootCertificate,
  getPreviousDfspHubSCIntermediateChain,
  getPreviousDfspHubSCServerCertificate,
  buildDfspHubSCModel
);
export const getDfspHubSCModel = createSelector(
  getDfspHubSCRootCertificate,
  getDfspHubSCIntermediateChain,
  getDfspHubSCServerCertificate,
  buildDfspHubSCModel
);

const getIsDfspHubSCModelChanged = createSelector(
  getPreviousDfspHubSCModel,
  getDfspHubSCModel,
  testers.isNotEqual
);
const getIsDfspHubSCServerCertificateValid = createSelector(
  getDfspHubSCServerCertificate,
  testers.isNotNil
);

export const getIsDfspHubSCEditingExistingModel = createSelector(
  getPreviousDfspHubSCServerCertificate,
  testers.isNotNil
);
export const getIsDfspHubSCSubmitEnabled = createSelector(
  getIsDfspHubSCServerCertificateValid,
  getIsDfspHubSCModelChanged,
  testers.getAllAre(true)
);

export const getIsDfspHubSCCreatePending = createSelector(
  (state: State) => state.api,
  isPending('hubServerCerts.create')
);

export const getIsDfspHubSCUpdatePending = createSelector(
  (state: State) => state.api,
  isPending('hubServerCerts.update')
);

export const getIsDfspHubSCSubmitPending = createSelector(
  getIsDfspHubSCCreatePending,
  getIsDfspHubSCUpdatePending,
  testers.getAnyIs(true)
);
