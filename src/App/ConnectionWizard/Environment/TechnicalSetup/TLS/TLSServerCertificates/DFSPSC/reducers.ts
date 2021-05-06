import {
  RESET_DFSP_SC,
  SET_DFSP_SC_ERROR,
  SET_DFSP_SC_ROOT_CERTIFICATE,
  SET_DFSP_SC_INTERMEDIATE_CHAIN,
  SET_DFSP_SC_SERVER_CERTIFICATE,
  SET_DFSP_SC_ROOT_CERTIFICATE_INFO,
  SET_DFSP_SC_INTERMEDIATE_CHAIN_INFO,
  SET_DFSP_SC_SERVER_CERTIFICATE_INFO,
  SET_DFSP_SC_VALIDATIONS,
  SET_DFSP_SC_VALIDATION_STATE,
  CHANGE_DFSP_SC_ROOT_CERTIFICATE,
  CHANGE_DFSP_SC_INTERMEDIATE_CHAIN,
  CHANGE_DFSP_SC_SERVER_CERTIFICATE,
  SHOW_DFSP_SC_ROOT_CERTIFICATE_MODAL,
  HIDE_DFSP_SC_ROOT_CERTIFICATE_MODAL,
  SHOW_DFSP_SC_INTERMEDIATE_CHAIN_MODAL,
  HIDE_DFSP_SC_INTERMEDIATE_CHAIN_MODAL,
  SHOW_DFSP_SC_SERVER_CERTIFICATE_MODAL,
  HIDE_DFSP_SC_SERVER_CERTIFICATE_MODAL,
  DfspSCActionTypes,
  DfspSCState,
} from './types';

const initialState = {
  dfspSCError: null,
  previousDfspSCRootCertificate: undefined,
  previousDfspSCIntermediateChain: undefined,
  previousDfspSCServerCertificate: undefined,
  dfspSCRootCertificate: undefined,
  dfspSCIntermediateChain: undefined,
  dfspSCServerCertificate: undefined,
  dfspSCRootCertificateInfo: undefined,
  dfspSCIntermediateChainInfo: undefined,
  dfspSCServerCertificateInfo: undefined,
  dfspSCValidations: [],
  dfspSCValidationState: undefined,
  isDfspSCRootCertificateModalVisible: false,
  isDfspSCIntermediateChainModalVisible: false,
  isDfspSCServerCertificateModalVisible: false,
};

export default function dfspSCReducer(
  state = initialState,
  action: DfspSCActionTypes
): DfspSCState {
  switch (action.type) {
    case RESET_DFSP_SC: {
      return initialState;
    }

    case SET_DFSP_SC_ERROR: {
      return {
        ...state,
        dfspSCError: action.error,
      };
    }

    case SET_DFSP_SC_ROOT_CERTIFICATE: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        previousDfspSCRootCertificate: action.certificate,
        dfspSCRootCertificate: action.certificate,
      };
    }

    case SET_DFSP_SC_INTERMEDIATE_CHAIN: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        previousDfspSCIntermediateChain: action.certificate,
        dfspSCIntermediateChain: action.certificate,
      };
    }

    case SET_DFSP_SC_SERVER_CERTIFICATE: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        previousDfspSCServerCertificate: action.certificate,
        dfspSCServerCertificate: action.certificate,
      };
    }

    case SET_DFSP_SC_ROOT_CERTIFICATE_INFO: {
      return {
        ...state,
        dfspSCRootCertificateInfo: action.certInfo,
      };
    }

    case SET_DFSP_SC_INTERMEDIATE_CHAIN_INFO: {
      return {
        ...state,
        dfspSCIntermediateChainInfo: action.certInfo,
      };
    }

    case SET_DFSP_SC_SERVER_CERTIFICATE_INFO: {
      return {
        ...state,
        dfspSCServerCertificateInfo: action.certInfo,
      };
    }

    case SET_DFSP_SC_VALIDATIONS: {
      return {
        ...state,
        dfspSCValidations: action.validations,
      };
    }

    case SET_DFSP_SC_VALIDATION_STATE: {
      return {
        ...state,
        dfspSCValidationState: action.validationState,
      };
    }

    case CHANGE_DFSP_SC_ROOT_CERTIFICATE: {
      return {
        ...state,
        dfspSCRootCertificate: action.certificate,
        dfspSCRootCertificateInfo: initialState.dfspSCRootCertificateInfo,
        dfspSCValidationState: initialState.dfspSCValidationState,
        dfspSCValidations: initialState.dfspSCValidations,
      };
    }

    case CHANGE_DFSP_SC_INTERMEDIATE_CHAIN: {
      return {
        ...state,
        dfspSCIntermediateChain: action.certificate,
        dfspSCIntermediateChainInfo: initialState.dfspSCIntermediateChainInfo,
        dfspSCValidationState: initialState.dfspSCValidationState,
        dfspSCValidations: initialState.dfspSCValidations,
      };
    }

    case CHANGE_DFSP_SC_SERVER_CERTIFICATE: {
      return {
        ...state,
        dfspSCServerCertificate: action.certificate,
        dfspSCServerCertificateInfo: initialState.dfspSCServerCertificateInfo,
        dfspSCValidationState: initialState.dfspSCValidationState,
        dfspSCValidations: initialState.dfspSCValidations,
      };
    }

    case SHOW_DFSP_SC_ROOT_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspSCRootCertificateModalVisible: true,
      };
    }

    case HIDE_DFSP_SC_ROOT_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspSCRootCertificateModalVisible: false,
      };
    }

    case SHOW_DFSP_SC_INTERMEDIATE_CHAIN_MODAL: {
      return {
        ...state,
        isDfspSCIntermediateChainModalVisible: true,
      };
    }

    case HIDE_DFSP_SC_INTERMEDIATE_CHAIN_MODAL: {
      return {
        ...state,
        isDfspSCIntermediateChainModalVisible: false,
      };
    }

    case SHOW_DFSP_SC_SERVER_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspSCServerCertificateModalVisible: true,
      };
    }

    case HIDE_DFSP_SC_SERVER_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspSCServerCertificateModalVisible: false,
      };
    }

    default:
      return state;
  }
}
