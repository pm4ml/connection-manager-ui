import { CertificateValidationResults, CertInfo } from 'App/types';
import {
  RESET_DFSP_JWS,
  SET_DFSP_JWS_ERROR,
  SET_DFSP_JWS_CERTIFICATE,
  SET_DFSP_JWS_INTERMEDIATE_CHAIN,
  SET_DFSP_JWS_CERTIFICATE_INFO,
  SET_DFSP_JWS_INTERMEDIATE_CHAIN_INFO,
  SET_DFSP_JWS_VALIDATIONS,
  SET_DFSP_JWS_VALIDATION_STATE,
  SHOW_DFSP_JWS_CERTIFICATE_MODAL,
  CHANGE_DFSP_JWS_CERTIFICATE,
  CHANGE_DFSP_JWS_INTERMEDIATE_CHAIN,
  HIDE_DFSP_JWS_CERTIFICATE_MODAL,
  HIDE_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL,
  SHOW_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL,
  ResetDfspJWSAction,
  SetDfspJWSErrorAction,
  SetDfspJWSCertificateAction,
  SetDfspJWSIntermediateChainAction,
  SetDfspJWSCertificateInfoAction,
  SetDfspJWSIntermediateChainInfoAction,
  SetDfspJWSValidationsAction,
  SetDfspJWSValidationStateAction,
  ShowDfspJWSCertificateModalAction,
  ChangeDfspJWSCertificateAction,
  ChangeDfspJWSIntermediateChainAction,
  HideDfspJWSCertificateModalAction,
  ShowDfspJWSIntermediateChainModalAction,
  HideDfspJWSIntermediateChainModalAction,
  SUBMIT_DFSP_JWS_SERVER_CERTIFICATE,
  DOWNLOAD_DFSP_JWS_CERTIFICATE,
  DownloadDfspJWSCertificateAction,
  SubmitDfspJWSCertificatesAction,
  DOWNLOAD_DFSP_JWS_INTERMEDIATE_CHAIN,
  DownloadDfspJWSIntermediateChainAction,
  STORE_DFSP_JWS_SERVER_CERTIFICATE,
  StoreDfspJWSCertificateAction,
} from './types';

export function resetDfspJWS(): ResetDfspJWSAction {
  return {
    type: RESET_DFSP_JWS,
  };
}

export function setDfspJWSError({ error }: { error: string }): SetDfspJWSErrorAction {
  return {
    type: SET_DFSP_JWS_ERROR,
    error,
  };
}

export function setDfspJWSCertificate({
  certificate,
}: {
  certificate: string;
}): SetDfspJWSCertificateAction {
  return {
    type: SET_DFSP_JWS_CERTIFICATE,
    certificate,
  };
}

export function setDfspJWSIntermediateChain({
  certificate,
}: {
  certificate: string;
}): SetDfspJWSIntermediateChainAction {
  return {
    type: SET_DFSP_JWS_INTERMEDIATE_CHAIN,
    certificate,
  };
}

export function setDfspJWSCertificateInfo({
  certInfo,
}: {
  certInfo: CertInfo;
}): SetDfspJWSCertificateInfoAction {
  return {
    type: SET_DFSP_JWS_CERTIFICATE_INFO,
    certInfo,
  };
}

export function setDfspJWSIntermediateChainInfo({
  certInfo,
}: {
  certInfo: CertInfo;
}): SetDfspJWSIntermediateChainInfoAction {
  return {
    type: SET_DFSP_JWS_INTERMEDIATE_CHAIN_INFO,
    certInfo,
  };
}

export function setDfspJWSValidations({
  validations,
}: {
  validations: CertificateValidationResults[];
}): SetDfspJWSValidationsAction {
  return {
    type: SET_DFSP_JWS_VALIDATIONS,
    validations,
  };
}

export function setDfspJWSValidationState({
  validationState,
}: {
  validationState: string | undefined;
}): SetDfspJWSValidationStateAction {
  return {
    type: SET_DFSP_JWS_VALIDATION_STATE,
    validationState,
  };
}

export function showDfspJWSCertificateModal(): ShowDfspJWSCertificateModalAction {
  return {
    type: SHOW_DFSP_JWS_CERTIFICATE_MODAL,
  };
}

export function changeDfspJWSCertificate({
  certificate,
}: {
  certificate: string;
}): ChangeDfspJWSCertificateAction {
  return {
    type: CHANGE_DFSP_JWS_CERTIFICATE,
    certificate,
  };
}

export function changeDfspJWSIntermediateChain({
  certificate,
}: {
  certificate: string;
}): ChangeDfspJWSIntermediateChainAction {
  return {
    type: CHANGE_DFSP_JWS_INTERMEDIATE_CHAIN,
    certificate,
  };
}

export function hideDfspJWSCertificateModal(): HideDfspJWSCertificateModalAction {
  return {
    type: HIDE_DFSP_JWS_CERTIFICATE_MODAL,
  };
}

export function showDfspJWSIntermediateChainModal(): ShowDfspJWSIntermediateChainModalAction {
  return {
    type: SHOW_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL,
  };
}

export function hideDfspJWSIntermediateChainModal(): HideDfspJWSIntermediateChainModalAction {
  return {
    type: HIDE_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL,
  };
}

export function submitDfspJWSCertificates(): SubmitDfspJWSCertificatesAction {
  return {
    type: SUBMIT_DFSP_JWS_SERVER_CERTIFICATE,
  };
}

export function downloadDfspJWSCertificate(): DownloadDfspJWSCertificateAction {
  return {
    type: DOWNLOAD_DFSP_JWS_CERTIFICATE,
  };
}

export function downloadDfspJWSIntermediateChain(): DownloadDfspJWSIntermediateChainAction {
  return {
    type: DOWNLOAD_DFSP_JWS_INTERMEDIATE_CHAIN,
  };
}

export function storeDfspJWSCertificate(): StoreDfspJWSCertificateAction {
  return {
    type: STORE_DFSP_JWS_SERVER_CERTIFICATE,
  };
}
