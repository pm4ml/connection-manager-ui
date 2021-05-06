import { CertificateValidationResults, CertInfo } from 'App/types';
import {
  RESET_DFSP_HUB_SC,
  SET_DFSP_HUB_SC_ERROR,
  SET_DFSP_HUB_SC_ROOT_CERTIFICATE,
  SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
  SET_DFSP_HUB_SC_SERVER_CERTIFICATE,
  SET_DFSP_HUB_SC_ROOT_CERTIFICATE_INFO,
  SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN_INFO,
  SET_DFSP_HUB_SC_SERVER_CERTIFICATE_INFO,
  SET_DFSP_HUB_SC_VALIDATIONS,
  SET_DFSP_HUB_SC_VALIDATION_STATE,
  SHOW_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL,
  HIDE_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL,
  SHOW_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  HIDE_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  SHOW_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL,
  HIDE_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL,
  ResetDfspHubSCAction,
  SetDfspHubSCErrorAction,
  SetDfspHubSCRootCertificateAction,
  SetDfspHubSCIntermediateChainAction,
  SetDfspHubSCServerCertificateAction,
  SetDfspHubSCRootCertificateInfoAction,
  SetDfspHubSCIntermediateChainInfoAction,
  SetDfspHubSCServerCertificateInfoAction,
  SetDfspHubSCValidationsAction,
  SetDfspHubSCValidationStateAction,
  ShowDfspHubSCRootCertificateModalAction,
  ChangeDfspHubSCRootCertificateAction,
  CHANGE_DFSP_HUB_SC_ROOT_CERTIFICATE,
  ChangeDfspHubSCIntermediateChainAction,
  CHANGE_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
  ChangeDfspHubSCServerCertificateAction,
  CHANGE_DFSP_HUB_SC_SERVER_CERTIFICATE,
  HideDfspHubSCRootCertificateModalAction,
  ShowDfspHubSCIntermediateChainModalAction,
  HideDfspHubSCIntermediateChainModalAction,
  ShowDfspHubSCServerCertificateModalAction,
  HideDfspHubSCServerCertificateModalAction,
  SubmitDfspHubSCServerCertificateAction,
  SUBMIT_DFSP_HUB_SC_SERVER_CERTIFICATE,
  DownloadDfspHubSCRootCertificateAction,
  DOWNLOAD_DFSP_HUB_SC_ROOT_CERTIFICATE,
  DownloadDfspHubSCIntermediateChainAction,
  DOWNLOAD_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
  DOWNLOAD_DFSP_HUB_SC_SERVER_CERTIFICATE,
  DownloadDfspHubSCServerCertificateAction,
  StoreDfspHubSCServerCertificateAction,
  STORE_DFSP_HUB_SC_SERVER_CERTIFICATE,
} from './types';

export function resetDfspHubSC(): ResetDfspHubSCAction {
  return {
    type: RESET_DFSP_HUB_SC,
  };
}

export function setDfspHubSCError({ error }: { error: string }): SetDfspHubSCErrorAction {
  return {
    type: SET_DFSP_HUB_SC_ERROR,
    error,
  };
}

export function setDfspHubSCRootCertificate({
  certificate,
}: {
  certificate: string;
}): SetDfspHubSCRootCertificateAction {
  return {
    type: SET_DFSP_HUB_SC_ROOT_CERTIFICATE,
    certificate,
  };
}

export function setDfspHubSCIntermediateChain({
  certificate,
}: {
  certificate: string;
}): SetDfspHubSCIntermediateChainAction {
  return {
    type: SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
    certificate,
  };
}

export function setDfspHubSCServerCertificate({
  certificate,
}: {
  certificate: string;
}): SetDfspHubSCServerCertificateAction {
  return {
    type: SET_DFSP_HUB_SC_SERVER_CERTIFICATE,
    certificate,
  };
}

export function setDfspHubSCRootCertificateInfo({
  certInfo,
}: {
  certInfo: CertInfo;
}): SetDfspHubSCRootCertificateInfoAction {
  return {
    type: SET_DFSP_HUB_SC_ROOT_CERTIFICATE_INFO,
    certInfo,
  };
}

export function setDfspHubSCIntermediateChainInfo({
  certInfo,
}: {
  certInfo: CertInfo;
}): SetDfspHubSCIntermediateChainInfoAction {
  return {
    type: SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN_INFO,
    certInfo,
  };
}

export function setDfspHubSCServerCertificateInfo({
  certInfo,
}: {
  certInfo: CertInfo;
}): SetDfspHubSCServerCertificateInfoAction {
  return {
    type: SET_DFSP_HUB_SC_SERVER_CERTIFICATE_INFO,
    certInfo,
  };
}

export function setDfspHubSCValidations({
  validations,
}: {
  validations: CertificateValidationResults[];
}): SetDfspHubSCValidationsAction {
  return {
    type: SET_DFSP_HUB_SC_VALIDATIONS,
    validations,
  };
}

export function setDfspHubSCValidationState({
  validationState,
}: {
  validationState: string | undefined;
}): SetDfspHubSCValidationStateAction {
  return {
    type: SET_DFSP_HUB_SC_VALIDATION_STATE,
    validationState,
  };
}

export function showDfspHubSCRootCertificateModal(): ShowDfspHubSCRootCertificateModalAction {
  return {
    type: SHOW_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL,
  };
}

export function changeDfspHubSCRootCertificate({
  certificate,
}: {
  certificate: string;
}): ChangeDfspHubSCRootCertificateAction {
  return {
    type: CHANGE_DFSP_HUB_SC_ROOT_CERTIFICATE,
    certificate,
  };
}

export function changeDfspHubSCIntermediateChain({
  certificate,
}: {
  certificate: string;
}): ChangeDfspHubSCIntermediateChainAction {
  return {
    type: CHANGE_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
    certificate,
  };
}

export function changeDfspHubSCServerCertificate({
  certificate,
}: {
  certificate: string;
}): ChangeDfspHubSCServerCertificateAction {
  return {
    type: CHANGE_DFSP_HUB_SC_SERVER_CERTIFICATE,
    certificate,
  };
}

export function hideDfspHubSCRootCertificateModal(): HideDfspHubSCRootCertificateModalAction {
  return {
    type: HIDE_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL,
  };
}

export function showDfspHubSCIntermediateChainModal(): ShowDfspHubSCIntermediateChainModalAction {
  return {
    type: SHOW_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  };
}

export function hideDfspHubSCIntermediateChainModal(): HideDfspHubSCIntermediateChainModalAction {
  return {
    type: HIDE_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  };
}

export function showDfspHubSCServerCertificateModal(): ShowDfspHubSCServerCertificateModalAction {
  return {
    type: SHOW_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL,
  };
}

export function hideDfspHubSCServerCertificateModal(): HideDfspHubSCServerCertificateModalAction {
  return {
    type: HIDE_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL,
  };
}

export function submitDfspHubSCServerCertificate(): SubmitDfspHubSCServerCertificateAction {
  return {
    type: SUBMIT_DFSP_HUB_SC_SERVER_CERTIFICATE,
  };
}

export function storeDfspHubSCServerCertificate(): StoreDfspHubSCServerCertificateAction {
  return {
    type: STORE_DFSP_HUB_SC_SERVER_CERTIFICATE,
  };
}

export function downloadDfspHubSCRootCertificate(): DownloadDfspHubSCRootCertificateAction {
  return {
    type: DOWNLOAD_DFSP_HUB_SC_ROOT_CERTIFICATE,
  };
}

export function downloadDfspHubSCIntermediateChain(): DownloadDfspHubSCIntermediateChainAction {
  return {
    type: DOWNLOAD_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
  };
}

export function downloadDfspHubSCServerCertificate(): DownloadDfspHubSCServerCertificateAction {
  return {
    type: DOWNLOAD_DFSP_HUB_SC_SERVER_CERTIFICATE,
  };
}
