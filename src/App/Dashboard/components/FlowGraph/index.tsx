import React, { FC, useRef } from 'react';
import { ChartLayout, ErrorBox, Spinner } from 'components';
import LineChart from 'components/Charts/LineChart';
import { ErrorMessage } from 'App/types';
import { useWidth } from 'utils/hooks';
import { generateDailyTimeLabels } from '../../helpers';
import { WeeklyFlow } from '../../types';

interface FlowProps {
  isPending: boolean | undefined;
  items: WeeklyFlow[];
  error: ErrorMessage;
}

const Flow: FC<FlowProps> = ({ isPending, items, error }) => {
  let content;
  if (isPending) {
    content = (
      <div className="dashboard__flow__graph-loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>Flows chart: Unable to load data</ErrorBox>;
  } else {
    content = (
      <ChartLayout
        title="Outflow vs Inflow"
        legend={[
          { label: 'Average Inflow / Minute', color: '#4fc7e7' },
          { label: 'Average Outflow / Minute', color: '#e23a54' },
        ]}
        Graph={() => <FlowGraph lines={items} />}
        Recap={() => <div style={{ width: '200px' }} />}
      />
    );
  }
  return <div className="dashboard__flow__section">{content}</div>;
};

interface FlowGraphProps {
  lines: WeeklyFlow[];
}

const FlowGraph: FC<FlowGraphProps> = ({ lines }) => {
  const ref = useRef(document.createElement('div'));
  const width = useWidth(ref);
  const labels = generateDailyTimeLabels(6);

  return (
    <div className="dashboard__flow__graph-container" ref={ref}>
      <LineChart
        lines={lines}
        indicators={[
          {
            dots: 24 * 7,
            color: '#ddd',
            scale: 1,
          },
          {
            dots: 24 * 7,
            color: '#ddd',
            scale: 0.75,
          },
          {
            dots: 24 * 7,
            color: '#ddd',
            scale: 0.5,
          },
          {
            dots: 24 * 7,
            color: '#ddd',
            scale: 0.25,
          },
        ]}
        scaleY={[0, 20000]}
        canvasHeight={300}
        canvasWidth={width}
        padLeft={50}
        padTop={10}
        padRight={20}
        padBottom={20}
        yTicks={[
          { size: 0, color: '#ccc', tickColor: '#333', label: '0' },
          { size: 0, color: '#ccc', tickColor: '#333', label: '5000' },
          { size: 0, color: '#ccc', tickColor: '#333', label: '10000' },
          { size: 0, color: '#ccc', tickColor: '#333', label: '15000' },
          { size: 0, color: '#ccc', tickColor: '#333', label: '20000' },
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

export default Flow;
