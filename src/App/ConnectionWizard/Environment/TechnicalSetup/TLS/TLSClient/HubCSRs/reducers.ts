import {
  RESET_DFSP_HUB_CSRS,
  SET_DFSP_HUB_CSRS_CERTIFICATES,
  SET_DFSP_HUB_CSRS_CERTIFICATES_ERROR,
  SHOW_DFSP_HUB_CSRS_CERTIFICATE_MODAL,
  HIDE_DFSP_HUB_CSRS_CERTIFICATE_MODAL,
  DfspHubCSRsActionTypes,
  DfspHubCSRsState,
} from './types';

const initialState = {
  dfspHubCsrsError: null,
  dfspHubCsrsCertificates: [],
  isDfspHubCsrsCertificateModalVisible: false,
  dfspHubCsrsCertificateModalContent: undefined,
  dfspHubCsrsCertificateModalTitle: undefined,
};

export default function dfspHubCsrReducer(
  state = initialState,
  action: DfspHubCSRsActionTypes
): DfspHubCSRsState {
  switch (action.type) {
    case RESET_DFSP_HUB_CSRS: {
      return initialState;
    }
    case SET_DFSP_HUB_CSRS_CERTIFICATES_ERROR: {
      return {
        ...state,
        dfspHubCsrsError: action.error,
      };
    }
    case SET_DFSP_HUB_CSRS_CERTIFICATES: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        dfspHubCsrsCertificates: action.certificates || [],
      };
    }
    case SHOW_DFSP_HUB_CSRS_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspHubCsrsCertificateModalVisible: true,
        dfspHubCsrsCertificateModalContent: action.certificate,
        dfspHubCsrsCertificateModalTitle: action.title,
      };
    }
    case HIDE_DFSP_HUB_CSRS_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspHubCsrsCertificateModalVisible: false,
        dfspHubCsrsCertificateModalContent: undefined,
        dfspHubCsrsCertificateModalTitle: undefined,
      };
    }
    default:
      return state;
  }
}
