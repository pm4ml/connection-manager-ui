import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  CertificateInfo,
  CertificateModal,
  CertificateValidation,
  Checkbox,
  FileControls,
  FormInput,
  MessageBox,
  TextField,
} from 'components';
import { withMount } from 'utils/hocs';
import { getEnvironmentName } from 'App/ConnectionWizard/selectors';
import { State, Dispatch } from 'store/types';

import {
  getIsSameMonetaryZoneFilterEnabled,
  getOtherDfspsJWSError,
  getOtherDfspsJWSFilter,
  getOtherDfspsJWSSameMonetaryZone,
  getIsOtherDfspsJWSCertificateModalVisible,
  getOtherDfspsJWSCertificateModalContent,
  getIsOtherDfspsJWSIntermediateChainModalVisible,
  getOtherDfspsJWSIntermediateChainModalContent,
  getIsOtherDfspsJWSPending,
  getFilteredOtherDfspsJWSCertificatesByDfsp,
} from './selectors';

import './index.css';
import {
  storeOtherDfspsJWSCertificates,
  setOtherDfspsJWSFilter,
  setOtherDfspsJWSSameMonetaryZone,
  showOtherDfspsJWSCertificateModal,
  downloadOtherDfspsJWSCertificate,
  hideOtherDfspsJWSCertificateModal,
  downloadOtherDfspsJWSIntermediateChain,
  showOtherDfspsJWSIntermediateChainModal,
  hideOtherDfspsJWSIntermediateChainModal,
} from './actions';
import { OtherCertificates } from '../types';

const stateProps = (state: State) => ({
  environmentName: getEnvironmentName(state),
  error: getOtherDfspsJWSError(state),
  filter: getOtherDfspsJWSFilter(state),
  sameMonetaryZone: getOtherDfspsJWSSameMonetaryZone(state),
  certificatesByDfsp: getFilteredOtherDfspsJWSCertificatesByDfsp(state),
  isJwsCertificateModalVisible: getIsOtherDfspsJWSCertificateModalVisible(state),
  jwsCertificateModalContent: getOtherDfspsJWSCertificateModalContent(state),
  isIntermediateChainModalVisible: getIsOtherDfspsJWSIntermediateChainModalVisible(state),
  isSameMonetaryZoneFilterEnabled: getIsSameMonetaryZoneFilterEnabled(state),
  intermediateChainModalContent: getOtherDfspsJWSIntermediateChainModalContent(state),
  isDfspsJWSPending: getIsOtherDfspsJWSPending(state),
});

const actionProps = (dispatch: Dispatch) => ({
  onMount: () => dispatch(storeOtherDfspsJWSCertificates()),
  onFilterChange: (value: string) => dispatch(setOtherDfspsJWSFilter({ value })),
  onSameMonetaryZoneChange: (value: boolean) =>
    dispatch(setOtherDfspsJWSSameMonetaryZone({ value })),
  onJwsCertificateViewClick: (cert: string) =>
    dispatch(showOtherDfspsJWSCertificateModal({ cert })),
  onJwsCertificateDownloadClick: (cert: string) =>
    dispatch(downloadOtherDfspsJWSCertificate({ cert })),
  onJwsCertificateModalCloseClick: () => dispatch(hideOtherDfspsJWSCertificateModal()),
  onIntermediateChainDownloadClick: (cert: string) =>
    dispatch(downloadOtherDfspsJWSIntermediateChain({ cert })),
  onIntermediateChainViewClick: (cert: string) =>
    dispatch(showOtherDfspsJWSIntermediateChainModal({ cert })),
  onIntermediateChainModalCloseClick: () => dispatch(hideOtherDfspsJWSIntermediateChainModal()),
});

interface OtherDFSPsJWSProps {
  environmentName: string;
  error: string;
  filter: string;
  sameMonetaryZone: string;
  certificatesByDfsp: OtherCertificates[];
  jwsCertificateModalContent: string;
  intermediateChainModalContent: string;
  isJwsCertificateModalVisible: boolean;
  isIntermediateChainModalVisible: boolean;
  isSameMonetaryZoneFilterEnabled: boolean;
  isDfspsJWSPending: boolean;
  onFilterChange: (value: string) => void;
  onSameMonetaryZoneChange: (value: string) => void;
  onJwsCertificateViewClick: (cert: string) => void;
  onJwsCertificateDownloadClick: (cert: string, dfspName: string) => void;
  onJwsCertificateModalCloseClick: () => void;
  onIntermediateChainViewClick: (cert: string) => void;
  onIntermediateChainDownloadClick: (cert: string, dfspName: string) => void;
  onIntermediateChainModalCloseClick: () => void;
}

const OtherDFSPsJWS: FC<OtherDFSPsJWSProps> = ({
  environmentName,
  error,
  filter,
  sameMonetaryZone,
  certificatesByDfsp,
  jwsCertificateModalContent,
  intermediateChainModalContent,
  isJwsCertificateModalVisible,
  isIntermediateChainModalVisible,
  isSameMonetaryZoneFilterEnabled,
  isDfspsJWSPending,
  onFilterChange,
  onSameMonetaryZoneChange,
  onJwsCertificateViewClick,
  onJwsCertificateDownloadClick,
  onJwsCertificateModalCloseClick,
  onIntermediateChainViewClick,
  onIntermediateChainDownloadClick,
  onIntermediateChainModalCloseClick,
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
    <div className="dfsps-jws">
      <div className="dfsps-jws__filter">
        <TextField
          placeholder="Search DFSP JWS Certificates"
          value={filter}
          onChange={onFilterChange}
        />
      </div>
      <div className="dfsps-jws__filter">
        <Checkbox
          checked={sameMonetaryZone}
          onChange={onSameMonetaryZoneChange}
          disabled={!isSameMonetaryZoneFilterEnabled}
          label="Show only in the same monetary zone"
        />
      </div>

      <OtherDFSPsCertificates
        environmentName={environmentName}
        certificates={certificatesByDfsp}
        isDfspsJWSPending={isDfspsJWSPending}
        onJwsCertificateViewClick={onJwsCertificateViewClick}
        onJwsCertificateDownloadClick={onJwsCertificateDownloadClick}
        onIntermediateChainViewClick={onIntermediateChainViewClick}
        onIntermediateChainDownloadClick={onIntermediateChainDownloadClick}
      />

      {isJwsCertificateModalVisible && (
        <CertificateModal
          onClose={onJwsCertificateModalCloseClick}
          content={jwsCertificateModalContent}
          title="JWS Certificate"
        />
      )}
      {isIntermediateChainModalVisible && (
        <CertificateModal
          onClose={onIntermediateChainModalCloseClick}
          content={intermediateChainModalContent}
          title="Intermediate Chain"
        />
      )}
    </div>
  );
};

interface OtherDFSPsCertificatesProps {
  environmentName: string;
  certificates: OtherCertificates[];
  isDfspsJWSPending: boolean;
  onJwsCertificateViewClick: (cert: string) => void;
  onJwsCertificateDownloadClick: (cert: string, dfspName: string) => void;
  onIntermediateChainViewClick: (cert: string) => void;
  onIntermediateChainDownloadClick: (cert: string, dfspName: string) => void;
}

const OtherDFSPsCertificates: FC<OtherDFSPsCertificatesProps> = ({
  environmentName,
  certificates,
  isDfspsJWSPending,
  onJwsCertificateViewClick,
  onJwsCertificateDownloadClick,
  onIntermediateChainViewClick,
  onIntermediateChainDownloadClick,
}) => {
  if (!certificates.length) {
    return (
      <MessageBox
        icon="info-small"
        kind="default"
        message="There are no certificates"
        size={30}
        fontSize={17}
        center
      />
    );
  }

  const certsComponent = certificates.map((certificate: OtherCertificates) => {
    const {
      dfspId,
      dfspName,
      error,
      jwsCertificate,
      intermediateChain,
      jwsCertificateInfo,
      intermediateChainInfo,
      validations,
      validationState,
      isDownloadEnabled,
    } = certificate;

    const header = (
      <div className="dfsps-jws__title">
        <span className="dfsps-jws__name">{dfspName}</span>
        <span className="dfsps-jws__spacing"> - </span>
        <span className="dfsps-jws__environment">{environmentName}</span>
      </div>
    );

    return (
      <div key={dfspId.toString()} className="dfsps-jws__dfsp">
        {header}
        {error ? (
          <MessageBox
            icon="warning-sign"
            kind="danger"
            message={`There was an error retrieving the ${dfspName}certificates`}
          />
        ) : (
          [
            <div className="dfsps-jws__certificate-validation" key="validation">
              {validations && (
                <CertificateValidation
                  validations={validations}
                  state={validationState}
                  type="certificate"
                />
              )}
            </div>,
            <div className="dfsps-jws__certificate-item" key="jws">
              <div className="dfsps-jws__jws-certificate">
                <FormInput
                  type="text"
                  label="JWS Certificate"
                  elementWidth="400px"
                  value={jwsCertificate ? `${dfspName}-jws.pem` : 'No File Provided'}
                  icon={jwsCertificate && 'documents'}
                  pending={isDfspsJWSPending}
                  disabled
                />
                {jwsCertificate && (
                  <FileControls
                    onViewClick={() => onJwsCertificateViewClick(jwsCertificate)}
                    onDownloadClick={() => onJwsCertificateDownloadClick(jwsCertificate, dfspName)}
                    downloadDisabled={!isDownloadEnabled}
                  />
                )}
              </div>
              {jwsCertificateInfo && <CertificateInfo certInfo={jwsCertificateInfo} />}
            </div>,
            <div className="dfsps-jws__certificate-item" key="chain">
              <div className="dfsps-jws__intermediate-chain">
                <FormInput
                  type="text"
                  label="Intermediate Chain"
                  pending={isDfspsJWSPending}
                  value={intermediateChain ? `${dfspName}-intermediates.pem` : 'No File Provided'}
                  icon={intermediateChain && 'documents'}
                  elementWidth="400px"
                  disabled
                />
                {intermediateChain && (
                  <FileControls
                    onViewClick={() => onIntermediateChainViewClick(intermediateChain)}
                    onDownloadClick={
                      () => onIntermediateChainDownloadClick(intermediateChain, dfspName)
                      // eslint-disable-next-line react/jsx-curly-newline
                    }
                  />
                )}
              </div>
              {intermediateChainInfo && <CertificateInfo certInfo={intermediateChainInfo} />}
            </div>,
          ]
        )}
      </div>
    );
  });

  return <>{certsComponent}</>;
};

const MountedOtherDFSPsJWS = withMount(OtherDFSPsJWS, 'onMount');

export default connect(stateProps, actionProps)(MountedOtherDFSPsJWS);
