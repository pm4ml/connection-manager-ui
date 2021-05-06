import {
  RESET_DFSP_JWS,
  SET_DFSP_JWS_ERROR,
  SET_DFSP_JWS_CERTIFICATE,
  SET_DFSP_JWS_INTERMEDIATE_CHAIN,
  SET_DFSP_JWS_CERTIFICATE_INFO,
  SET_DFSP_JWS_INTERMEDIATE_CHAIN_INFO,
  SET_DFSP_JWS_VALIDATIONS,
  SET_DFSP_JWS_VALIDATION_STATE,
  CHANGE_DFSP_JWS_CERTIFICATE,
  CHANGE_DFSP_JWS_INTERMEDIATE_CHAIN,
  SHOW_DFSP_JWS_CERTIFICATE_MODAL,
  HIDE_DFSP_JWS_CERTIFICATE_MODAL,
  SHOW_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL,
  HIDE_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL,
  DFSPJWSActionTypes,
  DFSPJWSState,
} from './types';

const initialState = {
  dfspJWSError: '',
  previousDfspJWSCertificate: undefined,
  previousDfspJWSIntermediateChain: undefined,
  dfspJWSCertificate: '',
  dfspJWSIntermediateChain: '',
  dfspJWSCertificateInfo: undefined,
  dfspJWSIntermediateChainInfo: undefined,
  dfspJWSValidations: [],
  dfspJWSValidationState: undefined,
  isDfspJWSCertificateModalVisible: false,
  isDfspJWSIntermediateChainModalVisible: false,
};

export default function dfspJWSReducer(
  state = initialState,
  action: DFSPJWSActionTypes
): DFSPJWSState {
  switch (action.type) {
    case RESET_DFSP_JWS: {
      return initialState;
    }

    case SET_DFSP_JWS_ERROR: {
      return {
        ...state,
        dfspJWSError: action.error,
      };
    }

    case SET_DFSP_JWS_CERTIFICATE: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        previousDfspJWSCertificate: action.certificate,
        dfspJWSCertificate: action.certificate,
      };
    }

    case SET_DFSP_JWS_INTERMEDIATE_CHAIN: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        previousDfspJWSIntermediateChain: action.certificate,
        dfspJWSIntermediateChain: action.certificate,
      };
    }

    case SET_DFSP_JWS_CERTIFICATE_INFO: {
      return {
        ...state,
        dfspJWSCertificateInfo: action.certInfo,
      };
    }

    case SET_DFSP_JWS_INTERMEDIATE_CHAIN_INFO: {
      return {
        ...state,
        dfspJWSIntermediateChainInfo: action.certInfo,
      };
    }

    case SET_DFSP_JWS_VALIDATIONS: {
      return {
        ...state,
        dfspJWSValidations: action.validations,
      };
    }

    case SET_DFSP_JWS_VALIDATION_STATE: {
      return {
        ...state,
        dfspJWSValidationState: action.validationState,
      };
    }

    case CHANGE_DFSP_JWS_CERTIFICATE: {
      return {
        ...state,
        dfspJWSCertificate: action.certificate,
        dfspJWSCertificateInfo: initialState.dfspJWSCertificateInfo,
        dfspJWSValidationState: initialState.dfspJWSValidationState,
        dfspJWSValidations: initialState.dfspJWSValidations,
      };
    }

    case CHANGE_DFSP_JWS_INTERMEDIATE_CHAIN: {
      return {
        ...state,
        dfspJWSIntermediateChain: action.certificate,
        dfspJWSIntermediateChainInfo: initialState.dfspJWSIntermediateChainInfo,
        dfspJWSValidationState: initialState.dfspJWSValidationState,
        dfspJWSValidations: initialState.dfspJWSValidations,
      };
    }

    case SHOW_DFSP_JWS_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspJWSCertificateModalVisible: true,
      };
    }

    case HIDE_DFSP_JWS_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspJWSCertificateModalVisible: false,
      };
    }

    case SHOW_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL: {
      return {
        ...state,
        isDfspJWSIntermediateChainModalVisible: true,
      };
    }
    case HIDE_DFSP_JWS_INTERMEDIATE_CHAIN_MODAL: {
      return {
        ...state,
        isDfspJWSIntermediateChainModalVisible: false,
      };
    }

    default:
      return state;
  }
}
