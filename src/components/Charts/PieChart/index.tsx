import React, { Component } from 'react';
import * as d3 from 'd3';
import PathElement from '../Primitives/PathElement';
import './PieChart.css';

interface PieDatum {
  value: number;
  color: string;
}
interface Pie {
  color: string;
  path: string;
}

interface PieChartProps {
  canvasSize: number;
  pieData: PieDatum[];
  innerRadius: number;
  outerRadius: number;
}
interface PieChartState {
  arcs: Pie[];
}

class PieChart extends Component<PieChartProps, PieChartState> {
  public svgLayoutRef = React.createRef<SVGSVGElement>();

  constructor(props: PieChartProps) {
    super(props);
    this.state = {
      arcs: this.calculatePiePath(
        this.props.pieData,
        this.props.innerRadius,
        this.props.outerRadius
      ),
    };
  }

  componentDidUpdate(prevProps: PieChartProps) {
    if (this.props.pieData !== prevProps.pieData) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        arcs: this.calculatePiePath(
          this.props.pieData,
          this.props.innerRadius,
          this.props.outerRadius
        ),
      });
    }
  }

  getPieFunction = () => {
    return d3
      .pie<void, PieDatum>()
      .value((d) => d.value)
      .sort(null);
  };

  getPieColors = (data: PieDatum[]) => {
    const pieColors = data.map((clr: PieDatum) => clr.color);
    return d3.scaleOrdinal().domain(pieColors).range(pieColors);
  };

  getArcFunction = (innerRadius: number, outerRadius: number) =>
    d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);

  calculatePiePath = (data: PieDatum[], innerRadius: number, outerRadius: number): Pie[] => {
    const pieFn = this.getPieFunction();
    const arcFn = this.getArcFunction(innerRadius, outerRadius);
    const pieColorFn = this.getPieColors(data);

    return pieFn(data).map((pie, index) => ({
      path: arcFn({ ...pie, innerRadius: 0, outerRadius: 0 }) as string,
      color: pieColorFn(index.toString()) as string,
    }));
  };

  render() {
    const { canvasSize } = this.props;

    return (
      <div className="chart-wrapper">
        <svg
          ref={this.svgLayoutRef}
          height={canvasSize}
          width={canvasSize}
          viewBox={`0 0 ${canvasSize} ${canvasSize} `}
        >
          <g transform={`translate(${canvasSize / 2} ${canvasSize / 2})`}>
            {this.state.arcs.map((pie, index) => {
              return (
                <g key={`arc-key-${index.toString()}`}>
                  <PathElement d={pie.path} fill={pie.color} stroke="none" />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
}

export default PieChart;
