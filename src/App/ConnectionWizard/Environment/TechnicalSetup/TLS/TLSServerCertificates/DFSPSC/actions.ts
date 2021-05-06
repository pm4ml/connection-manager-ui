import { CertificateValidationResults, CertInfo } from 'App/types';
import {
  ResetDfspSCAction,
  RESET_DFSP_SC,
  SetDfspSCErrorAction,
  SET_DFSP_SC_ERROR,
  SET_DFSP_SC_INTERMEDIATE_CHAIN,
  SetDfspSCRootCertificateAction,
  SET_DFSP_SC_ROOT_CERTIFICATE,
  SetDfspSCIntermediateChainAction,
  SetDfspSCServerCertificateAction,
  SET_DFSP_SC_SERVER_CERTIFICATE,
  SetDfspSCRootCertificateInfoAction,
  SET_DFSP_SC_ROOT_CERTIFICATE_INFO,
  SetDfspSCIntermediateChainInfoAction,
  SET_DFSP_SC_INTERMEDIATE_CHAIN_INFO,
  SetDfspSCServerCertificateInfoAction,
  SET_DFSP_SC_SERVER_CERTIFICATE_INFO,
  SetDfspSCValidationsAction,
  SET_DFSP_SC_VALIDATIONS,
  SetDfspSCValidationStateAction,
  SET_DFSP_SC_VALIDATION_STATE,
  ShowDfspSCRootCertificateModalAction,
  SHOW_DFSP_SC_ROOT_CERTIFICATE_MODAL,
  ChangeDfspSCRootCertificateAction,
  CHANGE_DFSP_SC_ROOT_CERTIFICATE,
  ChangeDfspSCIntermediateChainAction,
  CHANGE_DFSP_SC_INTERMEDIATE_CHAIN,
  ChangeDfspSCServerCertificateAction,
  CHANGE_DFSP_SC_SERVER_CERTIFICATE,
  HIDE_DFSP_SC_ROOT_CERTIFICATE_MODAL,
  SHOW_DFSP_SC_INTERMEDIATE_CHAIN_MODAL,
  HIDE_DFSP_SC_INTERMEDIATE_CHAIN_MODAL,
  SHOW_DFSP_SC_SERVER_CERTIFICATE_MODAL,
  HIDE_DFSP_SC_SERVER_CERTIFICATE_MODAL,
  HideDfspSCRootCertificateModalAction,
  ShowDfspSCIntermediateChainModalAction,
  HideDfspSCIntermediateChainModalAction,
  ShowDfspSCServerCertificateModalAction,
  HideDfspSCServerCertificateModalAction,
  SubmitDfspSCServerCertificateAction,
  SUBMIT_DFSP_SC_SERVER_CERTIFICATE,
  DownloadDfspSCRootCertificateAction,
  DOWNLOAD_DFSP_SC_ROOT_CERTIFICATE,
  DownloadDfspSCIntermediateChainAction,
  DOWNLOAD_DFSP_SC_INTERMEDIATE_CHAIN,
  DOWNLOAD_DFSP_SC_SERVER_CERTIFICATE,
  DownloadDfspSCServerCertificateAction,
  STORE_DFSP_SC_SERVER_CERTIFICATE,
  StoreDfspSCServerCertificateAction,
} from './types';

export function resetDfspSC(): ResetDfspSCAction {
  return {
    type: RESET_DFSP_SC,
  };
}

export function setDfspSCError({ error }: { error: string }): SetDfspSCErrorAction {
  return {
    type: SET_DFSP_SC_ERROR,
    error,
  };
}

export function setDfspSCRootCertificate({
  certificate,
}: {
  certificate: string;
}): SetDfspSCRootCertificateAction {
  return {
    type: SET_DFSP_SC_ROOT_CERTIFICATE,
    certificate,
  };
}

export function setDfspSCIntermediateChain({
  certificate,
}: {
  certificate: string;
}): SetDfspSCIntermediateChainAction {
  return {
    type: SET_DFSP_SC_INTERMEDIATE_CHAIN,
    certificate,
  };
}

export function setDfspSCServerCertificate({
  certificate,
}: {
  certificate: string;
}): SetDfspSCServerCertificateAction {
  return {
    type: SET_DFSP_SC_SERVER_CERTIFICATE,
    certificate,
  };
}

export function setDfspSCRootCertificateInfo({
  certInfo,
}: {
  certInfo: CertInfo;
}): SetDfspSCRootCertificateInfoAction {
  return {
    type: SET_DFSP_SC_ROOT_CERTIFICATE_INFO,
    certInfo,
  };
}

export function setDfspSCIntermediateChainInfo({
  certInfo,
}: {
  certInfo: CertInfo;
}): SetDfspSCIntermediateChainInfoAction {
  return {
    type: SET_DFSP_SC_INTERMEDIATE_CHAIN_INFO,
    certInfo,
  };
}

export function setDfspSCServerCertificateInfo({
  certInfo,
}: {
  certInfo: CertInfo;
}): SetDfspSCServerCertificateInfoAction {
  return {
    type: SET_DFSP_SC_SERVER_CERTIFICATE_INFO,
    certInfo,
  };
}

export function setDfspSCValidations({
  validations,
}: {
  validations: CertificateValidationResults[];
}): SetDfspSCValidationsAction {
  return {
    type: SET_DFSP_SC_VALIDATIONS,
    validations,
  };
}

export function setDfspSCValidationState({
  validationState,
}: {
  validationState: string | undefined;
}): SetDfspSCValidationStateAction {
  return {
    type: SET_DFSP_SC_VALIDATION_STATE,
    validationState,
  };
}

export function showDfspSCRootCertificateModal(): ShowDfspSCRootCertificateModalAction {
  return {
    type: SHOW_DFSP_SC_ROOT_CERTIFICATE_MODAL,
  };
}

export function changeDfspSCRootCertificate({
  certificate,
}: {
  certificate: string;
}): ChangeDfspSCRootCertificateAction {
  return {
    type: CHANGE_DFSP_SC_ROOT_CERTIFICATE,
    certificate,
  };
}

export function changeDfspSCIntermediateChain({
  certificate,
}: {
  certificate: string;
}): ChangeDfspSCIntermediateChainAction {
  return {
    type: CHANGE_DFSP_SC_INTERMEDIATE_CHAIN,
    certificate,
  };
}

export function changeDfspSCServerCertificate({
  certificate,
}: {
  certificate: string;
}): ChangeDfspSCServerCertificateAction {
  return {
    type: CHANGE_DFSP_SC_SERVER_CERTIFICATE,
    certificate,
  };
}

export function hideDfspSCRootCertificateModal(): HideDfspSCRootCertificateModalAction {
  return {
    type: HIDE_DFSP_SC_ROOT_CERTIFICATE_MODAL,
  };
}

export function showDfspSCIntermediateChainModal(): ShowDfspSCIntermediateChainModalAction {
  return {
    type: SHOW_DFSP_SC_INTERMEDIATE_CHAIN_MODAL,
  };
}

export function hideDfspSCIntermediateChainModal(): HideDfspSCIntermediateChainModalAction {
  return {
    type: HIDE_DFSP_SC_INTERMEDIATE_CHAIN_MODAL,
  };
}

export function showDfspSCServerCertificateModal(): ShowDfspSCServerCertificateModalAction {
  return {
    type: SHOW_DFSP_SC_SERVER_CERTIFICATE_MODAL,
  };
}

export function hideDfspSCServerCertificateModal(): HideDfspSCServerCertificateModalAction {
  return {
    type: HIDE_DFSP_SC_SERVER_CERTIFICATE_MODAL,
  };
}

export function submitDfspSCServerCertificate(): SubmitDfspSCServerCertificateAction {
  return {
    type: SUBMIT_DFSP_SC_SERVER_CERTIFICATE,
  };
}

export function storeDfspSCServerCertificate(): StoreDfspSCServerCertificateAction {
  return {
    type: STORE_DFSP_SC_SERVER_CERTIFICATE,
  };
}

export function downloadDfspSCRootCertificate(): DownloadDfspSCRootCertificateAction {
  return {
    type: DOWNLOAD_DFSP_SC_ROOT_CERTIFICATE,
  };
}

export function downloadDfspSCIntermediateChain(): DownloadDfspSCIntermediateChainAction {
  return {
    type: DOWNLOAD_DFSP_SC_INTERMEDIATE_CHAIN,
  };
}

export function downloadDfspSCServerCertificate(): DownloadDfspSCServerCertificateAction {
  return {
    type: DOWNLOAD_DFSP_SC_SERVER_CERTIFICATE,
  };
}
