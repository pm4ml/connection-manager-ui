import { ErrorMessage } from 'App/types';
import { CSR } from '../types';

export const RESET_DFSP_SENT_CSRS = 'DFSP Sent CSRs / Reset';
export const SET_DFSP_SENT_CSRS_FILTER = 'DFSP Sent CSRs / Set Filter';
export const SET_DFSP_SENT_CSRS_CERTIFICATES_ERROR = 'DFSP Sent CSRs / Set Error';
export const SET_DFSP_SENT_CSRS_CERTIFICATES = 'DFSP Sent CSRs / Set Certificates';
export const SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL = 'DFSP Sent CSRs / Show Certificate Modal';
export const HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL = 'DFSP Sent CSRs / Hide Certificate Modal';
export const REQUEST_DFSP_SENT_CSR_CERTIFICATE = 'DFSP Sent CSRs / Request CSR Certificate';
export const DOWNLOAD_DFSP_SENT_CSR_CERTIFICATE = 'DFSP Sent CSRs / Download CSR Certificate';

export interface SentCSRsState {
  dfspSentCsrsError: ErrorMessage;
  dfspSentCsrsFilter: string;
  dfspSentCsrsCertificates: CSR[];
  isDfspSentCsrsCertificateModalVisible: boolean;
  dfspSentCsrsCertificateModalContent?: string;
  dfspSentCsrsCertificateModalTitle?: string;
}

export interface ResetDfspSentCsrsAction {
  type: typeof RESET_DFSP_SENT_CSRS;
}
export interface SetDfspSentCsrsCertificatesErrorAction {
  type: typeof SET_DFSP_SENT_CSRS_CERTIFICATES_ERROR;
  error: string;
}
export interface SetDfspSentCsrsFilterAction {
  type: typeof SET_DFSP_SENT_CSRS_FILTER;
  filter: string;
}
export interface SetDfspSentCsrsCertificatesAction {
  type: typeof SET_DFSP_SENT_CSRS_CERTIFICATES;
  certificates: CSR[];
}
export interface ShowDfspSentCsrsCertificateModalAction {
  type: typeof SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL;
  certificate: string;
  title: string;
}
export interface HideDfspSentCsrsCertificateModalAction {
  type: typeof HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL;
}
export interface DownloadDfspSentCsrCertificateAction {
  type: typeof DOWNLOAD_DFSP_SENT_CSR_CERTIFICATE;
  certificate: string;
  extension: string;
}
export interface RequestDfspSentCsrCertificateAction {
  type: typeof REQUEST_DFSP_SENT_CSR_CERTIFICATE;
}

export type DfspSentCSRsActionTypes =
  | ResetDfspSentCsrsAction
  | SetDfspSentCsrsCertificatesErrorAction
  | SetDfspSentCsrsFilterAction
  | SetDfspSentCsrsCertificatesAction
  | ShowDfspSentCsrsCertificateModalAction
  | HideDfspSentCsrsCertificateModalAction
  | DownloadDfspSentCsrCertificateAction
  | RequestDfspSentCsrCertificateAction;
