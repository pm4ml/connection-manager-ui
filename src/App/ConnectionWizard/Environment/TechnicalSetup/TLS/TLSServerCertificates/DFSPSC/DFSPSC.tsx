import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  CertificateInfo,
  CertificateModal,
  CertificateValidation,
  MessageBox,
  FileControls,
  FormInput,
} from 'components';

import { AnyAction } from 'redux';
import { withMount } from 'utils/hocs';

import { getEnvironmentName } from 'App/ConnectionWizard/selectors';
import { CertificateValidationResults, CertInfo } from 'App/types';
import { State, Dispatch } from 'store/types';

import {
  changeDfspSCRootCertificate,
  downloadDfspSCRootCertificate,
  showDfspSCRootCertificateModal,
  hideDfspSCRootCertificateModal,
  changeDfspSCIntermediateChain,
  downloadDfspSCIntermediateChain,
  showDfspSCIntermediateChainModal,
  hideDfspSCIntermediateChainModal,
  changeDfspSCServerCertificate,
  downloadDfspSCServerCertificate,
  showDfspSCServerCertificateModal,
  hideDfspSCServerCertificateModal,
  submitDfspSCServerCertificate,
  storeDfspSCServerCertificate,
} from './actions';
import {
  getDfspSCError,
  getDfspSCRootCertificate,
  getDfspSCIntermediateChain,
  getDfspSCServerCertificate,
  getDfspSCRootCertificateInfo,
  getDfspSCIntermediateChainInfo,
  getDfspSCServerCertificateInfo,
  getDfspSCValidations,
  getDfspSCValidationState,
  getIsDfspSCRootCertificateModalVisible,
  getIsDfspSCIntermediateChainModalVisible,
  getIsDfspSCServerCertificateModalVisible,
  getIsDfspSCSubmitEnabled,
  getIsDfspSCSubmitPending,
  getIsDfspSCReadPending,
} from './selectors';

import './index.css';

const stateProps = (state: State) => ({
  environmentName: getEnvironmentName(state),
  error: getDfspSCError(state),
  rootCertificate: getDfspSCRootCertificate(state),
  intermediateChain: getDfspSCIntermediateChain(state),
  serverCertificate: getDfspSCServerCertificate(state),
  rootCertificateInfo: getDfspSCRootCertificateInfo(state),
  intermediateChainInfo: getDfspSCIntermediateChainInfo(state),
  serverCertificateInfo: getDfspSCServerCertificateInfo(state),
  validations: getDfspSCValidations(state),
  validationState: getDfspSCValidationState(state),
  isRootCertificateModalVisible: getIsDfspSCRootCertificateModalVisible(state),
  isIntermediateChainModalVisible: getIsDfspSCIntermediateChainModalVisible(state),
  isServerCertificateModalVisible: getIsDfspSCServerCertificateModalVisible(state),
  isSubmitEnabled: getIsDfspSCSubmitEnabled(state),
  isSubmitPending: getIsDfspSCSubmitPending(state),
  isReadPending: getIsDfspSCReadPending(state),
});

const actionProps = (dispatch: Dispatch) => ({
  onMount: () => dispatch(storeDfspSCServerCertificate()),
  onRootCertificateChange: (cert: string) =>
    dispatch(changeDfspSCRootCertificate({ certificate: cert })),
  onRootCertificateViewClick: () => dispatch(showDfspSCRootCertificateModal()),
  onRootCertificateDownloadClick: () => dispatch(downloadDfspSCRootCertificate()),
  onRootCertificateModalCloseClick: () => dispatch(hideDfspSCRootCertificateModal()),
  onIntermediateChainChange: (cert: string) =>
    dispatch(changeDfspSCIntermediateChain({ certificate: cert })),
  onIntermediateChainDownloadClick: () => dispatch(downloadDfspSCIntermediateChain()),
  onIntermediateChainViewClick: () => dispatch(showDfspSCIntermediateChainModal()),
  onIntermediateChainModalCloseClick: () => dispatch(hideDfspSCIntermediateChainModal()),
  onServerCertificateChange: (cert: string) =>
    dispatch(changeDfspSCServerCertificate({ certificate: cert })),
  onServerCertificateViewClick: () => dispatch(showDfspSCServerCertificateModal()),
  onServerCertificateDownloadClick: () => dispatch(downloadDfspSCServerCertificate()),
  onServerCertificateModalCloseClick: () => dispatch(hideDfspSCServerCertificateModal()),
  onCreateCertificateClick: () => dispatch(submitDfspSCServerCertificate()),
});

interface DfspSCProps {
  environmentName: string;
  error?: string;
  rootCertificate: string;
  intermediateChain: string;
  serverCertificate: string;
  rootCertificateInfo?: CertInfo;
  intermediateChainInfo?: CertInfo;
  serverCertificateInfo?: CertInfo;
  validations: CertificateValidationResults[];
  validationState?: string;
  isRootCertificateModalVisible: boolean;
  isIntermediateChainModalVisible: boolean;
  isServerCertificateModalVisible: boolean;
  isSubmitEnabled: boolean;
  isSubmitPending: boolean;
  isReadPending: boolean;
  onRootCertificateChange: (certificate: string) => void;
  onRootCertificateViewClick: () => void;
  onRootCertificateDownloadClick: () => AnyAction;
  onRootCertificateModalCloseClick: () => void;
  onIntermediateChainChange: (certificate: string) => void;
  onIntermediateChainViewClick: () => void;
  onIntermediateChainDownloadClick: () => AnyAction;
  onIntermediateChainModalCloseClick: () => void;
  onServerCertificateChange: (certificate: string) => void;
  onServerCertificateViewClick: () => void;
  onServerCertificateDownloadClick: () => AnyAction;
  onServerCertificateModalCloseClick: () => void;
  onCreateCertificateClick: () => void;
}

const DfspSC: FC<DfspSCProps> = ({
  environmentName,
  error,
  rootCertificate,
  intermediateChain,
  serverCertificate,
  rootCertificateInfo,
  intermediateChainInfo,
  serverCertificateInfo,
  validations,
  validationState,
  isRootCertificateModalVisible,
  isIntermediateChainModalVisible,
  isServerCertificateModalVisible,
  isSubmitEnabled,
  isSubmitPending,
  isReadPending,
  onRootCertificateChange,
  onRootCertificateViewClick,
  onRootCertificateDownloadClick,
  onRootCertificateModalCloseClick,
  onIntermediateChainChange,
  onIntermediateChainViewClick,
  onIntermediateChainDownloadClick,
  onIntermediateChainModalCloseClick,
  onServerCertificateChange,
  onServerCertificateViewClick,
  onServerCertificateDownloadClick,
  onServerCertificateModalCloseClick,
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
    <div className="dfsp-sc">
      <div className="dfsp-sc__submit__container">
        <Button
          className="dfsp-sc__submit"
          label="Submit"
          onClick={onCreateCertificateClick}
          disabled={!isSubmitEnabled}
          pending={isSubmitPending}
          icon="check-small"
        />
      </div>

      <div className="dfsp-sc__certificate-validation">
        <CertificateValidation
          validations={validations}
          state={validationState}
          type="certificate"
        />
      </div>

      <div className="dfsp-sc__certificate-item">
        <div className="dfsp-sc__server-certificate">
          <FormInput
            type="file"
            label="Server Certificate"
            parseFileAsText
            onChange={onServerCertificateChange}
            elementWidth="400px"
            value={serverCertificate || null}
            fileName={`${environmentName}-server.pem`}
            pending={isReadPending}
            required
          />
          {serverCertificate && (
            <FileControls
              onViewClick={onServerCertificateViewClick}
              onDownloadClick={onServerCertificateDownloadClick}
            />
          )}
        </div>
        {serverCertificateInfo && <CertificateInfo certInfo={serverCertificateInfo} />}
      </div>

      <div className="dfsp-sc__certificate-item">
        <div className="dfsp-sc__root-certificate">
          <FormInput
            type="file"
            label="Root Certificate"
            parseFileAsText
            onChange={onRootCertificateChange}
            elementWidth="400px"
            value={rootCertificate || null}
            fileName={`${environmentName}-root.pem`}
            pending={isReadPending}
          />
          {rootCertificate && (
            <FileControls
              onViewClick={onRootCertificateViewClick}
              onDownloadClick={onRootCertificateDownloadClick}
            />
          )}
        </div>
        {rootCertificateInfo && <CertificateInfo certInfo={rootCertificateInfo} />}
      </div>

      <div className="dfsp-sc__certificate-item">
        <div className="dfsp-sc__intermediate-chain">
          <FormInput
            type="file"
            label="Intermediate Chain"
            parseFileAsText
            onChange={onIntermediateChainChange}
            value={intermediateChain || null}
            fileName={`${environmentName}-intermediates.pem`}
            pending={isReadPending}
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

      {isRootCertificateModalVisible && (
        <CertificateModal
          onClose={onRootCertificateModalCloseClick}
          content={rootCertificate}
          title="Root Certificate"
        />
      )}
      {isIntermediateChainModalVisible && (
        <CertificateModal
          onClose={onIntermediateChainModalCloseClick}
          content={intermediateChain}
          title="Intermediate Chain"
        />
      )}
      {isServerCertificateModalVisible && (
        <CertificateModal
          onClose={onServerCertificateModalCloseClick}
          content={serverCertificate}
          title="Server Certificate"
        />
      )}
    </div>
  );
};

const MountedDfspSC = withMount(DfspSC, 'onMount');

export default connect(stateProps, actionProps)(MountedDfspSC);
