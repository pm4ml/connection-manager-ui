import { createSelector } from 'reselect';
import find from 'lodash/find';
import { State } from 'store/types';
import { isPending } from 'utils/api';
import { getDfspMonetaryZoneId, getDfspId, getDfsps } from 'App/ConnectionWizard/selectors';
import { DFSP } from 'App/ConnectionWizard/Environment/Main/types';
import { OtherCertificates } from '../types';

export const getOtherDfsps = createSelector(getDfsps, getDfspId, (dfsps, dfspId) =>
  dfsps.filter((dfsp: DFSP) => dfsp.id !== dfspId)
);

export const getOtherDfspsJWSError = (state: State) =>
  state.wizard.environment.jws.otherdfspjws.otherDfspsJWSError;
export const getOtherDfspsJWSFilter = (state: State) =>
  state.wizard.environment.jws.otherdfspjws.otherDfspsJWSFilter;
export const getOtherDfspsJWSSameMonetaryZone = (state: State) =>
  state.wizard.environment.jws.otherdfspjws.otherDfspsSameMonetaryZone;
export const getOtherDfspsJWSCertificates = (state: State) =>
  state.wizard.environment.jws.otherdfspjws.otherDfspsJWSCertificates;
export const getOtherDfspsJWSCertificateModalContent = (state: State) =>
  state.wizard.environment.jws.otherdfspjws.otherDfspsJWSCertificateModalContent;
export const getIsOtherDfspsJWSCertificateModalVisible = (state: State) =>
  state.wizard.environment.jws.otherdfspjws.isOtherDfspsJWSCertificateModalVisible;
export const getOtherDfspsJWSIntermediateChainModalContent = (state: State) =>
  state.wizard.environment.jws.otherdfspjws.OtherDfspsJWSIntermediateChainModalContent;
export const getIsOtherDfspsJWSIntermediateChainModalVisible = (state: State) =>
  state.wizard.environment.jws.otherdfspjws.isOtherDfspsJWSIntermediateChainModalVisible;

export const getIsOtherDfspsJWSPending = createSelector(
  (state: State) => state.api,
  isPending('otherDfspJWSCerts.read')
);

export const getIsSameMonetaryZoneFilterEnabled = createSelector(
  getDfspMonetaryZoneId,
  (monetaryZoneId) => monetaryZoneId !== undefined
);

const getDfspCertificatesByDfsp = createSelector(
  getOtherDfspsJWSCertificates,
  getOtherDfsps,
  getDfspMonetaryZoneId,
  (certificates, otherDfsps, monetaryZoneId) => {
    return otherDfsps.map((dfsp: DFSP) => {
      const cert = find(certificates, { dfspId: dfsp.id }) as OtherCertificates;
      return {
        ...cert,
        dfspId: dfsp.id,
        dfspName: dfsp.name,
        dfspMonetaryZone: dfsp.monetaryZoneId,
        isDownloadEnabled: dfsp.monetaryZoneId === monetaryZoneId || !monetaryZoneId,
      };
    });
  }
);

export const getFilteredOtherDfspsJWSCertificatesByDfsp = createSelector(
  getDfspCertificatesByDfsp,
  getOtherDfspsJWSFilter,
  getOtherDfspsJWSSameMonetaryZone,
  getDfspMonetaryZoneId,
  (certificates, filter, filterBySameZone, zoneId) => {
    const lowerCaseFilter = filter && filter.toLowerCase();
    return (
      certificates &&
      certificates
        .filter((cert) => cert.dfspName.toLowerCase().includes(lowerCaseFilter))
        .filter((cert) => {
          if (filterBySameZone) {
            return cert.dfspMonetaryZone === zoneId;
          }
          return true;
        })
    );
  }
);
