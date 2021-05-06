import React, { FC } from 'react';
import {
  AnimateFadeIn,
  CertificateCard,
  CertificateModal,
  CertificateInfo,
  CertificateValidation,
  MessageBox,
  Status,
  Spinner,
  TextField,
} from 'components';
import { ErrorMessage, CertificateValidationResults, CertInfo } from 'App/types';
import { withMount } from 'utils/hocs';
import connectors from './connectors';
import { ExternalCA, CSR, CSRInfo } from '../types';

import './index.css';

interface SentCSRsProps {
  dfspName: string;
  error: ErrorMessage;
  csrs: CSR[];
  filter: string;
  certificateModalContent?: string;
  certificateModalTitle?: string;
  isCertificateModalVisible: boolean;
  isDfspSentCsrsPending: boolean;
  onFilterChange: () => void;
  onCertificateViewClick: () => void;
  onCertificateDownloadClick: () => void;
  onCertificateModalCloseClick: () => void;
}

const SentCSRs: FC<SentCSRsProps> = ({
  error,
  csrs,
  filter,
  isCertificateModalVisible,
  certificateModalContent,
  certificateModalTitle,
  isDfspSentCsrsPending,
  onFilterChange,
  onCertificateViewClick,
  onCertificateDownloadClick,
  onCertificateModalCloseClick,
}) => {
  if (error) {
    return (
      <MessageBox
        icon="warning-sign"
        kind="danger"
        message="There was an error while loading the certificates"
        center
        size={30}
        fontSize={17}
      />
    );
  }
  return (
    <div className="dfsp-sent-csrs">
      <div className="dfsp-sent-csrs__filter">
        <TextField placeholder="Search DFSP CSRs" value={filter} onChange={onFilterChange} />
      </div>

      <FilteredSentCSRS
        isPending={isDfspSentCsrsPending}
        csrs={csrs}
        onCertificateViewClick={onCertificateViewClick}
        onCertificateDownloadClick={onCertificateDownloadClick}
      />

      {isCertificateModalVisible && (
        <CertificateModal
          onClose={onCertificateModalCloseClick}
          content={certificateModalContent as string}
          title={certificateModalTitle as string}
        />
      )}
    </div>
  );
};

interface FilteredSentCSRSProps {
  isPending: boolean;
  csrs: CSR[];
  onCertificateViewClick: (file: string, extension: string) => void;
  onCertificateDownloadClick: (file: string, extension: string) => void;
}
const FilteredSentCSRS: FC<FilteredSentCSRSProps> = ({
  isPending,
  csrs,
  onCertificateViewClick,
  onCertificateDownloadClick,
}) => {
  if (!csrs.length) {
    return (
      <MessageBox
        icon="info-small"
        kind="default"
        message="There are no sent CSRs"
        size={30}
        fontSize={17}
        center
      />
    );
  }
  if (isPending) {
    return <Spinner center size={20} />;
  }
  return (
    <AnimateFadeIn initial={{ y: 10 }} animate={{ y: 0 }}>
      {csrs.map(
        (
          { certificate, csr, csrInfo, certInfo, state, validations, validationState, externalCa },
          index
        ) => (
          <SentCSR
            key={index.toString()}
            certificate={certificate}
            csr={csr}
            csrInfo={csrInfo}
            certInfo={certInfo}
            state={state}
            validations={validations}
            validationState={validationState}
            externalCa={externalCa}
            onViewClick={() => onCertificateViewClick(csr, 'CSR')}
            onDownloadClick={() => onCertificateDownloadClick(csr, '.csr')}
            onViewSignedClick={() => onCertificateViewClick(certificate, 'Certificate')}
            onDownloadSignedClick={() => onCertificateDownloadClick(certificate, '.cer')}
          />
        )
      )}
    </AnimateFadeIn>
  );
};

interface SentCSRProps {
  certificate?: string;
  csr: string;
  csrInfo: CSRInfo;
  certInfo?: CertInfo;
  state: string;
  validations: CertificateValidationResults[];
  validationState: string;
  externalCa?: ExternalCA;
  onViewClick: () => void;
  onDownloadClick: () => void;
  onViewSignedClick: () => void;
  onDownloadSignedClick: () => void;
}

const SentCSR: FC<SentCSRProps> = ({
  certificate,
  csr,
  csrInfo,
  certInfo,
  state,
  validations,
  validationState,
  externalCa,
  onViewClick,
  onDownloadClick,
  onViewSignedClick,
  onDownloadSignedClick,
}) => (
  <CertificateCard.Box>
    <CertificateCard.Header>
      <CertificateCard.Details>
        <CertificateCard.PrimaryDetail>
          {csrInfo.subject.CN || 'Common Name'}
        </CertificateCard.PrimaryDetail>
        <Status.CSR state={state} />
      </CertificateCard.Details>
    </CertificateCard.Header>

    <CertificateCard.Content>
      <div className="dfsp-sent-csrs__certificate-validation">
        <CertificateValidation state={validationState} validations={validations} />
      </div>
      <CertificateInfo csrInfo={csrInfo} certInfo={certInfo} />
    </CertificateCard.Content>

    <CertificateCard.Footer>
      <CertificateCard.FooterButton
        icon="studio-project-small"
        label="View CSR"
        kind="secondary"
        noFill
        onClick={onViewClick}
      />
      <CertificateCard.FooterButton
        icon="download-small"
        label="Download CSR"
        noFill
        onClick={onDownloadClick}
      />
      <CertificateCard.FooterButton
        icon="studio-project-small"
        label="View Certificate"
        kind="secondary"
        noFill
        onClick={onViewSignedClick}
        disabled={!certificate}
      />
      <CertificateCard.FooterButton
        icon="download-small"
        label="Download Certificate"
        noFill
        onClick={onDownloadSignedClick}
        disabled={!certificate}
      />
      {externalCa && (
        <MessageBox
          icon="info-small"
          size={16}
          fontSize={12}
          className="dfsp-sent-csrs__external-ca__message-box"
        >
          <span>
            Signed with external CA <i>{externalCa.name}</i>
          </span>
        </MessageBox>
      )}
    </CertificateCard.Footer>
  </CertificateCard.Box>
);

const MountedSentCSRs = withMount(SentCSRs, 'onMount');

export default connectors(MountedSentCSRs);
