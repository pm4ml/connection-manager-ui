import {
  OtherDFSPsJWSActionTypes,
  OtherDFSPsJWSState,
  RESET_OTHER_DFSPS_JWS,
  SET_OTHER_DFSPS_JWS_ERROR,
  SET_OTHER_DFSPS_JWS_FILTER,
  SET_OTHER_DFSPS_JWS_SAME_MONETARY_ZONE,
  SET_OTHER_DFSPS_JWS_CERTIFICATES,
  SHOW_OTHER_DFSPS_JWS_CERTIFICATE_MODAL,
  HIDE_OTHER_DFSPS_JWS_CERTIFICATE_MODAL,
  SHOW_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL,
  HIDE_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL,
} from './types';

const initialState = {
  otherDfspsJWSError: undefined,
  otherDfspsJWSFilter: '',
  otherDfspsSameMonetaryZone: false,
  otherDfspsJWSCertificates: [],
  otherDfspsJWSCertificateModalContent: undefined,
  isOtherDfspsJWSCertificateModalVisible: false,
  OtherDfspsJWSIntermediateChainModalContent: undefined,
  isOtherDfspsJWSIntermediateChainModalVisible: false,
};

export default function OtherDfspsJWSReducer(
  state = initialState,
  action: OtherDFSPsJWSActionTypes
): OtherDFSPsJWSState {
  switch (action.type) {
    case RESET_OTHER_DFSPS_JWS: {
      return initialState;
    }

    case SET_OTHER_DFSPS_JWS_ERROR: {
      return {
        ...state,
        otherDfspsJWSError: action.error,
      };
    }

    case SET_OTHER_DFSPS_JWS_FILTER: {
      return {
        ...state,
        otherDfspsJWSFilter: action.value || '',
      };
    }

    case SET_OTHER_DFSPS_JWS_SAME_MONETARY_ZONE: {
      return {
        ...state,
        otherDfspsSameMonetaryZone: action.value,
      };
    }

    case SET_OTHER_DFSPS_JWS_CERTIFICATES: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        otherDfspsJWSCertificates:
          action.certificates.map(({ intermediateChainInfo, ...certData }) => ({
            ...certData,
            intermediateChainInfo,
            // TODO Array check
            // intermediateChainInfo: intermediateChainInfo && intermediateChainInfo[0],
          })) || [],
      };
    }

    case SHOW_OTHER_DFSPS_JWS_CERTIFICATE_MODAL: {
      return {
        ...state,
        isOtherDfspsJWSCertificateModalVisible: true,
        otherDfspsJWSCertificateModalContent: action.cert,
      };
    }

    case HIDE_OTHER_DFSPS_JWS_CERTIFICATE_MODAL: {
      return {
        ...state,
        isOtherDfspsJWSCertificateModalVisible: false,
        otherDfspsJWSCertificateModalContent: undefined,
      };
    }

    case SHOW_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL: {
      return {
        ...state,
        isOtherDfspsJWSIntermediateChainModalVisible: true,
        OtherDfspsJWSIntermediateChainModalContent: action.cert,
      };
    }

    case HIDE_OTHER_DFSPS_JWS_INTERMEDIATE_CHAIN_MODAL: {
      return {
        ...state,
        isOtherDfspsJWSIntermediateChainModalVisible: false,
        OtherDfspsJWSIntermediateChainModalContent: undefined,
      };
    }

    default:
      return state;
  }
}
