import React, { FC } from 'react';
import {
  AnimateFadeIn,
  CertificateCard,
  CertificateInfo,
  CertificateModal,
  CertificateValidation,
  MessageBox,
  Spinner,
  Status,
} from 'components';
import { withMount } from 'utils/hocs';
import { isNil, isNotNil } from 'utils/testers';
import { ErrorMessage, CertificateValidationResults, CertInfo } from 'App/types';

import connectors from './connectors';
import { ValidationStates } from './types';
import { CSR, CSRInfo } from '../types';

import './index.css';

interface HubCSRsProps {
  dfspName: string;
  error: ErrorMessage;
  csrs: CSR[];
  filter: string;
  certificateModalContent?: string;
  certificateModalTitle?: string;
  isCertificateModalVisible: boolean;
  isPending: boolean;
  isCertificateSigningPendingByEnrollmentId: {
    [id: string]: boolean;
  };
  isCertificateAutoSigningPendingByEnrollmentId: {
    [id: string]: boolean;
  };
  onSignCSRClick: (enrollmentId: number) => void;
  onAutoSignCSRClick: (enrollmentId: number) => void;
  onCertificateViewClick: (certificate: string, title: string) => void;
  onCertificateDownloadClick: (certificate: string, cn: string, extension: string) => void;
  onCertificateModalCloseClick: () => void;
}

const HubCSRs: FC<HubCSRsProps> = ({
  error,
  csrs,
  isCertificateModalVisible,
  certificateModalTitle,
  certificateModalContent,
  isPending,
  isCertificateSigningPendingByEnrollmentId,
  isCertificateAutoSigningPendingByEnrollmentId,
  onSignCSRClick,
  onAutoSignCSRClick,
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
  if (!csrs.length) {
    return (
      <MessageBox
        icon="info-small"
        kind="default"
        message="There are no unprocessed Hub CSRs"
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
    <div className="dfsp-hub-csrs">
      <AnimateFadeIn initial={{ y: 10 }} animate={{ y: 0 }}>
        {csrs.map(
          (
            { certificate, certInfo, csr, csrInfo, state, validations, validationState, id },
            index
          ) => (
            <HubCSR
              key={index.toString()}
              enrollmentId={id}
              certificate={certificate}
              certInfo={certInfo}
              csr={csr}
              csrInfo={csrInfo}
              state={state}
              validations={validations}
              validationState={validationState}
              isCertificateSigningPending={isCertificateSigningPendingByEnrollmentId[id]}
              isCertificateAutoSigningPending={isCertificateAutoSigningPendingByEnrollmentId[id]}
              onAutoSignCSRClick={onAutoSignCSRClick}
              onSignCSRClick={onSignCSRClick}
              onViewClick={onCertificateViewClick}
              onDownloadClick={onCertificateDownloadClick}
            />
          )
        )}
      </AnimateFadeIn>

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

interface HubCSRProps {
  enrollmentId: number;
  certificate?: string;
  certInfo?: CertInfo;
  csr: string;
  csrInfo: CSRInfo;
  state: string;
  validations: CertificateValidationResults[];
  validationState: string;
  isCertificateSigningPending: boolean;
  isCertificateAutoSigningPending: boolean;
  onAutoSignCSRClick: (enrollmentId: number) => void;
  onSignCSRClick: (enrollmentId: number) => void;
  onViewClick: (certificate: string, title: string) => void;
  onDownloadClick: (certificate: string, cn: string, extension: string) => void;
}

const HubCSR: FC<HubCSRProps> = ({
  enrollmentId,
  certificate,
  certInfo,
  csr,
  csrInfo,
  state,
  validations,
  validationState,
  isCertificateSigningPending,
  isCertificateAutoSigningPending,
  onAutoSignCSRClick,
  onSignCSRClick,
  onViewClick,
  onDownloadClick,
}) => (
  <CertificateCard.Box>
    <CertificateCard.Header>
      <CertificateCard.Details>
        <CertificateCard.PrimaryDetail>
          {csrInfo.subject.CN || 'Common Name'}
        </CertificateCard.PrimaryDetail>
        <Status.CSR state={state} />
      </CertificateCard.Details>
      <CertificateCard.Controls>
        <CertificateCard.ControlButton
          disabled={
            isNotNil(certificate) ||
            validationState === ValidationStates.INVALID ||
            isCertificateSigningPending
          }
          noFill
          kind="secondary"
          label="Autosign CSR"
          onClick={() => onAutoSignCSRClick(enrollmentId)}
          pending={isCertificateAutoSigningPending}
        />
        <CertificateCard.ControlButton
          disabled={
            isNotNil(certificate) ||
            validationState === ValidationStates.INVALID ||
            isCertificateAutoSigningPending
          }
          label="Upload Certificate"
          icon="upload-small"
          onClick={() => onSignCSRClick(enrollmentId)}
          pending={isCertificateSigningPending}
        />
      </CertificateCard.Controls>
    </CertificateCard.Header>

    <CertificateCard.Content>
      <div className="dfsp-hub-csrs__certificate-validation">
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
        onClick={() => onViewClick(csr, 'CSR')}
      />
      <CertificateCard.FooterButton
        icon="download-small"
        label="Download CSR"
        noFill
        onClick={() => onDownloadClick(csr, csrInfo.subject.CN, '.csr')}
      />
      <CertificateCard.FooterButton
        icon="studio-project-small"
        label="View Certificate"
        kind="secondary"
        noFill
        onClick={() => onViewClick(certificate as string, 'Certificate')}
        disabled={isNil(certificate)}
      />
      <CertificateCard.FooterButton
        icon="download-small"
        label="Download Certificate"
        noFill
        onClick={
          () => onDownloadClick(certificate as string, certInfo?.subject?.CN as string, '.cer')
          // eslint-disable-next-line react/jsx-curly-newline
        }
        disabled={isNil(certificate)}
      />
    </CertificateCard.Footer>
  </CertificateCard.Box>
);

const MountedHubCSRs = withMount(HubCSRs, 'onMount');
export default connectors(MountedHubCSRs);
