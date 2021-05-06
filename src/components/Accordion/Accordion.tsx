import React, { FC, useState, ReactElement } from 'react';
import classnames from 'classnames';
import AnimateFadeIn from 'components/AnimateFadeIn';
import DataLabel from 'components/DataLabel';
import { Icon, Button, Spinner } from '@modusbox/modusbox-ui-components/dist/index';
import { AccordionItemProps } from './AccordionItem';
import './Accordion.css';

interface AccordionProps {
  title?: string;
  pending?: boolean;
  status: string;
  progress: string;
  statusColor: string;
  className?: string;
  onClick: Function;
  children: ReactElement<AccordionItemProps> | ReactElement<AccordionItemProps>[];
}

const Accordion: FC<AccordionProps> = ({
  title,
  pending,
  status,
  statusColor,
  progress,
  onClick,
  children,
}) => {
  const [activeSection, setActiveSection] = useState(false);

  const toggleActiveSection = () => {
    setActiveSection(!activeSection);
  };

  const accordionIconClassName = classnames([
    'accordion__arrow__icon',
    activeSection && 'accordion__arrow__icon--rotated',
  ]);

  return (
    <div>
      <div onClick={toggleActiveSection} role="presentation" className="accordion__container">
        <div className="accordion__left-section">
          <div className="accordion__arrow__container">
            <Icon size={16} fill="#333" name="arrow" className={accordionIconClassName} />
          </div>
          <div className="accordion__title">
            <DataLabel size="m">{title}</DataLabel>
          </div>
          <div className="accordion__indicator">
            {!pending && (
              <div className="accordion__indicator__color" style={{ background: statusColor }} />
            )}
            {pending ? <Spinner size="s" /> : <DataLabel size="m">{status}</DataLabel>}
          </div>
        </div>

        <div className="accordion__right-section">
          <div className="accordion__progress">
            {pending ? <Spinner size="s" /> : <DataLabel size="m">{progress}</DataLabel>}
          </div>
          <Button onClick={onClick} noFill label="View Details" kind="secondary" />
        </div>
      </div>
      {activeSection && (
        <AnimateFadeIn initial={{ y: 5 }} animate={{ y: 0 }}>
          {children}
        </AnimateFadeIn>
      )}
    </div>
  );
};

export default Accordion;
