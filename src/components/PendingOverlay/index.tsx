import React, { FC } from 'react';
import { Spinner } from '@modusbox/modusbox-ui-components/dist/index';
import './index.css';

const PendingOverlay: FC<{}> = () => (
  <div className="pending-overlay">
    <Spinner size={20} className="pending-overlay__spinner" />
  </div>
);

export default PendingOverlay;
