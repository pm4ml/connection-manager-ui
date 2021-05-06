import React, { Component } from 'react';
import * as d3 from 'd3';
import PathElement from '../Primitives/PathElement';
import Axis from '../Axis';
import './LineChart.css';

interface Tick {
  label: string;
  scale?: number;
  segment?: boolean;
  color?: string;
  tickColor?: string;
  size?: number;
}

type LinePoint = [number, number];

interface LineStructure {
  color: string;
  points: LinePoint[];
}

interface Indicator {
  dots?: number;
  color: string;
  height?: number;
  scale?: number;
}

interface LineChartProps {
  canvasHeight: number;
  canvasWidth: number;
  padLeft?: number;
  padTop?: number;
  padRight?: number;
  padBottom?: number;
  scaleY: [number, number];
  lines: LineStructure[];
  indicators: Indicator[];
  xTicks: Tick[];
  yTicks: Tick[];
}

interface LineChartState {
  lines: { color: string; path: string | null }[];
  indicators: { color: string; path: string | null; dots?: number }[];
}

class LineChart extends Component<LineChartProps, LineChartState> {
  public svgLayoutRef = React.createRef<SVGSVGElement>();

  constructor(props: LineChartProps) {
    super(props);

    const [width, height] = this.getSizes(props);
    const yScale = this.getYScaleBounds(this.props.scaleY, height);

    this.state = {
      lines: this.props.lines.map((line) => ({
        color: line.color,
        path: this.calculateLinePath(line.points, width, yScale),
      })),

      indicators: this.props.indicators.map((indicator) => ({
        color: indicator.color,
        dots: indicator.dots,
        path: this.calculateIndicatorLines(indicator, width, props.scaleY, yScale),
      })),
    };
  }

  componentDidUpdate(prevProps: LineChartProps) {
    if (this.props.lines !== prevProps.lines || this.props.canvasWidth !== prevProps.canvasWidth) {
      const [width, height] = this.getSizes(this.props);
      const yScale = this.getYScaleBounds(this.props.scaleY, height);

      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        lines: this.props.lines.map((line) => ({
          color: line.color,
          path: this.calculateLinePath(line.points, width, yScale),
        })),

        indicators: this.props.indicators.map((indicator) => ({
          color: indicator.color,
          dots: indicator.dots,
          path: this.calculateIndicatorLines(indicator, width, this.props.scaleY, yScale),
        })),
      });
    }
  }

  getPads = (props: LineChartProps) => {
    const { padLeft, padRight, padTop, padBottom } = props;
    return {
      padLeft: padLeft || 0,
      padRight: padRight || 0,
      padTop: padTop || 0,
      padBottom: padBottom || 0,
    };
  };

  getSizes(props: LineChartProps) {
    const { canvasWidth, canvasHeight } = props;
    const { padLeft, padRight, padTop, padBottom } = this.getPads(props);
    return [canvasWidth - padLeft - padRight, canvasHeight - padTop - padBottom];
  }

  getLineFn = (xDomain: number[], xRange: number[], yDomain: number[], yRange: number[]) => {
    const xLineScale = d3.scaleLinear().domain(xDomain).range(xRange);
    const yLineScale = d3.scaleLinear().domain(yDomain).range(yRange);

    return d3
      .line()
      .x((value: number[]) => xLineScale(value[0]))
      .y((value: number[]) => yLineScale(value[1]));
  };

  getXScaleBounds = (data: LinePoint[], width: number) => {
    const xDomain = [0, d3.max(data, (d) => d[0]) || 0];
    const xRange = [0, width];
    return [xDomain, xRange];
  };

  getYScaleBounds = (scaleY: [number, number], height: number) => {
    const yRange = [height, 0];
    return [scaleY, yRange];
  };

  calculateLinePath = (data: LinePoint[], width: number, yScale: number[][]): string | null => {
    const [xDomain, xRange] = this.getXScaleBounds(data, width);
    const [yDomain, yRange] = yScale;

    const lineFn = this.getLineFn(xDomain, xRange, yDomain, yRange);
    return lineFn(data);
  };

  calculateIndicatorLines = (
    indicator: Indicator,
    width: number,
    scaleY: [number, number],
    yScale: number[][]
  ): string | null => {
    const { scale } = indicator;
    const position = indicator.height || (scale || 1) * (scaleY[1] - scaleY[0]) + scaleY[0];
    const data = [
      [0, position],
      [width, position],
    ] as LinePoint[];
    const [xDomain, xRange] = this.getXScaleBounds(data, width);
    const [yDomain, yRange] = yScale;

    const lineFn = this.getLineFn(xDomain, xRange, yDomain, yRange);
    return lineFn(data);
  };

  render() {
    const { canvasHeight, canvasWidth, xTicks, yTicks } = this.props;
    const { padLeft, padTop } = this.getPads(this.props);
    const [width, height] = this.getSizes(this.props);

    return (
      <div className="chart-wrapper">
        <svg
          ref={this.svgLayoutRef}
          height={canvasHeight}
          width={canvasWidth}
          viewBox={` 0 0 ${canvasWidth} ${canvasHeight}`}
        >
          <g transform={`translate(${padLeft} ${padTop})`}>
            {this.state.indicators.map((indicator, index) => (
              <path
                key={index.toString()}
                d={indicator.path || ''}
                stroke={indicator.color}
                x={width / ((indicator?.dots || 1) - 1)}
                strokeWidth={2}
                strokeDasharray={`0 ${width / ((indicator?.dots || 1) - 1)}`}
                strokeLinecap="round"
              />
            ))}
          </g>

          <g transform={`translate(${padLeft} ${padTop})`}>
            <g>
              {this.state.lines.map((line, index) => (
                <PathElement
                  key={index.toString()}
                  d={line.path?.toString()}
                  fill="none"
                  stroke={line.color}
                  strokeWidth={2}
                />
              ))}
            </g>
          </g>
          <Axis x={padLeft} y={padTop + height} size={width} ticks={xTicks} horizontal />
          <Axis x={padLeft} y={padTop} size={height} ticks={yTicks} />
        </svg>
      </div>
    );
  }
}

export default LineChart;
