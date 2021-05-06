import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';
import { CSR } from '../types';
// import find from 'lodash/find';
// import { getDfspHubExternalCaCertificates } from '../../CertificateAuthorities/HUBExternalCertificateAuthority/selectors';

export const getDfspSentCsrsError = (state: State) =>
  state.wizard.environment.tls.tlsclient.csrs.dfspSentCsrsError;
export const getDfspSentCsrsFilter = (state: State) =>
  state.wizard.environment.tls.tlsclient.csrs.dfspSentCsrsFilter;
export const getDfspSentCsrsCertificates = (state: State) =>
  state.wizard.environment.tls.tlsclient.csrs.dfspSentCsrsCertificates;
export const getIsDfspSentCsrsCertificateModalVisible = (state: State) =>
  state.wizard.environment.tls.tlsclient.csrs.isDfspSentCsrsCertificateModalVisible;
export const getDfspSentCsrsCertificateModalContent = (state: State) =>
  state.wizard.environment.tls.tlsclient.csrs.dfspSentCsrsCertificateModalContent;
export const getDfspSentCsrsCertificateModalTitle = (state: State) =>
  state.wizard.environment.tls.tlsclient.csrs.dfspSentCsrsCertificateModalTitle;

export const getFilteredDfspSentCsrsCertificates = createSelector(
  // getDfspHubExternalCaCertificates,
  getDfspSentCsrsCertificates,
  getDfspSentCsrsFilter,
  (/* cas, */ certificates, filter) => {
    // const findCaById = (id, cas) => find(cas, { id });
    const lowerCaseFilter = filter.toLowerCase();
    return certificates
      .map((csr: CSR) => ({
        ...csr,
        externalCa: undefined, // findCaById(csr.hubCAId, cas),
      }))
      .filter((csr: CSR) => csr.csrInfo.subject.CN.toLowerCase().includes(lowerCaseFilter));
  }
);

export const getIsDfspSentCsrsPending = createSelector(
  (state: State) => state.api,
  isPending('inboundEnrollments.read')
);
