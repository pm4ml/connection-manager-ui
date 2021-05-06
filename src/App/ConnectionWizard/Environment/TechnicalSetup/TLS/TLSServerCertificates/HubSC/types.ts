import { CertificateValidationResults, ErrorMessage, CertInfo } from 'App/types';

export const RESET_DFSP_HUB_SC = 'DFSP HUB SC / Reset';
export const SET_DFSP_HUB_SC_ERROR = 'DFSP HUB SC / Set Root Cert Error';
export const SET_DFSP_HUB_SC_ROOT_CERTIFICATE = 'DFSP HUB SC / Set Root Certificate';
export const SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN = 'DFSP HUB SC / Set Intermediate Chain';
export const SET_DFSP_HUB_SC_SERVER_CERTIFICATE = 'DFSP HUB SC / Set Server Certificate';
export const SET_DFSP_HUB_SC_ROOT_CERTIFICATE_INFO = 'DFSP HUB SC / Set Root Certificate Info';
export const SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN_INFO = 'DFSP HUB SC / Set Intermediate Chain Info';
export const SET_DFSP_HUB_SC_SERVER_CERTIFICATE_INFO = 'DFSP HUB SC / Set Server Certificate Info';
export const SET_DFSP_HUB_SC_VALIDATIONS = 'DFSP HUB SC / Set Validations';
export const SET_DFSP_HUB_SC_VALIDATION_STATE = 'DFSP HUB SC / Set Validation State';
export const SHOW_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL = 'DFSP HUB SC / Show Root Certificate Modal';
export const HIDE_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL = 'DFSP HUB SC / Hide Root Certificate Modal';
export const SHOW_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL =
  'DFSP HUB SC / Show Intermediate Chain Modal';
export const HIDE_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL =
  'DFSP HUB SC / Hide Intermediate Chain Modal';
export const SHOW_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL =
  'DFSP HUB SC / Show Server Certificate Modal';
export const HIDE_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL =
  'DFSP HUB SC / Hide Server Certificate Modal';
export const SUBMIT_DFSP_HUB_SC_SERVER_CERTIFICATE = 'DFSP HUB SC / Submit Server Certificate';
export const STORE_DFSP_HUB_SC_SERVER_CERTIFICATE = 'DFSP HUB SC / Store Server Certificate';
export const DOWNLOAD_DFSP_HUB_SC_ROOT_CERTIFICATE = 'DFSP HUB SC / Download Root Certificate';
export const DOWNLOAD_DFSP_HUB_SC_INTERMEDIATE_CHAIN = 'DFSP HUB SC / Download Intermediate Chain';
export const DOWNLOAD_DFSP_HUB_SC_SERVER_CERTIFICATE = 'DFSP HUB SC / Download Server Certificate';
export const CHANGE_DFSP_HUB_SC_ROOT_CERTIFICATE = 'DFSP HUB SC / Change Root Certificate';
export const CHANGE_DFSP_HUB_SC_INTERMEDIATE_CHAIN = 'DFSP HUB SC / Change Intermediate Chain';
export const CHANGE_DFSP_HUB_SC_SERVER_CERTIFICATE = 'DFSP HUB SC / Change Server Certificate';

export interface ResetDfspHubSCAction {
  type: typeof RESET_DFSP_HUB_SC;
}

export interface SetDfspHubSCErrorAction {
  type: typeof SET_DFSP_HUB_SC_ERROR;
  error: string;
}

export interface SetDfspHubSCRootCertificateAction {
  type: typeof SET_DFSP_HUB_SC_ROOT_CERTIFICATE;
  certificate: string;
}

export interface SetDfspHubSCIntermediateChainAction {
  type: typeof SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN;
  certificate: string;
}

export interface SetDfspHubSCServerCertificateAction {
  type: typeof SET_DFSP_HUB_SC_SERVER_CERTIFICATE;
  certificate: string;
}

export interface SetDfspHubSCRootCertificateInfoAction {
  type: typeof SET_DFSP_HUB_SC_ROOT_CERTIFICATE_INFO;
  certInfo: CertInfo;
}

export interface SetDfspHubSCIntermediateChainInfoAction {
  type: typeof SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN_INFO;
  certInfo: CertInfo;
}

export interface SetDfspHubSCServerCertificateInfoAction {
  type: typeof SET_DFSP_HUB_SC_SERVER_CERTIFICATE_INFO;
  certInfo: CertInfo;
}

export interface SetDfspHubSCValidationsAction {
  type: typeof SET_DFSP_HUB_SC_VALIDATIONS;
  validations: CertificateValidationResults[];
}

export interface SetDfspHubSCValidationStateAction {
  type: typeof SET_DFSP_HUB_SC_VALIDATION_STATE;
  validationState: string | undefined;
}

export interface ShowDfspHubSCRootCertificateModalAction {
  type: typeof SHOW_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL;
}

export interface ChangeDfspHubSCRootCertificateAction {
  type: typeof CHANGE_DFSP_HUB_SC_ROOT_CERTIFICATE;
  certificate: string;
}

export interface ChangeDfspHubSCIntermediateChainAction {
  type: typeof CHANGE_DFSP_HUB_SC_INTERMEDIATE_CHAIN;
  certificate: string;
}

export interface ChangeDfspHubSCServerCertificateAction {
  type: typeof CHANGE_DFSP_HUB_SC_SERVER_CERTIFICATE;
  certificate: string;
}

export interface HideDfspHubSCRootCertificateModalAction {
  type: typeof HIDE_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL;
}

export interface ShowDfspHubSCIntermediateChainModalAction {
  type: typeof SHOW_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL;
}

export interface HideDfspHubSCIntermediateChainModalAction {
  type: typeof HIDE_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL;
}

export interface ShowDfspHubSCServerCertificateModalAction {
  type: typeof SHOW_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL;
}

export interface HideDfspHubSCServerCertificateModalAction {
  type: typeof HIDE_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL;
}

export interface SubmitDfspHubSCServerCertificateAction {
  type: typeof SUBMIT_DFSP_HUB_SC_SERVER_CERTIFICATE;
}

export interface StoreDfspHubSCServerCertificateAction {
  type: typeof STORE_DFSP_HUB_SC_SERVER_CERTIFICATE;
}

export interface DownloadDfspHubSCRootCertificateAction {
  type: typeof DOWNLOAD_DFSP_HUB_SC_ROOT_CERTIFICATE;
}

export interface DownloadDfspHubSCIntermediateChainAction {
  type: typeof DOWNLOAD_DFSP_HUB_SC_INTERMEDIATE_CHAIN;
}

export interface DownloadDfspHubSCServerCertificateAction {
  type: typeof DOWNLOAD_DFSP_HUB_SC_SERVER_CERTIFICATE;
}

export type DfspHubSCActionTypes =
  | SetDfspHubSCErrorAction
  | ResetDfspHubSCAction
  | SetDfspHubSCRootCertificateAction
  | SetDfspHubSCIntermediateChainAction
  | SetDfspHubSCServerCertificateAction
  | SetDfspHubSCRootCertificateInfoAction
  | SetDfspHubSCIntermediateChainInfoAction
  | SetDfspHubSCServerCertificateInfoAction
  | SetDfspHubSCValidationsAction
  | SetDfspHubSCValidationStateAction
  | ShowDfspHubSCRootCertificateModalAction
  | ChangeDfspHubSCRootCertificateAction
  | ChangeDfspHubSCIntermediateChainAction
  | ChangeDfspHubSCServerCertificateAction
  | HideDfspHubSCRootCertificateModalAction
  | ShowDfspHubSCIntermediateChainModalAction
  | HideDfspHubSCIntermediateChainModalAction
  | ShowDfspHubSCServerCertificateModalAction
  | HideDfspHubSCServerCertificateModalAction
  | SubmitDfspHubSCServerCertificateAction
  | StoreDfspHubSCServerCertificateAction;

export interface DfspHubSCState {
  dfspHubSCError?: ErrorMessage;
  previousDfspHubSCRootCertificate?: string;
  previousDfspHubSCIntermediateChain?: string;
  previousDfspHubSCServerCertificate?: string;
  dfspHubSCRootCertificate?: string;
  dfspHubSCIntermediateChain?: string;
  dfspHubSCServerCertificate?: string;
  dfspHubSCRootCertificateInfo?: CertInfo;
  dfspHubSCIntermediateChainInfo?: CertInfo;
  dfspHubSCServerCertificateInfo?: CertInfo;
  dfspHubSCValidations: CertificateValidationResults[];
  dfspHubSCValidationState?: string;
  isDfspHubSCRootCertificateModalVisible: boolean;
  isDfspHubSCIntermediateChainModalVisible: boolean;
  isDfspHubSCServerCertificateModalVisible: boolean;
}
