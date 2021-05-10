import { ErrorMessage } from 'App/types';
import { CSR } from '../types';

export const RESET_DFSP_HUB_CSRS = 'DFSP HUB CSRs / Reset';
export const SET_DFSP_HUB_CSRS_CERTIFICATES_ERROR = 'DFSP HUB CSRs / Set Root Cert Error';
export const SET_DFSP_HUB_CSRS_CERTIFICATES = 'DFSP HUB CSRs / Set Certificates';
export const SHOW_DFSP_HUB_CSRS_CERTIFICATE_MODAL = 'DFSP HUB CSRs / Show Certificate Modal';
export const HIDE_DFSP_HUB_CSRS_CERTIFICATE_MODAL = 'DFSP HUB CSRs / Hide Certificate Modal';
export const SUBMIT_DFSP_HUB_CSRS_CERTIFICATE = 'DFSP HUB CSRs / Submit Certificate';
export const AUTOGENERATE_DFSP_HUB_CSRS_CERTIFICATE = 'DFSP HUB CSRs / Autogenerate Certificate';
export const REQUEST_DFSP_HUB_CSRS_CERTIFICATES = 'DFSP HUB CSRs / Request CSR Certificates';
export const DOWNLOAD_DFSP_HUB_CSRS_CERTIFICATE = 'DFSP HUB CSRs / Download Certificate';

export enum ValidationStates {
  VALID = 'VALID',
  INVALID = 'INVALID',
}

export interface DfspHubCSRsState {
  dfspHubCsrsError: ErrorMessage;
  dfspHubCsrsCertificates: CSR[];
  isDfspHubCsrsCertificateModalVisible: boolean;
  dfspHubCsrsCertificateModalContent?: string;
  dfspHubCsrsCertificateModalTitle?: string;
}

export interface ResetDfspHubCsrsAction {
  type: typeof RESET_DFSP_HUB_CSRS;
}
export interface SetDfspHubCsrsCertificatesErrorAction {
  type: typeof SET_DFSP_HUB_CSRS_CERTIFICATES_ERROR;
  error: string;
}
export interface SetDfspHubCsrsCertificatesAction {
  type: typeof SET_DFSP_HUB_CSRS_CERTIFICATES;
  certificates: CSR[];
}
export interface ShowDfspHubCsrsCertificateModalAction {
  type: typeof SHOW_DFSP_HUB_CSRS_CERTIFICATE_MODAL;
  certificate: string;
  title: string;
}
export interface HideDfspHubCsrsCertificateModalAction {
  type: typeof HIDE_DFSP_HUB_CSRS_CERTIFICATE_MODAL;
}

export interface SubmitDfspHubCsrsCertificateAction {
  type: typeof SUBMIT_DFSP_HUB_CSRS_CERTIFICATE;
  enrollmentId: number;
}

export interface AutogenerateDfspHubCsrsCertificateAction {
  type: typeof AUTOGENERATE_DFSP_HUB_CSRS_CERTIFICATE;
  enrollmentId: number;
}

export interface DownloadDfspHubCsrsCertificateAction {
  type: typeof DOWNLOAD_DFSP_HUB_CSRS_CERTIFICATE;
  certificate: string;
  cn: string;
  extension: string;
}

export interface RequestDfspHubCsrCertificatesAction {
  type: typeof REQUEST_DFSP_HUB_CSRS_CERTIFICATES;
}

export type DfspHubCSRsActionTypes =
  | ResetDfspHubCsrsAction
  | SetDfspHubCsrsCertificatesErrorAction
  | SetDfspHubCsrsCertificatesAction
  | ShowDfspHubCsrsCertificateModalAction
  | HideDfspHubCsrsCertificateModalAction;