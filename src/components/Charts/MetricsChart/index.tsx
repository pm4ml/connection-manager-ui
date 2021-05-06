import React, { FC } from 'react';
import Chart from 'react-apexcharts';
import { ErrorMessage, XYCoordinate } from 'App/types';
import { Spinner } from '@modusbox/modusbox-ui-components/dist/index';
import ErrorBox from '../../ErrorBox';
import ChartLayout from '../../ChartLayout';

interface MetricsChartData {
  chartType: string;
  color: string;
  legendText: string;
  data: XYCoordinate[];
}

interface MetricsChartProps {
  height: number;
  isPending: boolean | undefined;
  data?: MetricsChartData[];
  error: ErrorMessage;
  title: string;
}

const MetricsChart: FC<MetricsChartProps> = ({ height, isPending, data, error, title }) => {
  let content = null;
  if (isPending || !data) {
    content = (
      <div className="transfers__avg-time__graph-loader">
        <Spinner size={20} />
      </div>
    );
  } else if (error) {
    content = <ErrorBox>Unable to load data</ErrorBox>;
  } else {
    let legend: { color: string; label: string }[] = [];
    if (data) {
      legend = data.map((d) => {
        return { color: d.color, label: d.legendText };
      });
    }

    content = (
      <ChartLayout title={title} legend={legend} Graph={() => <MetricsGraph data={data} />} />
    );
  }
  return <div style={{ width: '100%' }}>{content}</div>;
};

interface MetricsGraphProps {
  data: MetricsChartData[];
}

const MetricsGraph: FC<MetricsGraphProps> = ({ data }) => {
  const series = data.map((d) => {
    return {
      name: d.legendText,
      type: d.chartType,
      data: d.data,
      color: d.color,
      lineWidth: 2,
    };
  });

  const colors = series.map((s) => s.color);

  const opts = {
    chart: {
      id: 'metrics-chart',
    },
    xaxis: {
      type: 'datetime',
      datetimeUTC: true,
    },
    legend: {
      markers: {
        radius: 0,
      },
    },
    yaxis: series.map((s, i) => {
      return {
        seriesName: s.name,
        opposite: i % 2 !== 0,
        labels: {
          formatter: (val: string | number) => {
            return `${Number(val).toFixed(2)}`;
          },
        },
        title: {
          text: s.name,
          style: { color: colors[i] },
        },
        fill: { opacity: 1 },
      };
    }),
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      strokeDashArray: 2,
      strokeWidth: 2,
      strokeLineCap: 'round',
    },
    stroke: {
      width: series.map((s) => s.lineWidth),
      curve: 'smooth',
    },
    colors,
    fill: {
      opacity: series.map((s) => {
        return s.type === 'line' ? 1 : 0.1;
      }),
    },
    tooltip: {
      x: {
        formatter: (val: string | number) => {
          return new Date(val).toISOString();
        },
      },
    },
  };

  return <Chart options={opts} series={series} type="line" width="100%" height={300} />;
};

export default MetricsChart;
