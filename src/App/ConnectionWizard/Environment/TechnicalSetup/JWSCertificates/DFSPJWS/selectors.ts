import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';

import * as testers from 'utils/testers';

export const getDfspJWSError = (state: State) => state.wizard.environment.jws.dfspjws.dfspJWSError;
export const getPreviousDfspJWSCertificate = (state: State) =>
  state.wizard.environment.jws.dfspjws.previousDfspJWSCertificate;
export const getPreviousDfspJWSIntermediateChain = (state: State) =>
  state.wizard.environment.jws.dfspjws.previousDfspJWSIntermediateChain;
export const getDfspJWSCertificate = (state: State) =>
  state.wizard.environment.jws.dfspjws.dfspJWSCertificate;
export const getDfspJWSIntermediateChain = (state: State) =>
  state.wizard.environment.jws.dfspjws.dfspJWSIntermediateChain;
export const getDfspJWSCertificateInfo = (state: State) =>
  state.wizard.environment.jws.dfspjws.dfspJWSCertificateInfo;
export const getDfspJWSIntermediateChainInfo = (state: State) =>
  state.wizard.environment.jws.dfspjws.dfspJWSIntermediateChainInfo;
export const getDfspJWSValidations = (state: State) =>
  state.wizard.environment.jws.dfspjws.dfspJWSValidations;
export const getDfspJWSValidationState = (state: State) =>
  state.wizard.environment.jws.dfspjws.dfspJWSValidationState;
export const getIsDfspJWSCertificateModalVisible = (state: State) =>
  state.wizard.environment.jws.dfspjws.isDfspJWSCertificateModalVisible;
export const getIsDfspJWSIntermediateChainModalVisible = (state: State) =>
  state.wizard.environment.jws.dfspjws.isDfspJWSIntermediateChainModalVisible;

const buildDfspJWSModel = (
  jwsCertificate: string | undefined,
  intermediateChain: string | undefined
  // serverCertificate: string | undefined
) => ({
  jwsCertificate,
  intermediateChain,
});
const getPreviousDfspJWSModel = createSelector(
  getPreviousDfspJWSCertificate,
  getPreviousDfspJWSIntermediateChain,
  buildDfspJWSModel
);
export const getDfspJWSModel = createSelector(
  getDfspJWSCertificate,
  getDfspJWSIntermediateChain,
  buildDfspJWSModel
);
const getIsDfspJWSModelChanged = createSelector(
  getPreviousDfspJWSModel,
  getDfspJWSModel,
  testers.isNotEqual
);
const getIsDfspJWSCertificateValid = createSelector(getDfspJWSCertificate, testers.isNotNil);

export const getIsDfspJWSEditingExistingModel = createSelector(
  getPreviousDfspJWSCertificate,
  testers.isNotNil
);
export const getIsDfspJWSSubmitEnabled = createSelector(
  getIsDfspJWSCertificateValid,
  getIsDfspJWSModelChanged,
  testers.getAllAre(true)
);

export const getIsDfspJWSCreatePending = createSelector(
  (state: State) => state.api,
  isPending('dfspJWSCerts.create')
);

export const getIsDfspJWSUpdatePending = createSelector(
  (state: State) => state.api,
  isPending('dfspJWSCerts.update')
);

export const getIsDfspJWSSubmitPending = createSelector(
  getIsDfspJWSCreatePending,
  getIsDfspJWSUpdatePending,
  testers.getAnyIs(true)
);
