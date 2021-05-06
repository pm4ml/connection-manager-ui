import React, { FC } from 'react';
import { MessageBox } from '@modusbox/modusbox-ui-components/dist/index';

interface ErrorBoxProps {}
const ErrorBox: FC<ErrorBoxProps> = ({ children }) => (
  <MessageBox kind="danger" icon="warning-sign" size={20} fontSize={14} style={{ margin: 5 }}>
    {children}
  </MessageBox>
);
export default ErrorBox;
