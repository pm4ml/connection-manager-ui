import React, { PureComponent, ComponentType } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { EnvironmentStatus } from '../../types';
import { requestEnvironmentStatus } from '../actions';
import { getEnvironmentsStatuses } from '../selectors';
import { getEnvironmentId } from '../../selectors';

type EnvironmentStatusLoaderProps = {
  onEnvironmentMount: () => void;
  environmentId: string | undefined;
  environmentsStatuses: EnvironmentStatus[];
};

export default function loadEnvironmentStatus<Props>(Cmp: ComponentType<Props>) {
  class EnvironmentStatusLoader extends PureComponent<EnvironmentStatusLoaderProps, {}> {
    componentDidMount() {
      const { environmentId, environmentsStatuses, onEnvironmentMount } = this.props;
      if (
        !(environmentId && environmentsStatuses.find((env) => env.environmentId === environmentId))
      ) {
        onEnvironmentMount();
      }
    }

    render() {
      /* eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars */
      const { onEnvironmentMount, ...props } = this.props;
      // @ts-ignore
      return <Cmp {...(props as Props)} />;
    }
  }
  return connect(
    (state: State) => ({
      environmentsStatuses: getEnvironmentsStatuses(state),
      environmentId: getEnvironmentId(state),
    }),
    (dispatch: Dispatch) => ({
      onEnvironmentMount: () => dispatch(requestEnvironmentStatus()),
    })
  )(EnvironmentStatusLoader);
}
