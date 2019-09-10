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
import { composeClassName } from 'utils/html';
import { Icon, Tooltip } from '../index';
import './ControlIcon.css';

const ControlIcon = ({ icon, size, className, onClick, tooltip, tooltipPosition, kind, disabled }) => {
  const containerClassName = composeClassName([
    'control__icon__container',
    !disabled && onClick && 'control__icon__container--button',
    disabled && 'control__icon__container--disabled',
  ]);

  let iconComponent = (
    <div className={containerClassName} role="presentation" onClick={disabled ? undefined : onClick}>
      <Icon size={size} name={icon} />
    </div>
  );

  if (tooltip) {
    iconComponent = (
      <Tooltip label={tooltip} kind={kind} position={tooltipPosition} delay={300}>
        {iconComponent}
      </Tooltip>
    );
  }

  return <div className={composeClassName(['control__icon', className])}>{iconComponent}</div>;
};

export default ControlIcon;
