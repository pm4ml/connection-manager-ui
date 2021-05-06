import { createSelector } from 'reselect';
import { State } from 'store/types';
import { isPending } from 'utils/api';
import { States } from '../types';

export const getDfspHubCsrsError = (state: State) =>
  state.wizard.environment.tls.tlsclient.hub.dfspHubCsrsError;
export const getDfspHubCsrsCertificates = (state: State) =>
  state.wizard.environment.tls.tlsclient.hub.dfspHubCsrsCertificates;
export const getIsDfspHubCsrsCertificateModalVisible = (state: State) =>
  state.wizard.environment.tls.tlsclient.hub.isDfspHubCsrsCertificateModalVisible;
export const getDfspHubCsrsCertificateModalContent = (state: State) =>
  state.wizard.environment.tls.tlsclient.hub.dfspHubCsrsCertificateModalContent;
export const getDfspHubCsrsCertificateModalTitle = (state: State) =>
  state.wizard.environment.tls.tlsclient.hub.dfspHubCsrsCertificateModalTitle;

export const getDfspHasUnsignedHubCsrs = createSelector(
  getDfspHubCsrsCertificates,
  (csrs) => csrs.filter((csr) => States.CSR_LOADED === csr.state).length > 0
);

export const getIsDfspHubCsrsPending = createSelector(
  (state: State) => state.api,
  isPending('outboundEnrollments.read')
);
// export const getDfspHubCsrCertificateSigningPendingCollection = createPendingCollectionSelector(
//   'outboundEnrollmentCertificate.create'
// );

export const getIsDfspHubCsrCertificateSigningPendingByEnrollmentId = createSelector(
  (state: State) => state.api,
  (api) => {
    return {
      1: isPending('outboundEnrollmentCertificate.create')(api),
      2: false,
    };
  }
  // getDfspHubCsrsCertificates,
  // getDfspHubCsrCertificateSigningPendingCollection,
  // (csrs, collection) => {
  //   const getByCsrId = getPendingByParameter('enrollmentId');
  //   return csrs
  //     .map((csr) => csr.id)
  //     .reduce(
  //       (prev, id) => ({
  //         ...prev,
  //         [id]: getByCsrId(collection, id),
  //       }),
  //       {}
  //     );
  // }
);

export const getIsDfspHubCsrCertificateAutoSigningPendingByEnrollmentId = createSelector(
  (state: State) => state.api,
  (api) => {
    return {
      1: isPending('outboundEnrollmentAutoCertificate.create')(api),
      2: false,
    };
  }
  // getDfspHubCsrsCertificates,
  // getDfspHubCsrCertificateSigningPendingCollection,
  // (csrs, collection) => {
  //   const getByCsrId = getPendingByParameter('enrollmentId');
  //   return csrs
  //     .map((csr) => csr.id)
  //     .reduce(
  //       (prev, id) => ({
  //         ...prev,
  //         [id]: getByCsrId(collection, id),
  //       }),
  //       {}
  //     );
  // }
);
