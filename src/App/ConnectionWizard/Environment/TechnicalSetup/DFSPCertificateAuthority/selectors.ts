import { State } from 'store/types';
import { createSelector } from 'reselect';
import { isPending } from 'utils/api';
import * as testers from 'utils/testers';

export const getDfspCaError = (state: State) => state.wizard.environment.dfspca.dfspCaError;
export const getDfspCaRootCertificate = (state: State) =>
  state.wizard.environment.dfspca.dfspCaRootCert;
export const getIsDfspCaRootCertificateModalVisible = (state: State) =>
  state.wizard.environment.dfspca.isDfspCaRootCertificateModalVisible;
export const getDfspCaIntermediateChain = (state: State) =>
  state.wizard.environment.dfspca.dfspCaIntermediateChain;
export const getIsDfspCaIntermediateChainModalVisible = (state: State) =>
  state.wizard.environment.dfspca.isDfspCaIntermediateChainModalVisible;
export const getDfspCaValidations = (state: State) =>
  state.wizard.environment.dfspca.dfspCaValidations;
export const getDfspCaValidationState = (state: State) =>
  state.wizard.environment.dfspca.dfspCaValidationState;

export const getIsDfspCaPending = createSelector(
  (state: State) => state.api,
  isPending('dfspCA.create')
);

export const getisAutoGeneratePending = createSelector(
  (state: State) => state.api,
  isPending('dfspAutoCA.create')
);

export const getIsAutoGenerateCAEnabled = createSelector(
  getDfspCaRootCertificate,
  getDfspCaIntermediateChain,
  testers.getAllAre(undefined)
);

export const getDfspCaHubCertificate = (state: State) =>
  state.wizard.environment.dfspca.dfspCaHubCert;
export const getIsDfspCaHubCertificateModalVisible = (state: State) =>
  state.wizard.environment.dfspca.isDfspCaHubCertificateModalVisible;
export const getisDfspCaHubCertificatePending = createSelector(
  (state: State) => state.api,
  isPending('dfspHubCA.create')
);
