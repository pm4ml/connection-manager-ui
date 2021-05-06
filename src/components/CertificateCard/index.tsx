import React, { FC } from 'react';
import { Button } from '@modusbox/modusbox-ui-components/dist/index';
import { composeClassName } from 'utils/html';

import './index.css';

interface BoxProps {
  delay?: number;
}
const Box: FC<BoxProps> = ({ children, delay }) => {
  let animationDelay;
  const classNames = ['certificate-card'];
  if (delay) {
    animationDelay = `${delay}ms`;
    classNames.push('certificate-card--animated');
  }
  return (
    <div className={composeClassName(classNames)} style={{ animationDelay }}>
      {children}
    </div>
  );
};

const Header: FC<{}> = ({ children }) => <div className="certificate-card__header">{children}</div>;
const Details: FC<{}> = ({ children }) => (
  <div className="certificate-card__header__details">{children}</div>
);
const PrimaryDetail: FC<{}> = ({ children }) => (
  <div className="certificate-card__header__details__primary">{children}</div>
);
const SecondaryDetail: FC<{}> = ({ children }) => (
  <div className="certificate-card__header__details__secondary">{children}</div>
);

const Controls: FC<{}> = ({ children }) => (
  <div className="certificate-card__header__controls">{children}</div>
);

interface ControlButtonProps {
  className?: string;
  kind?: string;
  disabled?: boolean;
  pending?: boolean;
  noFill?: boolean;
  label: string;
  onClick: () => void;
  icon?: string;
}

const ControlButton: FC<ControlButtonProps> = ({
  className,
  kind,
  disabled,
  pending,
  noFill,
  label,
  onClick,
  icon,
}) => {
  return (
    <Button
      className={composeClassName([className, 'certificate-card__header__controls__button'])}
      kind={kind}
      disabled={disabled}
      pending={pending}
      noFill={noFill}
      label={label}
      onClick={onClick}
      icon={icon}
    />
  );
};

const Content: FC<{}> = ({ children }) => (
  <div className="certificate-card__content">{children}</div>
);
const Footer: FC<{}> = ({ children }) => <div className="certificate-card__footer">{children}</div>;

interface FooterButtonProps {
  className?: string;
  kind?: string;
  disabled?: boolean;
  pending?: boolean;
  noFill?: boolean;
  label: string;
  onClick: () => void;
  icon?: string;
}

const FooterButton: FC<FooterButtonProps> = ({
  className,
  kind,
  disabled,
  pending,
  noFill,
  label,
  onClick,
  icon,
}) => {
  return (
    <Button
      className={composeClassName([className, 'certificate-card__footer__button'])}
      kind={kind}
      disabled={disabled}
      pending={pending}
      noFill={noFill}
      label={label}
      onClick={onClick}
      icon={icon}
    />
  );
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
