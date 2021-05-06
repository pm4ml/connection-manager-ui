import withErrorBoundary from 'utils/hocs/withErrorBoundary';
import { ComponentType } from 'react';
import Transfers from './Transfers';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducers';
import * as types from './types';

export default withErrorBoundary(Transfers as ComponentType);
export { actions, reducer, selectors, types };
