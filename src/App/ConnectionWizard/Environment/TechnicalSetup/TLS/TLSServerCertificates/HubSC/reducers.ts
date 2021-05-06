import {
  RESET_DFSP_HUB_SC,
  SET_DFSP_HUB_SC_ERROR,
  SET_DFSP_HUB_SC_ROOT_CERTIFICATE,
  SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
  SET_DFSP_HUB_SC_SERVER_CERTIFICATE,
  SET_DFSP_HUB_SC_ROOT_CERTIFICATE_INFO,
  SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN_INFO,
  SET_DFSP_HUB_SC_SERVER_CERTIFICATE_INFO,
  SET_DFSP_HUB_SC_VALIDATIONS,
  SET_DFSP_HUB_SC_VALIDATION_STATE,
  CHANGE_DFSP_HUB_SC_ROOT_CERTIFICATE,
  CHANGE_DFSP_HUB_SC_INTERMEDIATE_CHAIN,
  CHANGE_DFSP_HUB_SC_SERVER_CERTIFICATE,
  SHOW_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL,
  HIDE_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL,
  SHOW_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  HIDE_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL,
  SHOW_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL,
  HIDE_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL,
  DfspHubSCActionTypes,
  DfspHubSCState,
} from './types';

const initialState = {
  dfspHubSCError: null,
  previousDfspHubSCRootCertificate: undefined,
  previousDfspHubSCIntermediateChain: undefined,
  previousDfspHubSCServerCertificate: undefined,
  dfspHubSCRootCertificate: undefined,
  dfspHubSCIntermediateChain: undefined,
  dfspHubSCServerCertificate: undefined,
  dfspHubSCRootCertificateInfo: undefined,
  dfspHubSCIntermediateChainInfo: undefined,
  dfspHubSCServerCertificateInfo: undefined,
  dfspHubSCValidations: [],
  dfspHubSCValidationState: undefined,
  isDfspHubSCRootCertificateModalVisible: false,
  isDfspHubSCIntermediateChainModalVisible: false,
  isDfspHubSCServerCertificateModalVisible: false,
};

export default function dfspHubSCReducer(
  state = initialState,
  action: DfspHubSCActionTypes
): DfspHubSCState {
  switch (action.type) {
    case RESET_DFSP_HUB_SC: {
      return initialState;
    }

    case SET_DFSP_HUB_SC_ERROR: {
      return {
        ...state,
        dfspHubSCError: action.error,
      };
    }

    case SET_DFSP_HUB_SC_ROOT_CERTIFICATE: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        previousDfspHubSCRootCertificate: action.certificate,
        dfspHubSCRootCertificate: action.certificate,
      };
    }

    case SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        previousDfspHubSCIntermediateChain: action.certificate,
        dfspHubSCIntermediateChain: action.certificate,
      };
    }

    case SET_DFSP_HUB_SC_SERVER_CERTIFICATE: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        previousDfspHubSCServerCertificate: action.certificate,
        dfspHubSCServerCertificate: action.certificate,
      };
    }

    case SET_DFSP_HUB_SC_ROOT_CERTIFICATE_INFO: {
      return {
        ...state,
        dfspHubSCRootCertificateInfo: action.certInfo,
      };
    }

    case SET_DFSP_HUB_SC_INTERMEDIATE_CHAIN_INFO: {
      return {
        ...state,
        dfspHubSCIntermediateChainInfo: action.certInfo,
      };
    }

    case SET_DFSP_HUB_SC_SERVER_CERTIFICATE_INFO: {
      return {
        ...state,
        dfspHubSCServerCertificateInfo: action.certInfo,
      };
    }

    case SET_DFSP_HUB_SC_VALIDATIONS: {
      return {
        ...state,
        dfspHubSCValidations: action.validations,
      };
    }

    case SET_DFSP_HUB_SC_VALIDATION_STATE: {
      return {
        ...state,
        dfspHubSCValidationState: action.validationState,
      };
    }

    case CHANGE_DFSP_HUB_SC_ROOT_CERTIFICATE: {
      return {
        ...state,
        dfspHubSCRootCertificate: action.certificate,
        dfspHubSCRootCertificateInfo: initialState.dfspHubSCRootCertificateInfo,
        dfspHubSCValidationState: initialState.dfspHubSCValidationState,
        dfspHubSCValidations: initialState.dfspHubSCValidations,
      };
    }

    case CHANGE_DFSP_HUB_SC_INTERMEDIATE_CHAIN: {
      return {
        ...state,
        dfspHubSCIntermediateChain: action.certificate,
        dfspHubSCIntermediateChainInfo: initialState.dfspHubSCIntermediateChainInfo,
        dfspHubSCValidationState: initialState.dfspHubSCValidationState,
        dfspHubSCValidations: initialState.dfspHubSCValidations,
      };
    }

    case CHANGE_DFSP_HUB_SC_SERVER_CERTIFICATE: {
      return {
        ...state,
        dfspHubSCServerCertificate: action.certificate,
        dfspHubSCServerCertificateInfo: initialState.dfspHubSCServerCertificateInfo,
        dfspHubSCValidationState: initialState.dfspHubSCValidationState,
        dfspHubSCValidations: initialState.dfspHubSCValidations,
      };
    }

    case SHOW_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspHubSCRootCertificateModalVisible: true,
      };
    }

    case HIDE_DFSP_HUB_SC_ROOT_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspHubSCRootCertificateModalVisible: false,
      };
    }

    case SHOW_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL: {
      return {
        ...state,
        isDfspHubSCIntermediateChainModalVisible: true,
      };
    }

    case HIDE_DFSP_HUB_SC_INTERMEDIATE_CHAIN_MODAL: {
      return {
        ...state,
        isDfspHubSCIntermediateChainModalVisible: false,
      };
    }

    case SHOW_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspHubSCServerCertificateModalVisible: true,
      };
    }

    case HIDE_DFSP_HUB_SC_SERVER_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspHubSCServerCertificateModalVisible: false,
      };
    }

    default:
      return state;
  }
}
