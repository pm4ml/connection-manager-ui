import React, { Component, FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'store/types';
import * as actions from './actions';

const dispatchProps = (dispatch: Dispatch) => ({
  onTransfersMount: () => dispatch(actions.requestTransfersPageData()),
});

type TransfersProps = {
  onTransfersMount: () => void;
};

export function loadTransfers(Transfers: FC) {
  class TransfersLoader extends Component<TransfersProps, {}> {
    componentDidMount() {
      this.props.onTransfersMount();
    }

    render() {
      return <Transfers />;
    }
  }
  return connect(null, dispatchProps)(TransfersLoader);
}
