import React, { FC } from 'react';
import { Row } from '@modusbox/modusbox-ui-components/dist/index';
import AnimateFadeIn from './AnimateFadeIn';
import Legend from './Legend';
import DataLabel from './DataLabel';

interface Item {
  color: string;
  label: string;
}

interface LegendProps {
  items: Item[];
}

interface ChartLayoutProps {
  title: string;
  legend: Item[];
  Graph: React.ElementType;
  Recap?: React.ElementType;
}

const ChartLayout: FC<ChartLayoutProps> = ({ title, legend, Graph, Recap }) => {
  return (
    <>
      <Row align="flex-start stretch" style={{ maxWidth: '100%' }}>
        <div style={{ flex: 1, minWidth: 0, marginRight: '20px' }}>
          <Row align="space-between bottom">
            <DataLabel size="m">{title}</DataLabel>
            <Legend items={legend} />
          </Row>
          <AnimateFadeIn delay={0.3} initial={{ x: -10 }} animate={{ x: 0 }}>
            <Graph />
          </AnimateFadeIn>
        </div>

        {Recap && (
          <AnimateFadeIn delay={0.3} initial={{ x: 10 }} animate={{ x: 0 }}>
            <div style={{ flex: '0 0 200px', width: 200, height: '100%' }}>
              <Recap />
            </div>
          </AnimateFadeIn>
        )}
      </Row>
    </>
  );
};

export default ChartLayout;
