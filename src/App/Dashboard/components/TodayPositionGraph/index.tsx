import React, { FC, useRef } from 'react';
import { ChartLayout, DataLabel, ErrorBox, Spinner } from 'components';
import LineChart from 'components/Charts/LineChart';
import { ErrorMessage } from 'App/types';
import { useWidth } from 'utils/hooks';
import { generateDailyTimeLabels } from '../../helpers';
import { WeeklyPosition } from '../../types';

function lastItemValue(items: WeeklyPosition): number | undefined {
  if (!items?.points?.length) {
    return undefined;
  }
  return items.points[items.points.length - 1][1];
}

interface TodayPositionProps {
  isPending: boolean | undefined;
  items: WeeklyPosition[];
  error: ErrorMessage;
}

const TodayPosition: FC<TodayPositionProps> = ({ isPending, items, error }) => {
  let content;
  if (isPending) {
    content = (
      <div className="dashboard__today__graph-loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>Position Graph: Unable to load data</ErrorBox>;
  } else {
    content = (
      <ChartLayout
        title="Today's position"
        legend={[
          { label: "Today's Position", color: '#4fc7e7' },
          { label: 'Reserved Funds', color: '#12d670' },
          { label: 'Transfer Committed', color: '#ff9016' },
          { label: 'Total Liquidity Available', color: '#e23a54' },
        ]}
        Graph={() => <TodayPositionGraph lines={items} />}
        Recap={() => (
          <GraphRecap
            current={lastItemValue(items[0])}
            reserved={lastItemValue(items[1])}
            committed={lastItemValue(items[2])}
          />
        )}
      />
    );
  }
  return <div className="dashboard__today__section">{content}</div>;
};

interface TodayPositionGraphProps {
  lines: WeeklyPosition[];
}

const TodayPositionGraph: FC<TodayPositionGraphProps> = ({ lines }) => {
  const ref = useRef(document.createElement('div'));
  const width = useWidth(ref);
  const labels = generateDailyTimeLabels(6);

  return (
    <div className="dashboard__today__graph-container" ref={ref}>
      <LineChart
        lines={lines}
        indicators={[
          {
            dots: 24 * 7 - 1,
            color: '#f00',
            scale: 1,
          },
          {
            dots: 24 * 7 - 1,
            color: '#ddd',
            scale: 0.75,
          },
          {
            dots: 24 * 7 - 1,
            color: '#666',
            scale: 0.5,
          },
          {
            dots: 24 * 7 - 1,
            color: '#ddd',
            scale: 0.25,
          },
        ]}
        scaleY={[-10000, 10000]}
        canvasHeight={300}
        canvasWidth={width}
        padLeft={50}
        padTop={10}
        padRight={20}
        padBottom={20}
        yTicks={[
          { size: 6, color: '#ccc', tickColor: '#333', label: '-10000' },
          { size: 6, color: '#ccc', tickColor: '#333', label: '-5000' },
          { size: 6, color: '#333', tickColor: '#333', label: '0' },
          { size: 6, color: '#ccc', tickColor: '#333', label: '5000' },
          { size: 6, color: '#ccc', tickColor: '#333', label: '10000' },
        ]}
        xTicks={[
          { size: 14, color: '#999', tickColor: '#333', label: 'Today' },
          { size: 14, color: '#999', tickColor: '#333', label: labels[0] },
          { size: 14, color: '#999', tickColor: '#333', label: labels[1] },
          { size: 14, color: '#999', tickColor: '#333', label: labels[2] },
          { size: 14, color: '#999', tickColor: '#333', label: labels[3] },
          { size: 14, color: '#999', tickColor: '#333', label: labels[4] },
          { size: 14, color: '#999', tickColor: '#333', label: labels[5] },
        ]}
      />
    </div>
  );
};

function signed(value: number): string {
  return `${value > 0 ? '+' : ''}${value}`;
}

interface GraphRecapProps {
  reserved?: number;
  committed?: number;
  current?: number;
}

const GraphRecap: FC<GraphRecapProps> = ({ reserved = 0, committed = 0, current = 0 }) => {
  return (
    <div className="dashboard__today__recap-container">
      <DataLabel underline size="s">
        Current Totals
      </DataLabel>
      <br />
      <DataLabel size="m">Current Position</DataLabel>
      <div>
        <DataLabel highlight size="l">
          {signed(current)}
        </DataLabel>
        <DataLabel>/10000</DataLabel>
      </div>
      <br />
      <DataLabel size="m">Reserved Funds</DataLabel>
      <DataLabel highlight size="l">
        {signed(reserved)}
      </DataLabel>
      <br />
      <DataLabel size="m">Transfers Committed</DataLabel>
      <DataLabel highlight size="l">
        {signed(committed)}
      </DataLabel>
      <br />
    </div>
  );
};
export default TodayPosition;
