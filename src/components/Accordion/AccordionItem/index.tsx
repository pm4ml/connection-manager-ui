import React, { SFC } from 'react';
import DataLabel from 'components/DataLabel';
import { Button, Spinner } from '@modusbox/modusbox-ui-components/dist/index';
import './AccordionItem.css';

export interface AccordionItemProps {
  title: string;
  pending?: boolean;
  status: string;
  progress: string;
  statusColor: string;
  className?: string;
  onClick: Function;
}

const AccordionItem: SFC<AccordionItemProps> = ({
  title,
  pending,
  status,
  statusColor,
  progress,
  onClick,
}) => {
  return (
    <div className="accordion-item__container">
      <div className="accordion-item__left-section">
        <div className="accordion-item__title">
          <DataLabel size="m">{title}</DataLabel>
        </div>
        <div className="accordion-item__indicator">
          <div className="accordion-item__indicator__color" style={{ background: statusColor }} />
          {pending ? <Spinner size="s" /> : <DataLabel size="m">{status}</DataLabel>}
        </div>
      </div>

      <div className="accordion-item__right-section">
        <div className="accordion-item__progress">
          {pending ? <Spinner size="s" /> : <DataLabel size="m">{progress}</DataLabel>}
        </div>
        <Button onClick={onClick} noFill label="Open Phase" kind="secondary" />
      </div>
    </div>
  );
};

export default AccordionItem;
