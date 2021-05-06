import React, { FC } from 'react';
import { AnimateFadeIn, Column, DataLabel, ErrorBox, Pill, Row, Spinner } from 'components';
import { ErrorMessage, TransferStatus } from 'App/types';
import { TransfersStatus } from '../../types';

function getCount(items: TransfersStatus[], status: TransferStatus): number | undefined {
  const transfersStatus = items.find((item) => item.status === status);
  return transfersStatus?.count;
}

interface TransfersStatusesProps {
  isPending: boolean;
  items: TransfersStatus[];
  error: ErrorMessage;
}
const TransfersStatusesItems: FC<TransfersStatusesProps> = ({ isPending, items, error }) => {
  let content = null;
  if (isPending) {
    content = (
      <div className="transfers__statuses__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>Transfers Status: Unable to load data</ErrorBox>;
  } else {
    const success = getCount(items, TransferStatus.Success);
    const pending = getCount(items, TransferStatus.Pending);
    const failed = getCount(items, TransferStatus.Error);

    content = (
      <Row>
        <Column grow="1">
          <Row align="flex-start">
            <AnimateFadeIn initial={{ x: -10 }} animate={{ x: 0 }}>
              <Pill
                active
                label={`${success} Successful`}
                kind="primary"
                className="transfers__statuses__status transfers__statuses__status--successful"
              />
              <Pill
                active
                label={`${pending} Pending`}
                kind="success"
                className="transfers__statuses__status transfers__statuses__status--pending"
              />
              <Pill
                active
                label={`${failed} Failed`}
                kind="danger"
                className="transfers__statuses__status transfers__statuses__status--has-errors"
              />
            </AnimateFadeIn>
          </Row>
        </Column>
      </Row>
    );
  }

  return (
    <div className="transfers__statuses__section">
      <DataLabel size="m">Total Transfer Statuses</DataLabel>
      <br />
      {content}
    </div>
  );
};

export default TransfersStatusesItems;
