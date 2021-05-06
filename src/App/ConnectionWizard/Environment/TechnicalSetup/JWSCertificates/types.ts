import { CertificateValidationResults, CertInfo } from 'App/types';

export interface OtherCertificates {
  dfspId: string;
  dfspName: string;
  error?: string;
  monetaryZoneId?: string;
  jwsCertificate: string;
  jwsCertificateInfo: CertInfo;
  rootCertificate?: string;
  rootCertificateInfo?: CertInfo;
  intermediateChain: string;
  intermediateChainInfo: CertInfo;
  serverCertificate?: string;
  serverCertificateInfo?: CertInfo;
  validations: CertificateValidationResults[];
  validationState: string;
  isDownloadEnabled?: boolean | EventTarget;
}
