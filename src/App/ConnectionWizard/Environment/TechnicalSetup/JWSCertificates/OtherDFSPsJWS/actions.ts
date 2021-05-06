import {
  SET_OTHER_DFSPS_JWS_ERROR,
  SET_OTHER_DFSPS_JWS_CERTIFICATES,
  SHOW_OTHER_DFSPS_JWS_CERTIFICATE_MODAL,
  HIDE_OTHER_DFSPS_JWS_CERTIFICATE_MODAL,
  SHOW_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL,
  HIDE_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL,
  ResetOtherDfspsJWSAction,
  SetOtherDfspsJWSErrorAction,
  SetOtherDfspsJWSFilterAction,
  SetOtherDfspsJWSCertificatesAction,
  ShowOtherDfspsJWSCertificateModalAction,
  HideOtherDfspsJWSCertificateModalAction,
  ShowOtherDfspsJWSIntermediateChainModalAction,
  HideOtherDfspsJWSIntermediateChainModalAction,
  RESET_OTHER_DFSPS_JWS,
  SET_OTHER_DFSPS_JWS_FILTER,
  SET_OTHER_DFSPS_JWS_SAME_MONETARY_ZONE,
  SetOtherDfspsJWSSameMonetaryZoneAction,
  STORE_OTHER_DFSPS_JWS_CERTIFICATE,
  StoreOtherDfspsJWSCertificatesAction,
  DownloadOtherDfspsJWSCertificateAction,
  DOWNLOAD_OTHER_DFSPS_JWS_CERTIFICATE,
  DownloadDfspsJWSIntermediateChainAction,
  DOWNLOAD_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN,
} from './types';
import { OtherCertificates } from '../types';

export function storeOtherDfspsJWSCertificates(): StoreOtherDfspsJWSCertificatesAction {
  return {
    type: STORE_OTHER_DFSPS_JWS_CERTIFICATE,
  };
}

export function downloadOtherDfspsJWSCertificate({
  cert,
}: {
  cert: string;
}): DownloadOtherDfspsJWSCertificateAction {
  return {
    type: DOWNLOAD_OTHER_DFSPS_JWS_CERTIFICATE,
    cert,
  };
}

export function downloadOtherDfspsJWSIntermediateChain({
  cert,
}: {
  cert: string;
}): DownloadDfspsJWSIntermediateChainAction {
  return {
    type: DOWNLOAD_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN,
    cert,
  };
}

export function resetOtherDfspsJWS(): ResetOtherDfspsJWSAction {
  return {
    type: RESET_OTHER_DFSPS_JWS,
  };
}

export function setOtherDfspsJWSError({ error }: { error: string }): SetOtherDfspsJWSErrorAction {
  return {
    type: SET_OTHER_DFSPS_JWS_ERROR,
    error,
  };
}

export function setOtherDfspsJWSFilter({ value }: { value: string }): SetOtherDfspsJWSFilterAction {
  return {
    type: SET_OTHER_DFSPS_JWS_FILTER,
    value,
  };
}

export function setOtherDfspsJWSSameMonetaryZone({
  value,
}: {
  value: boolean;
}): SetOtherDfspsJWSSameMonetaryZoneAction {
  return {
    type: SET_OTHER_DFSPS_JWS_SAME_MONETARY_ZONE,
    value,
  };
}

export function setOtherDfspsJWSCertificates({
  certificates,
}: {
  certificates: OtherCertificates[];
}): SetOtherDfspsJWSCertificatesAction {
  return {
    type: SET_OTHER_DFSPS_JWS_CERTIFICATES,
    certificates,
  };
}

export function showOtherDfspsJWSCertificateModal({
  cert,
}: {
  cert: string;
}): ShowOtherDfspsJWSCertificateModalAction {
  return {
    type: SHOW_OTHER_DFSPS_JWS_CERTIFICATE_MODAL,
    cert,
  };
}

export function hideOtherDfspsJWSCertificateModal(): HideOtherDfspsJWSCertificateModalAction {
  return {
    type: HIDE_OTHER_DFSPS_JWS_CERTIFICATE_MODAL,
  };
}

export function showOtherDfspsJWSIntermediateChainModal({
  cert,
}: {
  cert: string;
}): ShowOtherDfspsJWSIntermediateChainModalAction {
  return {
    type: SHOW_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL,
    cert,
  };
}

// eslint-disable-next-line max-len
export function hideOtherDfspsJWSIntermediateChainModal(): HideOtherDfspsJWSIntermediateChainModalAction {
  return {
    type: HIDE_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL,
  };
}
