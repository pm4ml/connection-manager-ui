import { CertificateValidationResults, CertInfo } from 'App/types';

export enum States {
  NEW = 'NEW',
  CSR_LOADED = 'CSR_LOADED',
  CERT_SIGNED = 'CERT_SIGNED',
  VALID = 'VALID',
  INVALID = 'INVALID',
}

export interface ExternalCA {
  name: string;
}

export interface CSRInfo {
  subject: {
    CN: string;
  };
}

export interface CSR {
  id: number;
  certificate: string;
  csr: string;
  csrInfo: CSRInfo;
  certInfo?: CertInfo;
  state: string;
  validations: CertificateValidationResults[];
  validationState: string;
  externalCa?: ExternalCA;
}
