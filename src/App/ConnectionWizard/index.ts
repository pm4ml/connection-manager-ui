import withErrorBoundary from 'utils/hocs/withErrorBoundary';
import { ComponentType } from 'react';
import ConnectionWizardRouter from './ConnectionWizardRouter';
import reducer from './reducers';
import * as types from './types';

export default withErrorBoundary(ConnectionWizardRouter as ComponentType);
export { reducer, types };
