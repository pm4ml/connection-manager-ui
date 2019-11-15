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
import { Button } from '../index.js';
import { composeClassName } from 'utils/html';

import './index.css';

const Box = ({ children, delay }) => {
  const style = {};
  const classNames = ['certificate-card'];
  if (delay) {
    style.animationDelay = `${delay}ms`;
    classNames.push('certificate-card--animated');
  }
  return (
    <div className={composeClassName(classNames)} style={style}>
      {children}
    </div>
  );
};

const Header = ({ children }) => <div className="certificate-card__header">{children}</div>;

const Details = ({ children }) => <div className="certificate-card__header__details">{children}</div>;
const PrimaryDetail = ({ children }) => <div className="certificate-card__header__details__primary">{children}</div>;
const SecondaryDetail = ({ children }) => (
  <div className="certificate-card__header__details__secondary">{children}</div>
);

const Controls = ({ children }) => <div className="certificate-card__header__controls">{children}</div>;

const ControlButton = props => {
  const newProps = {
    ...props,
    className: composeClassName([props.className, 'certificate-card__header__controls__button']),
  };
  return <Button {...newProps} />;
};

const Content = ({ children }) => <div className="certificate-card__content">{children}</div>;

const Footer = ({ children }) => <div className="certificate-card__footer">{children}</div>;

const FooterButton = props => {
  const newProps = {
    ...props,
    className: composeClassName([props.className, 'certificate-card__footer__button']),
  };
  return <Button {...newProps} />;
};

const CertificateCard = {
  Box,
  Header,
  Details,
  PrimaryDetail,
  SecondaryDetail,
  Controls,
  ControlButton,
  Content,
  Footer,
  FooterButton,
};
export default CertificateCard;
