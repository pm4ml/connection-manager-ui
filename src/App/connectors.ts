import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { hideErrorModal } from './actions';

import {
  getIsSuccessToastVisible,
  getIsErrorModalVisible,
  getErrorModalContent,
  getUser,
} from './selectors';

const stateProps = (state: State) => ({
  isSuccessToastVisible: getIsSuccessToastVisible(state),
  isErrorModalVisible: getIsErrorModalVisible(state),
  errorModalContent: getErrorModalContent(state),
  userInfo: getUser(state),
});

const actionProps = (dispatch: Dispatch) => ({
  onCloseErrorModal: () => dispatch(hideErrorModal()),
});

export default connect(stateProps, actionProps);
