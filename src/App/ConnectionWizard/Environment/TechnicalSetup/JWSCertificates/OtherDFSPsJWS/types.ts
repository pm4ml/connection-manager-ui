import { OtherCertificates } from '../types';

export const RESET_OTHER_DFSPS_JWS = 'Other DFSPs JWS / Reset';
export const SET_OTHER_DFSPS_JWS_ERROR = 'Other DFSPs JWS / Set JWS Cert Error';
export const SET_OTHER_DFSPS_JWS_FILTER = 'Other DFSPs JWS / Set Filter';
export const SET_OTHER_DFSPS_JWS_SAME_MONETARY_ZONE = 'Other DFSPs JWS / Set Same Monetary Zone';
export const SET_OTHER_DFSPS_JWS_CERTIFICATES = 'Other DFSPs JWS / Set Other Certificates';
export const SHOW_OTHER_DFSPS_JWS_CERTIFICATE_MODAL =
  'Other DFSPs JWS / Show JWS Certificate Modal';
export const HIDE_OTHER_DFSPS_JWS_CERTIFICATE_MODAL =
  'Other DFSPs JWS / Hide JWS Certificate Modal';
export const SHOW_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL =
  'Other DFSPs JWS / Show Intermediate Chain Modal';
export const HIDE_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL =
  'Other DFSPs JWS / Hide Intermediate Chain Modal';
export const DOWNLOAD_OTHER_DFSPS_JWS_CERTIFICATE =
  'Other DFSPs JWS / Download Other JWS Certificate';
export const DOWNLOAD_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN =
  'Other DFSPs JWS / Download Other JWS Intermediate Chain';
export const STORE_OTHER_DFSPS_JWS_CERTIFICATE = 'Other DFSPs JWS / Store Other JWS Certificate';

export interface StoreOtherDfspsJWSCertificatesAction {
  type: typeof STORE_OTHER_DFSPS_JWS_CERTIFICATE;
}

export interface ResetOtherDfspsJWSAction {
  type: typeof RESET_OTHER_DFSPS_JWS;
}

export interface SetOtherDfspsJWSErrorAction {
  type: typeof SET_OTHER_DFSPS_JWS_ERROR;
  error: string;
}

export interface DownloadOtherDfspsJWSCertificateAction {
  type: typeof DOWNLOAD_OTHER_DFSPS_JWS_CERTIFICATE;
  cert: string;
}

export interface DownloadDfspsJWSIntermediateChainAction {
  type: typeof DOWNLOAD_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN;
  cert: string;
}

export interface SetOtherDfspsJWSFilterAction {
  type: typeof SET_OTHER_DFSPS_JWS_FILTER;
  value: string;
}

export interface SetOtherDfspsJWSSameMonetaryZoneAction {
  type: typeof SET_OTHER_DFSPS_JWS_SAME_MONETARY_ZONE;
  value: boolean;
}

export interface SetOtherDfspsJWSCertificatesAction {
  type: typeof SET_OTHER_DFSPS_JWS_CERTIFICATES;
  certificates: OtherCertificates[];
}

export interface ShowOtherDfspsJWSCertificateModalAction {
  type: typeof SHOW_OTHER_DFSPS_JWS_CERTIFICATE_MODAL;
  cert: string;
}

export interface HideOtherDfspsJWSCertificateModalAction {
  type: typeof HIDE_OTHER_DFSPS_JWS_CERTIFICATE_MODAL;
}

export interface ShowOtherDfspsJWSIntermediateChainModalAction {
  type: typeof SHOW_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL;
  cert: string;
}

export interface HideOtherDfspsJWSIntermediateChainModalAction {
  type: typeof HIDE_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL;
}

export type OtherDFSPsJWSActionTypes =
  | ResetOtherDfspsJWSAction
  | SetOtherDfspsJWSErrorAction
  | SetOtherDfspsJWSFilterAction
  | SetOtherDfspsJWSSameMonetaryZoneAction
  | SetOtherDfspsJWSCertificatesAction
  | ShowOtherDfspsJWSCertificateModalAction
  | HideOtherDfspsJWSCertificateModalAction
  | ShowOtherDfspsJWSIntermediateChainModalAction
  | HideOtherDfspsJWSIntermediateChainModalAction;

export interface OtherDFSPsJWSState {
  otherDfspsJWSError?: string;
  otherDfspsJWSFilter: string;
  otherDfspsSameMonetaryZone: boolean;
  otherDfspsJWSCertificates: OtherCertificates[];
  otherDfspsJWSCertificateModalContent?: string;
  isOtherDfspsJWSCertificateModalVisible: boolean;
  OtherDfspsJWSIntermediateChainModalContent?: string;
  isOtherDfspsJWSIntermediateChainModalVisible: boolean;
}
