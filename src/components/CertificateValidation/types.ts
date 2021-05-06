import { CertificateValidationResults } from 'App/types';

export type CertificateValidationModalType = 'ca' | 'csr' | 'certificate' | 'both' | undefined;

export interface CertificateValidationProps {
  state?: string;
  validations: CertificateValidationResults[];
}
export interface CertificateValidationState {
  state: string;
  isModalVisible: boolean;
  validations: CertificateValidationResults[];
  type: CertificateValidationModalType;
}

export interface TypeLabelByTypeMethod {
  prefix: string;
  label: string;
  verb: string;
  haveVerb: string;
}

export interface CertificateValidationModalProps {
  type: CertificateValidationModalType;
  state?: string;
  validations: CertificateValidationResults[];
  onClose?: () => void;
}
