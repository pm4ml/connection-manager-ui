import React, { FC } from 'react';
import { connect } from 'react-redux';
import { AnimateFadeIn, DataLabel, Legend, ErrorBox, Row, Spinner } from 'components';
import { State } from 'store/types';
import { ErrorMessage } from 'App/types';
import PieChart from 'components/Charts/PieChart';
import * as selectors from '../../selectors';
import { TransferError } from '../../types';
import * as helpers from '../../helpers';

const stateProps = (state: State) => ({
  items: selectors.getTransfersErrors(state),
  error: selectors.getTransfersErrorsError(state),
  isPending: selectors.getIsTransfersErrorsPending(state),
});

interface TransfersErrorsChartProps {
  isPending: boolean | undefined;
  items: TransferError[];
  error: ErrorMessage;
}

const TransfersErrorsChart: FC<TransfersErrorsChartProps> = ({ isPending, items, error }) => {
  let content = null;
  if (isPending) {
    content = (
      <div className="transfers__errors__loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>Transfers errors: Unable to load data</ErrorBox>;
  } else {
    const errors = helpers.getErrorsByType(items);
    const totalErrors = errors.reduce((a, b) => {
      return a + b.value;
    }, 0);

    content = (
      <Row align="flex-start center">
        <AnimateFadeIn delay={0.3} initial={{ x: -10 }} animate={{ x: 0 }}>
          <div className="transfers__errors__graph-display-label">
            <DataLabel size="s" bold>
              Total Errors
            </DataLabel>
            <DataLabel highlight size="l">
              {items.length || 0}
            </DataLabel>
          </div>
        </AnimateFadeIn>
        <div className="transfers__errors__graph-chart-container">
          <AnimateFadeIn delay={0.3} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <PieChart
              canvasSize={200}
              pieData={errors.map((errorItem) => ({ ...errorItem, label: undefined }))}
              innerRadius={0}
              outerRadius={90}
            />
          </AnimateFadeIn>
        </div>
        <div className="transfers__errors__graph-legend-container">
          <DataLabel size="s" bold>
            Error Breakdown
          </DataLabel>
          <Legend
            className="transfers__errors__graph-legend"
            vertical
            items={errors.map((errorItem) => ({
              ...errorItem,
              value: `${Math.round((errorItem.value / totalErrors) * 100)}%`,
            }))}
          />
        </div>
      </Row>
    );
  }
  return (
    <div className="transfers__errors__section">
      <DataLabel size="m">Transfers Errors Overview</DataLabel>
      {content}
    </div>
  );
};

export default connect(stateProps)(TransfersErrorsChart);
