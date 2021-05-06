import { CertificateValidationResults, ErrorMessage, CertInfo } from 'App/types';

export const RESET_DFSP_JWS = 'DFSP JWS / Reset';
export const SET_DFSP_JWS_ERROR = 'DFSP JWS / Set JWS Cert Error';
export const SET_DFSP_JWS_CERTIFICATE = 'DFSP JWS / Set JWS Certificate';
export const SET_DFSP_JWS_INTERMEDIATE_CHAIN = 'DFSP JWS / Set Intermediate Chain';
export const SET_DFSP_JWS_CERTIFICATE_INFO = 'DFSP JWS / Set JWS Certificate Info';
export const SET_DFSP_JWS_INTERMEDIATE_CHAIN_INFO = 'DFSP JWS / Set Intermediate Chain Info';
export const SET_DFSP_JWS_VALIDATIONS = 'DFSP JWS / Set Validations';
export const SET_DFSP_JWS_VALIDATION_STATE = 'DFSP JWS / Set Validation State';
export const CHANGE_DFSP_JWS_CERTIFICATE = 'DFSP JWS / Change JWS Certificate';
export const CHANGE_DFSP_JWS_INTERMEDIATE_CHAIN = 'DFSP JWS / Change Intermediate Chain';
export const SHOW_DFSP_JWS_CERTIFICATE_MODAL = 'DFSP JWS / Show JWS Certificate Modal';
export const HIDE_DFSP_JWS_CERTIFICATE_MODAL = 'DFSP JWS / Hide JWS Certificate Modal';
export const SHOW_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL = 'DFSP JWS / Show Intermediate Chain Modal';
export const HIDE_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL = 'DFSP JWS / Hide Intermediate Chain Modal';
export const SUBMIT_DFSP_JWS_SERVER_CERTIFICATE = 'DFSP JWS / Submit Server Certificate';
export const STORE_DFSP_JWS_SERVER_CERTIFICATE = 'DFSP JWS / Store Server Certificate';
export const DOWNLOAD_DFSP_JWS_CERTIFICATE = 'DFSP JWS / Download Certificate';
export const DOWNLOAD_DFSP_JWS_INTERMEDIATE_CHAIN = 'DFSP JWS / Download Intermediate Chain';

export interface ResetDfspJWSAction {
  type: typeof RESET_DFSP_JWS;
}

export interface SetDfspJWSErrorAction {
  type: typeof SET_DFSP_JWS_ERROR;
  error: string;
}

export interface SetDfspJWSCertificateAction {
  type: typeof SET_DFSP_JWS_CERTIFICATE;
  certificate: string;
}

export interface SetDfspJWSIntermediateChainAction {
  type: typeof SET_DFSP_JWS_INTERMEDIATE_CHAIN;
  certificate: string;
}

export interface SetDfspJWSCertificateInfoAction {
  type: typeof SET_DFSP_JWS_CERTIFICATE_INFO;
  certInfo: CertInfo;
}

export interface SetDfspJWSIntermediateChainInfoAction {
  type: typeof SET_DFSP_JWS_INTERMEDIATE_CHAIN_INFO;
  certInfo: CertInfo;
}

export interface SetDfspJWSValidationsAction {
  type: typeof SET_DFSP_JWS_VALIDATIONS;
  validations: CertificateValidationResults[];
}

export interface SetDfspJWSValidationStateAction {
  type: typeof SET_DFSP_JWS_VALIDATION_STATE;
  validationState: string | undefined;
}

export interface ShowDfspJWSCertificateModalAction {
  type: typeof SHOW_DFSP_JWS_CERTIFICATE_MODAL;
}

export interface ChangeDfspJWSCertificateAction {
  type: typeof CHANGE_DFSP_JWS_CERTIFICATE;
  certificate: string;
}

export interface ChangeDfspJWSIntermediateChainAction {
  type: typeof CHANGE_DFSP_JWS_INTERMEDIATE_CHAIN;
  certificate: string;
}

export interface HideDfspJWSCertificateModalAction {
  type: typeof HIDE_DFSP_JWS_CERTIFICATE_MODAL;
}

export interface ShowDfspJWSIntermediateChainModalAction {
  type: typeof SHOW_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL;
}

export interface HideDfspJWSIntermediateChainModalAction {
  type: typeof HIDE_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL;
}

export interface SubmitDfspJWSCertificatesAction {
  type: typeof SUBMIT_DFSP_JWS_SERVER_CERTIFICATE;
}

export interface DownloadDfspJWSCertificateAction {
  type: typeof DOWNLOAD_DFSP_JWS_CERTIFICATE;
}

export interface DownloadDfspJWSIntermediateChainAction {
  type: typeof DOWNLOAD_DFSP_JWS_INTERMEDIATE_CHAIN;
}

export interface StoreDfspJWSCertificateAction {
  type: typeof STORE_DFSP_JWS_SERVER_CERTIFICATE;
}

export type DFSPJWSActionTypes =
  | ResetDfspJWSAction
  | SetDfspJWSErrorAction
  | SetDfspJWSCertificateAction
  | SetDfspJWSIntermediateChainAction
  | SetDfspJWSIntermediateChainAction
  | SetDfspJWSCertificateInfoAction
  | SetDfspJWSIntermediateChainInfoAction
  | SetDfspJWSValidationsAction
  | SetDfspJWSValidationStateAction
  | ShowDfspJWSCertificateModalAction
  | HideDfspJWSCertificateModalAction
  | ChangeDfspJWSCertificateAction
  | ChangeDfspJWSIntermediateChainAction
  | HideDfspJWSCertificateModalAction
  | ShowDfspJWSIntermediateChainModalAction
  | HideDfspJWSIntermediateChainModalAction
  | StoreDfspJWSCertificateAction;

export interface DFSPJWSState {
  dfspJWSError: ErrorMessage;
  previousDfspJWSCertificate?: string;
  previousDfspJWSIntermediateChain?: string;
  dfspJWSCertificate: string;
  dfspJWSIntermediateChain: string;
  dfspJWSCertificateInfo?: CertInfo;
  dfspJWSIntermediateChainInfo?: CertInfo;
  dfspJWSValidations: CertificateValidationResults[];
  dfspJWSValidationState?: string;
  isDfspJWSCertificateModalVisible: boolean;
  isDfspJWSIntermediateChainModalVisible: boolean;
}
