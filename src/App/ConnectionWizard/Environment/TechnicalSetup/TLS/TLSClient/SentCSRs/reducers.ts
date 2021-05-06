import {
  RESET_DFSP_SENT_CSRS,
  SET_DFSP_SENT_CSRS_CERTIFICATES_ERROR,
  SET_DFSP_SENT_CSRS_FILTER,
  SET_DFSP_SENT_CSRS_CERTIFICATES,
  SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL,
  HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL,
  DfspSentCSRsActionTypes,
  SentCSRsState,
} from './types';

const initialState = {
  dfspSentCsrsError: null,
  dfspSentCsrsFilter: '',
  dfspSentCsrsCertificates: [],
  isDfspSentCsrsCertificateModalVisible: false,
  dfspSentCsrsCertificateModalContent: undefined,
  dfspSentCsrsCertificateModalTitle: undefined,
};

export default function dfspSentCsrsReducer(
  state = initialState,
  action: DfspSentCSRsActionTypes
): SentCSRsState {
  switch (action.type) {
    case RESET_DFSP_SENT_CSRS: {
      return initialState;
    }
    case SET_DFSP_SENT_CSRS_CERTIFICATES_ERROR: {
      return {
        ...state,
        dfspSentCsrsError: action.error,
      };
    }
    case SET_DFSP_SENT_CSRS_FILTER: {
      return {
        ...state,
        dfspSentCsrsFilter: action.filter || '',
      };
    }
    case SET_DFSP_SENT_CSRS_CERTIFICATES: {
      return {
        ...state,
        dfspSentCsrsCertificates: action.certificates || initialState.dfspSentCsrsCertificates,
      };
    }
    case SHOW_DFSP_SENT_CSRS_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspSentCsrsCertificateModalVisible: true,
        dfspSentCsrsCertificateModalContent: action.certificate,
        dfspSentCsrsCertificateModalTitle: action.title,
      };
    }
    case HIDE_DFSP_SENT_CSRS_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspSentCsrsCertificateModalVisible: false,
        dfspSentCsrsCertificateModalContent: undefined,
        dfspSentCsrsCertificateModalTitle: undefined,
      };
    }
    default:
      return state;
  }
}
