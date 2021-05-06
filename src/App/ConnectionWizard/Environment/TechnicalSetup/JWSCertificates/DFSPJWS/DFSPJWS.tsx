import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  CertificateInfo,
  CertificateModal,
  CertificateValidation,
  FileControls,
  FormInput,
  MessageBox,
} from 'components';
import { getEnvironmentName } from 'App/ConnectionWizard/selectors';
import { State, Dispatch } from 'store/types';

import { AnyAction } from 'redux';
import { CertificateValidationResults, ErrorMessage, CertInfo } from 'App/types';
import { withMount } from 'utils/hocs';
import {
  changeDfspJWSCertificate,
  downloadDfspJWSCertificate,
  showDfspJWSCertificateModal,
  hideDfspJWSCertificateModal,
  changeDfspJWSIntermediateChain,
  downloadDfspJWSIntermediateChain,
  showDfspJWSIntermediateChainModal,
  hideDfspJWSIntermediateChainModal,
  submitDfspJWSCertificates,
  storeDfspJWSCertificate,
} from './actions';
import {
  getDfspJWSError,
  getDfspJWSCertificate,
  getDfspJWSIntermediateChain,
  getDfspJWSCertificateInfo,
  getDfspJWSIntermediateChainInfo,
  getDfspJWSValidations,
  getDfspJWSValidationState,
  getIsDfspJWSCertificateModalVisible,
  getIsDfspJWSIntermediateChainModalVisible,
  getIsDfspJWSSubmitEnabled,
  getIsDfspJWSSubmitPending,
} from './selectors';

import './index.css';

const stateProps = (state: State) => ({
  environmentName: getEnvironmentName(state),
  error: getDfspJWSError(state),
  jwsCertificate: getDfspJWSCertificate(state),
  intermediateChain: getDfspJWSIntermediateChain(state),
  jwsCertificateInfo: getDfspJWSCertificateInfo(state),
  intermediateChainInfo: getDfspJWSIntermediateChainInfo(state),
  validations: getDfspJWSValidations(state),
  validationState: getDfspJWSValidationState(state),
  isJwsCertificateModalVisible: getIsDfspJWSCertificateModalVisible(state),
  isIntermediateChainModalVisible: getIsDfspJWSIntermediateChainModalVisible(state),
  isSubmitEnabled: getIsDfspJWSSubmitEnabled(state),
  isSubmitPending: getIsDfspJWSSubmitPending(state),
});

const actionProps = (dispatch: Dispatch) => ({
  onMount: () => dispatch(storeDfspJWSCertificate()),
  onJwsCertificateChange: (cert: string) =>
    dispatch(changeDfspJWSCertificate({ certificate: cert })),
  onJwsCertificateViewClick: () => dispatch(showDfspJWSCertificateModal()),
  onJwsCertificateDownloadClick: () => dispatch(downloadDfspJWSCertificate()),
  onJwsCertificateModalCloseClick: () => dispatch(hideDfspJWSCertificateModal()),
  onIntermediateChainChange: (cert: string) =>
    dispatch(changeDfspJWSIntermediateChain({ certificate: cert })),
  onIntermediateChainDownloadClick: () => dispatch(downloadDfspJWSIntermediateChain()),
  onIntermediateChainViewClick: () => dispatch(showDfspJWSIntermediateChainModal()),
  onIntermediateChainModalCloseClick: () => dispatch(hideDfspJWSIntermediateChainModal()),
  onCreateCertificateClick: () => dispatch(submitDfspJWSCertificates()),
});

interface DfspJWSProps {
  environmentName: string;
  error: ErrorMessage;
  jwsCertificate: string;
  intermediateChain: string;
  jwsCertificateInfo?: CertInfo;
  intermediateChainInfo?: CertInfo;
  validations: CertificateValidationResults[];
  validationState?: string;
  isJwsCertificateModalVisible: boolean;
  isIntermediateChainModalVisible: boolean;
  isSubmitEnabled: boolean;
  isSubmitPending: boolean;
  isReadPending?: boolean;
  onJwsCertificateChange: (certificate: string) => void;
  onJwsCertificateViewClick: () => void;
  onJwsCertificateDownloadClick: () => AnyAction;
  onJwsCertificateModalCloseClick: () => void;
  onIntermediateChainChange: (certificate: string) => void;
  onIntermediateChainViewClick: () => void;
  onIntermediateChainDownloadClick: () => AnyAction;
  onIntermediateChainModalCloseClick: () => void;
  onCreateCertificateClick: () => void;
}

const DfspJWS: FC<DfspJWSProps> = ({
  environmentName,
  error,
  jwsCertificate,
  intermediateChain,
  jwsCertificateInfo,
  intermediateChainInfo,
  validations,
  validationState,
  isJwsCertificateModalVisible,
  isIntermediateChainModalVisible,
  isSubmitEnabled,
  isSubmitPending,
  onJwsCertificateChange,
  onJwsCertificateViewClick,
  onJwsCertificateDownloadClick,
  onJwsCertificateModalCloseClick,
  onIntermediateChainChange,
  onIntermediateChainViewClick,
  onIntermediateChainDownloadClick,
  onIntermediateChainModalCloseClick,
  onCreateCertificateClick,
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
    <div className="dfsp-jws">
      <div className="dfsp-jws__submit__container">
        <Button
          className="dfsp-jws__submit"
          label="Submit"
          onClick={onCreateCertificateClick}
          disabled={!isSubmitEnabled}
          pending={isSubmitPending}
          icon="check-small"
        />
      </div>

      <div className="dfsp-jws__certificate-validation">
        <CertificateValidation
          validations={validations}
          state={validationState}
          type="certificate"
        />
      </div>

      <div className="dfsp-jws__certificate-item">
        <div className="dfsp-jws__jws-certificate">
          <FormInput
            type="file"
            label="JWS Certificate"
            parseFileAsText
            onChange={onJwsCertificateChange}
            elementWidth="400px"
            value={jwsCertificate || null}
            fileName={`${environmentName}-jws.pem`}
            required
          />
          {jwsCertificate && (
            <FileControls
              onViewClick={onJwsCertificateViewClick}
              onDownloadClick={onJwsCertificateDownloadClick}
            />
          )}
        </div>
        {jwsCertificateInfo && <CertificateInfo certInfo={jwsCertificateInfo} />}
      </div>

      <div className="dfsp-jws__certificate-item">
        <div className="dfsp-jws__intermediate-chain">
          <FormInput
            type="file"
            label="Intermediate Chain"
            parseFileAsText
            onChange={onIntermediateChainChange}
            value={intermediateChain || null}
            fileName={`${environmentName}-intermediates.pem`}
            elementWidth="400px"
          />
          {intermediateChain && (
            <FileControls
              onViewClick={onIntermediateChainViewClick}
              onDownloadClick={onIntermediateChainDownloadClick}
            />
          )}
        </div>
        {intermediateChainInfo && <CertificateInfo certInfo={intermediateChainInfo} />}
      </div>

      {isJwsCertificateModalVisible && (
        <CertificateModal
          onClose={onJwsCertificateModalCloseClick}
          content={jwsCertificate}
          title="JWS Certificate"
        />
      )}
      {isIntermediateChainModalVisible && (
        <CertificateModal
          onClose={onIntermediateChainModalCloseClick}
          content={intermediateChain}
          title="Intermediate Chain"
        />
      )}
    </div>
  );
};

const MountedDfspJWS = withMount(DfspJWS, 'onMount');

export default connect(stateProps, actionProps)(MountedDfspJWS);
