import {
  RESET_DFSP_CSR,
  SET_DFSP_CSR_CERTIFICATE,
  SHOW_DFSP_CSR_CERTIFICATE_MODAL,
  HIDE_DFSP_CSR_CERTIFICATE_MODAL,
  DfspCSRActionTypes,
  CSRState,
} from './types';

const initialState = {
  dfspCsrCertificate: undefined,
  isDfspCsrModalVisible: false,
};

export default function csrReducer(state = initialState, action: DfspCSRActionTypes): CSRState {
  switch (action.type) {
    case RESET_DFSP_CSR:
      return initialState;
    case SET_DFSP_CSR_CERTIFICATE: {
      // the server sends null for a non-existing certificate
      // causing the ui to fail on the fileuploader component
      // so it needs to be stored as an undefined value
      return {
        ...state,
        dfspCsrCertificate: action.cert || null,
      };
    }
    case SHOW_DFSP_CSR_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspCsrModalVisible: true,
      };
    }
    case HIDE_DFSP_CSR_CERTIFICATE_MODAL: {
      return {
        ...state,
        isDfspCsrModalVisible: false,
      };
    }
    default:
      return state;
  }
}

export { initialState };
