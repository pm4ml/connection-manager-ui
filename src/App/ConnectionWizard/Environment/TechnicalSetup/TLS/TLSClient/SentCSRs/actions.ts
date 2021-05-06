import {
  RESET_DFSP_SENT_CSRS,
  SET_DFSP_SENT_CSRS_FILTER,
  SET_DFSP_SENT_CSRS_CERTIFICATES_ERROR,
  SET_DFSP_SENT_CSRS_CERTIFICATES,
  SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL,
  HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL,
  REQUEST_DFSP_SENT_CSR_CERTIFICATE,
  DOWNLOAD_DFSP_SENT_CSR_CERTIFICATE,
  ResetDfspSentCsrsAction,
  SetDfspSentCsrsCertificatesErrorAction,
  SetDfspSentCsrsFilterAction,
  SetDfspSentCsrsCertificatesAction,
  ShowDfspSentCsrsCertificateModalAction,
  HideDfspSentCsrsCertificateModalAction,
  RequestDfspSentCsrCertificateAction,
  DownloadDfspSentCsrCertificateAction,
} from './types';
import { CSR } from '../types';

export function resetDfspSentCsrs(): ResetDfspSentCsrsAction {
  return {
    type: RESET_DFSP_SENT_CSRS,
  };
}

export function setDfspSentCsrsCertificatesError({
  error,
}: {
  error: string;
}): SetDfspSentCsrsCertificatesErrorAction {
  return {
    type: SET_DFSP_SENT_CSRS_CERTIFICATES_ERROR,
    error,
  };
}

export function setDfspSentCsrsFilter({ filter }: { filter: string }): SetDfspSentCsrsFilterAction {
  return {
    type: SET_DFSP_SENT_CSRS_FILTER,
    filter,
  };
}

export function setDfspSentCsrsCertificates({
  certificates,
}: {
  certificates: CSR[];
}): SetDfspSentCsrsCertificatesAction {
  return {
    type: SET_DFSP_SENT_CSRS_CERTIFICATES,
    certificates,
  };
}

export function showDfspSentCsrsCertificateModal({
  certificate,
  title,
}: {
  certificate: string;
  title: string;
}): ShowDfspSentCsrsCertificateModalAction {
  return {
    type: SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL,
    certificate,
    title,
  };
}

export function hideDfspSentCsrsCertificateModal(): HideDfspSentCsrsCertificateModalAction {
  return {
    type: HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL,
  };
}

export function downloadDfspSentCsrCertificate({
  certificate,
  extension,
}: {
  certificate: string;
  extension: string;
}): DownloadDfspSentCsrCertificateAction {
  return {
    type: DOWNLOAD_DFSP_SENT_CSR_CERTIFICATE,
    certificate,
    extension,
  };
}

export function requestDfspSentCsrs(): RequestDfspSentCsrCertificateAction {
  return {
    type: REQUEST_DFSP_SENT_CSR_CERTIFICATE,
  };
}
