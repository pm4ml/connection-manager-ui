import { connect } from 'react-redux';
import { State } from 'store/types';
import * as selectors from './selectors';

const stateProps = (state: State) => ({
  environments: selectors.getEnvironments(state),
  environmentsError: selectors.getEnvironmentsError(state),
  environmentsStatuses: selectors.getEnvironmentsStatuses(state),
  environmentsStatusesError: selectors.getEnvironmentsStatusesError(state),
  isEnvironmentsStatusesPending: selectors.getIsEnvironmentsStatusesPending(state),
});

export default connect(stateProps);
