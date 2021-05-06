import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { getDfspName } from 'App/ConnectionWizard/selectors';
import {
  requestDfspSentCsrs,
  setDfspSentCsrsFilter,
  downloadDfspSentCsrCertificate,
  showDfspSentCsrsCertificateModal,
  hideDfspSentCsrsCertificateModal,
} from './actions';
import {
  getDfspSentCsrsError,
  getDfspSentCsrsFilter,
  getFilteredDfspSentCsrsCertificates,
  getDfspSentCsrsCertificateModalContent,
  getDfspSentCsrsCertificateModalTitle,
  getIsDfspSentCsrsCertificateModalVisible,
  getIsDfspSentCsrsPending,
} from './selectors';

const stateProps = (state: State) => ({
  dfspName: getDfspName(state),
  error: getDfspSentCsrsError(state),
  csrs: getFilteredDfspSentCsrsCertificates(state),
  filter: getDfspSentCsrsFilter(state),
  certificateModalContent: getDfspSentCsrsCertificateModalContent(state),
  certificateModalTitle: getDfspSentCsrsCertificateModalTitle(state),
  isCertificateModalVisible: getIsDfspSentCsrsCertificateModalVisible(state),
  isDfspSentCsrsPending: getIsDfspSentCsrsPending(state),
});

const actionProps = (dispatch: Dispatch) => ({
  onMount: () => dispatch(requestDfspSentCsrs()),
  onFilterChange: (filter: string) => dispatch(setDfspSentCsrsFilter({ filter })),
  onCertificateViewClick: (certificate: string, title: string) =>
    dispatch(showDfspSentCsrsCertificateModal({ certificate, title })),
  onCertificateDownloadClick: (certificate: string, extension: string) =>
    dispatch(downloadDfspSentCsrCertificate({ certificate, extension })),
  onCertificateModalCloseClick: () => dispatch(hideDfspSentCsrsCertificateModal()),
});

export default connect(stateProps, actionProps);
