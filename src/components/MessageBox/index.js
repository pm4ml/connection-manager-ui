/******************************************************************************
 *  Copyright 2019 ModusBox, Inc.                                             *
 *                                                                            *
 *  info@modusbox.com                                                         *
 *                                                                            *
 *  Licensed under the Apache License, Version 2.0 (the "License");           *
 *  you may not use this file except in compliance with the License.          *
 *  You may obtain a copy of the License at                                   *
 *  http://www.apache.org/licenses/LICENSE-2.0                                *
 *                                                                            *
 *  Unless required by applicable law or agreed to in writing, software       *
 *  distributed under the License is distributed on an "AS IS" BASIS,         *
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
 *  See the License for the specific language governing permissions and       *
 *  limitations under the License.                                            *
 ******************************************************************************/

import React from 'react';
import { Icon } from '../index';
import { composeClassName } from '../../utils/html';
import './MessageBox.css';

const splitLines = (prev, curr) => [...prev, ...curr.split(`\n`)];

const getMessageComponent = (message, index) => (
  <div key={index} className="message-box__message">
    {message}
  </div>
);

const getMessages = message => {
  const subMessages = typeof message === 'string' ? [message] : message;
  return subMessages.reduce(splitLines, []).map(getMessageComponent);
};

const MessageBox = ({
  kind = 'default',
  icon,
  message,
  center,
  iconMargin,
  size = 20,
  fontSize = 13,
  className,
  children,
}) => {
  if (!message && !children) {
    return null;
  }

  const messageBoxClassName = composeClassName([
    'message-box',
    `message-box--${kind}`,
    center && 'message-box--centered',
    className,
  ]);
  const messagesClassName = composeClassName(['message-box__messages', center && 'message-box__messages--centered']);

  let iconComponent = null;
  if (icon) {
    iconComponent = (
      <div className="message-box__icon-box">
        <Icon className="message-box__icon" name={icon} size={size} />
      </div>
    );
  }

  return (
    <div className={messageBoxClassName}>
      {iconComponent}
      <div className={messagesClassName} style={{ fontSize: `${fontSize}px` }}>
        {children ? children : getMessages(message)}
      </div>
    </div>
  );
};

export default MessageBox;
