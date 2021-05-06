import React, { FC } from 'react';
import {
  AnimateFadeIn,
  Column,
  DataLabel,
  DataList,
  ErrorBox,
  Pill,
  Row,
  Spinner,
} from 'components';
import { getFirstCurrencyValue } from 'utils/currencies';
import { ErrorMessage } from 'App/types';
import { ReconciliationOverviewBatch, BatchStatus } from '../../types';
import * as helpers from '../../helpers';
import BatchWindowModal from './BatchWindowModal';

const reconciliationOverviewColumns = [
  {
    label: '',
    key: 'status',
    className: 'dashboard__overview__list__status-indicator',
    sortable: false,
    func: (status: BatchStatus) => <OverviewStatusIndicator status={status} />,
  },
  {
    label: 'Status',
    key: 'status',
    func: helpers.toSpacedPascalCase,
  },
  {
    label: 'Txns',
    key: 'transferCount',
  },
  {
    label: 'Value',
    key: 'transferTotals',
    func: getFirstCurrencyValue(['USD', 'EUR']),
  },
  {
    label: 'Errors',
    key: 'errorCount',
  },
  {
    label: 'Block Opened',
    key: 'startingTimestamp',
    func: helpers.toDashboardDate,
  },
  {
    label: 'Block Closed',
    key: 'closingTimestamp',
    func: (date: string | undefined) => helpers.toDashboardDate(date) || '-',
  },
];

interface ReconciliationOverviewProps {
  isPending: boolean | undefined;
  items: ReconciliationOverviewBatch[];
  selectedItem: ReconciliationOverviewBatch | undefined;
  error: ErrorMessage;
  onSelectItem: (item: ReconciliationOverviewBatch) => void;
}

const ReconciliationOverview: FC<ReconciliationOverviewProps> = ({
  isPending,
  items,
  selectedItem,
  error,
  onSelectItem,
}) => {
  let content = null;
  if (isPending) {
    content = (
      <div className="dashboard__overview__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>Overview: Unable to load data</ErrorBox>;
  } else {
    content = (
      <>
        <OverviewStatus items={items} />
        <div className="dashboard__overview__list">
          <DataList columns={reconciliationOverviewColumns} list={items} onSelect={onSelectItem} />
        </div>
        {selectedItem && <BatchWindowModal />}
      </>
    );
  }

  return (
    <div className="dashboard__overview__section">
      <DataLabel size="m">Reconciliation Overview for Today (Time Blocks)</DataLabel>
      <br />
      {content}
    </div>
  );
};

interface OverviewStatusIndicatorProps {
  status: BatchStatus;
}

const OverviewStatusIndicator: FC<OverviewStatusIndicatorProps> = ({ status }) => {
  return (
    <div
      className={`dashboard__overview-status__indicator dashboard__overview-status--${helpers.statusToClassName(
        status
      )}`}
    />
  );
};

interface OverviewStatusProps {
  items: ReconciliationOverviewBatch[];
}

const OverviewStatus: FC<OverviewStatusProps> = ({ items }) => {
  const { open, onTrack, hasErrors, overdue } = helpers.getAllStatusCount(items);
  return (
    <Row>
      <Column grow="1">
        <Row align="flex-start">
          <AnimateFadeIn initial={{ x: -10 }} animate={{ x: 0 }}>
            <Pill
              label={`${open} open`}
              kind="primary"
              className="dashboard__overview-status dashboard__overview-status--open"
            />
            <Pill
              label={`${onTrack} on track`}
              kind="success"
              className="dashboard__overview-status dashboard__overview-status--on-track"
            />
            <Pill
              label={`${hasErrors} errors`}
              kind="danger"
              className="dashboard__overview-status dashboard__overview-status--has-errors"
            />
            <Pill
              label={`${overdue} overdue`}
              kind="warning"
              className="dashboard__overview-status dashboard__overview-status--overdue"
            />
          </AnimateFadeIn>
        </Row>
      </Column>
      <Column grow="0">
        <AnimateFadeIn delay={0.5} initial={{ x: 5 }} animate={{ x: 0 }}>
          <Pill icon="info-small" label="Click on a row to open details" kind="tertiary" />
        </AnimateFadeIn>
      </Column>
    </Row>
  );
};

export default ReconciliationOverview;
