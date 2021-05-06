import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  CertificateInfo,
  CertificateModal,
  CertificateValidation,
  FileControls,
  FormInput,
  MessageBox,
} from 'components';
import { AnyAction } from 'redux';
import { withMount } from 'utils/hocs';
import { getEnvironmentName } from 'App/ConnectionWizard/selectors';
import { CertificateValidationResults, CertInfo } from 'App/types';
import { State, Dispatch } from 'store/types';
import {
  storeDfspHubSCServerCertificate,
  downloadDfspHubSCRootCertificate,
  showDfspHubSCRootCertificateModal,
  hideDfspHubSCRootCertificateModal,
  downloadDfspHubSCIntermediateChain,
  showDfspHubSCIntermediateChainModal,
  hideDfspHubSCIntermediateChainModal,
  downloadDfspHubSCServerCertificate,
  showDfspHubSCServerCertificateModal,
  hideDfspHubSCServerCertificateModal,
} from './actions';
import {
  getDfspHubSCError,
  getDfspHubSCRootCertificate,
  getDfspHubSCIntermediateChain,
  getDfspHubSCServerCertificate,
  getDfspHubSCRootCertificateInfo,
  getDfspHubSCIntermediateChainInfo,
  getDfspHubSCServerCertificateInfo,
  getDfspHubSCValidations,
  getDfspHubSCValidationState,
  getIsDfspHubSCRootCertificateModalVisible,
  getIsDfspHubSCIntermediateChainModalVisible,
  getIsDfspHubSCServerCertificateModalVisible,
  getIsDfspHubSCCreatePending,
} from './selectors';

import './index.css';

const stateProps = (state: State) => ({
  environmentName: getEnvironmentName(state),
  error: getDfspHubSCError(state),
  rootCertificate: getDfspHubSCRootCertificate(state),
  intermediateChain: getDfspHubSCIntermediateChain(state),
  serverCertificate: getDfspHubSCServerCertificate(state),
  rootCertificateInfo: getDfspHubSCRootCertificateInfo(state),
  intermediateChainInfo: getDfspHubSCIntermediateChainInfo(state),
  serverCertificateInfo: getDfspHubSCServerCertificateInfo(state),
  validations: getDfspHubSCValidations(state),
  validationState: getDfspHubSCValidationState(state),
  isRootCertificateModalVisible: getIsDfspHubSCRootCertificateModalVisible(state),
  isIntermediateChainModalVisible: getIsDfspHubSCIntermediateChainModalVisible(state),
  isServerCertificateModalVisible: getIsDfspHubSCServerCertificateModalVisible(state),
  isSubmitPending: getIsDfspHubSCCreatePending(state),
});

const actionProps = (dispatch: Dispatch) => ({
  onMount: () => dispatch(storeDfspHubSCServerCertificate()),
  onRootCertificateViewClick: () => dispatch(showDfspHubSCRootCertificateModal()),
  onRootCertificateDownloadClick: () => dispatch(downloadDfspHubSCRootCertificate()),
  onRootCertificateModalCloseClick: () => dispatch(hideDfspHubSCRootCertificateModal()),
  onIntermediateChainDownloadClick: () => dispatch(downloadDfspHubSCIntermediateChain()),
  onIntermediateChainViewClick: () => dispatch(showDfspHubSCIntermediateChainModal()),
  onIntermediateChainModalCloseClick: () => dispatch(hideDfspHubSCIntermediateChainModal()),
  onServerCertificateViewClick: () => dispatch(showDfspHubSCServerCertificateModal()),
  onServerCertificateDownloadClick: () => dispatch(downloadDfspHubSCServerCertificate()),
  onServerCertificateModalCloseClick: () => dispatch(hideDfspHubSCServerCertificateModal()),
});

interface DfspHubSCProps {
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

const HubSC: FC<DfspHubSCProps> = ({
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
  isSubmitPending,
  onRootCertificateViewClick,
  onRootCertificateDownloadClick,
  onRootCertificateModalCloseClick,
  onIntermediateChainViewClick,
  onIntermediateChainDownloadClick,
  onIntermediateChainModalCloseClick,
  onServerCertificateViewClick,
  onServerCertificateDownloadClick,
  onServerCertificateModalCloseClick,
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
    <div className="hub-sc">
      <div className="hub-sc__certificate-validation">
        <CertificateValidation
          validations={validations}
          state={validationState}
          type="certificate"
        />
      </div>

      <div className="hub-sc__certificate-item">
        <div className="hub-sc__server-certificate">
          <FormInput
            type="text"
            label="Server Certificate"
            elementWidth="400px"
            value={serverCertificate ? `${environmentName}-hub-server.pem` : 'Unavailable'}
            icon={serverCertificate && 'documents'}
            pending={isSubmitPending}
            disabled
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

      <div className="hub-sc__certificate-item">
        <div className="hub-sc__root-certificate">
          <FormInput
            type="text"
            label="Root Certificate"
            elementWidth="400px"
            value={rootCertificate ? `${environmentName}-hub-root.pem` : 'Unavailable'}
            icon={rootCertificate && 'documents'}
            pending={isSubmitPending}
            disabled
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

      <div className="hub-sc__certificate-item">
        <div className="hub-sc__intermediate-chain">
          <FormInput
            type="text"
            label="Intermediate Chain"
            pending={isSubmitPending}
            value={intermediateChain ? `${environmentName}-hub-intermediates.pem` : 'Unavailable'}
            icon={intermediateChain && 'documents'}
            elementWidth="400px"
            disabled
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

const MountedHubSC = withMount(HubSC, 'onMount');

export default connect(stateProps, actionProps)(MountedHubSC);
