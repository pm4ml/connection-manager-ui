import { CertificateValidationResults, ErrorMessage, CertInfo } from 'App/types';

export const RESET_DFSP_SC = 'DFSP SC / Reset';
export const SET_DFSP_SC_ERROR = 'DFSP SC / Set Root Cert Error';
export const SET_DFSP_SC_ROOT_CERTIFICATE = 'DFSP SC / Set Root Certificate';
export const SET_DFSP_SC_INTERMEDIATE_CHAIN = 'DFSP SC / Set Intermediate Chain';
export const SET_DFSP_SC_SERVER_CERTIFICATE = 'DFSP SC / Set Server Certificate';
export const SET_DFSP_SC_ROOT_CERTIFICATE_INFO = 'DFSP SC / Set Root Certificate Info';
export const SET_DFSP_SC_INTERMEDIATE_CHAIN_INFO = 'DFSP SC / Set Intermediate Chain Info';
export const SET_DFSP_SC_SERVER_CERTIFICATE_INFO = 'DFSP SC / Set Server Certificate Info';
export const SET_DFSP_SC_VALIDATIONS = 'DFSP SC / Set Validations';
export const SET_DFSP_SC_VALIDATION_STATE = 'DFSP SC / Set Validation State';
export const CHANGE_DFSP_SC_ROOT_CERTIFICATE = 'DFSP SC / Change Root Certificate';
export const CHANGE_DFSP_SC_INTERMEDIATE_CHAIN = 'DFSP SC / Change Intermediate Chain';
export const CHANGE_DFSP_SC_SERVER_CERTIFICATE = 'DFSP SC / Change Server Certificate';
export const SHOW_DFSP_SC_ROOT_CERTIFICATE_MODAL = 'DFSP SC / Show Root Certificate Modal';
export const HIDE_DFSP_SC_ROOT_CERTIFICATE_MODAL = 'DFSP SC / Hide Root Certificate Modal';
export const SHOW_DFSP_SC_INTERMEDIATE_CHAIN_MODAL = 'DFSP SC / Show Intermediate Chain Modal';
export const HIDE_DFSP_SC_INTERMEDIATE_CHAIN_MODAL = 'DFSP SC / Hide Intermediate Chain Modal';
export const SHOW_DFSP_SC_SERVER_CERTIFICATE_MODAL = 'DFSP SC / Show Server Certificate Modal';
export const HIDE_DFSP_SC_SERVER_CERTIFICATE_MODAL = 'DFSP SC / Hide Server Certificate Modal';
export const SUBMIT_DFSP_SC_SERVER_CERTIFICATE = 'DFSP SC / Submit Server Certificate';
export const STORE_DFSP_SC_SERVER_CERTIFICATE = 'DFSP SC / Store Server Certificate';
export const DOWNLOAD_DFSP_SC_ROOT_CERTIFICATE = 'DFSP SC / Download Root Certificate';
export const DOWNLOAD_DFSP_SC_INTERMEDIATE_CHAIN = 'DFSP SC / Download Intermediate Chain';
export const DOWNLOAD_DFSP_SC_SERVER_CERTIFICATE = 'DFSP SC / Download Server Certificate';

export interface ResetDfspSCAction {
  type: typeof RESET_DFSP_SC;
}

export interface SetDfspSCErrorAction {
  type: typeof SET_DFSP_SC_ERROR;
  error: string;
}

export interface SetDfspSCRootCertificateAction {
  type: typeof SET_DFSP_SC_ROOT_CERTIFICATE;
  certificate: string;
}

export interface SetDfspSCIntermediateChainAction {
  type: typeof SET_DFSP_SC_INTERMEDIATE_CHAIN;
  certificate: string;
}

export interface SetDfspSCServerCertificateAction {
  type: typeof SET_DFSP_SC_SERVER_CERTIFICATE;
  certificate: string;
}

export interface SetDfspSCRootCertificateInfoAction {
  type: typeof SET_DFSP_SC_ROOT_CERTIFICATE_INFO;
  certInfo: CertInfo;
}

export interface SetDfspSCIntermediateChainInfoAction {
  type: typeof SET_DFSP_SC_INTERMEDIATE_CHAIN_INFO;
  certInfo: CertInfo;
}

export interface SetDfspSCServerCertificateInfoAction {
  type: typeof SET_DFSP_SC_SERVER_CERTIFICATE_INFO;
  certInfo: CertInfo;
}

export interface SetDfspSCValidationsAction {
  type: typeof SET_DFSP_SC_VALIDATIONS;
  validations: CertificateValidationResults[];
}

export interface SetDfspSCValidationStateAction {
  type: typeof SET_DFSP_SC_VALIDATION_STATE;
  validationState: string | undefined;
}

export interface ShowDfspSCRootCertificateModalAction {
  type: typeof SHOW_DFSP_SC_ROOT_CERTIFICATE_MODAL;
}

export interface ChangeDfspSCRootCertificateAction {
  type: typeof CHANGE_DFSP_SC_ROOT_CERTIFICATE;
  certificate: string;
}

export interface ChangeDfspSCIntermediateChainAction {
  type: typeof CHANGE_DFSP_SC_INTERMEDIATE_CHAIN;
  certificate: string;
}

export interface ChangeDfspSCServerCertificateAction {
  type: typeof CHANGE_DFSP_SC_SERVER_CERTIFICATE;
  certificate: string;
}

export interface HideDfspSCRootCertificateModalAction {
  type: typeof HIDE_DFSP_SC_ROOT_CERTIFICATE_MODAL;
}

export interface ShowDfspSCIntermediateChainModalAction {
  type: typeof SHOW_DFSP_SC_INTERMEDIATE_CHAIN_MODAL;
}

export interface HideDfspSCIntermediateChainModalAction {
  type: typeof HIDE_DFSP_SC_INTERMEDIATE_CHAIN_MODAL;
}

export interface ShowDfspSCServerCertificateModalAction {
  type: typeof SHOW_DFSP_SC_SERVER_CERTIFICATE_MODAL;
}

export interface HideDfspSCServerCertificateModalAction {
  type: typeof HIDE_DFSP_SC_SERVER_CERTIFICATE_MODAL;
}

export interface SubmitDfspSCServerCertificateAction {
  type: typeof SUBMIT_DFSP_SC_SERVER_CERTIFICATE;
}

export interface StoreDfspSCServerCertificateAction {
  type: typeof STORE_DFSP_SC_SERVER_CERTIFICATE;
}

export interface DownloadDfspSCRootCertificateAction {
  type: typeof DOWNLOAD_DFSP_SC_ROOT_CERTIFICATE;
}

export interface DownloadDfspSCIntermediateChainAction {
  type: typeof DOWNLOAD_DFSP_SC_INTERMEDIATE_CHAIN;
}

export interface DownloadDfspSCServerCertificateAction {
  type: typeof DOWNLOAD_DFSP_SC_SERVER_CERTIFICATE;
}

export type DfspSCActionTypes =
  | SetDfspSCErrorAction
  | ResetDfspSCAction
  | SetDfspSCRootCertificateAction
  | SetDfspSCIntermediateChainAction
  | SetDfspSCServerCertificateAction
  | SetDfspSCRootCertificateInfoAction
  | SetDfspSCIntermediateChainInfoAction
  | SetDfspSCServerCertificateInfoAction
  | SetDfspSCValidationsAction
  | SetDfspSCValidationStateAction
  | ShowDfspSCRootCertificateModalAction
  | ChangeDfspSCRootCertificateAction
  | ChangeDfspSCIntermediateChainAction
  | ChangeDfspSCServerCertificateAction
  | HideDfspSCRootCertificateModalAction
  | ShowDfspSCIntermediateChainModalAction
  | HideDfspSCIntermediateChainModalAction
  | ShowDfspSCServerCertificateModalAction
  | HideDfspSCServerCertificateModalAction;

export interface DfspSCState {
  dfspSCError?: ErrorMessage;
  previousDfspSCRootCertificate?: string;
  previousDfspSCIntermediateChain?: string;
  previousDfspSCServerCertificate?: string;
  dfspSCRootCertificate?: string;
  dfspSCIntermediateChain?: string;
  dfspSCServerCertificate?: string;
  dfspSCRootCertificateInfo?: CertInfo;
  dfspSCIntermediateChainInfo?: CertInfo;
  dfspSCServerCertificateInfo?: CertInfo;
  dfspSCValidations: CertificateValidationResults[];
  dfspSCValidationState?: string;
  isDfspSCRootCertificateModalVisible: boolean;
  isDfspSCIntermediateChainModalVisible: boolean;
  isDfspSCServerCertificateModalVisible: boolean;
}
