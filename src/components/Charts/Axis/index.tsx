import React, { FC, Component } from 'react';
import * as d3 from 'd3';
import LineElement from '../Primitives/LineElement';

interface Tick {
  label: string;
  scale?: number;
  segment?: boolean;
  size?: number;
  color?: string;
  tickColor?: string;
}

interface InnerTick extends Tick {
  position: number;
  size: number;
  color: string;
  tickColor: string;
}

interface YAxisLayoutProps {
  x: number;
  y: number;
  size: number;
  ticks: Tick[];
  horizontal?: boolean;
}

interface YAxisLayoutState {
  ticks: InnerTick[];
}

class YAxis extends Component<YAxisLayoutProps, YAxisLayoutState> {
  public YAxisRef = React.createRef<SVGSVGElement>();

  constructor(props: YAxisLayoutProps) {
    super(props);
    this.state = {
      ticks: this.calculateTicks(this.setTickScale(this.props.ticks), this.props.size),
    };
  }

  componentDidUpdate(prevProps: YAxisLayoutProps) {
    if (this.props.ticks !== prevProps.ticks || this.props.size !== prevProps.size) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        ticks: this.calculateTicks(this.setTickScale(this.props.ticks), this.props.size),
      });
    }
  }

  setTickScale = (ticks: Tick[]): Tick[] => {
    // get the defined user scale or use index
    return ticks.map((tick, index) => ({ ...tick, scale: tick.scale || index }));
  };

  getDomainAndRange = (ticks: Tick[], size: number) => {
    const domain = [size, 0];
    const range = [0, d3.max(ticks, (d) => d.scale) || 1];
    return [domain, range];
  };

  getScale = (ticks: Tick[], size: number) => {
    const [range, domain] = this.getDomainAndRange(ticks, size);
    return d3.scaleLinear().domain(domain).range(range);
  };

  calculateTicks = (ticks: Tick[], size: number) => {
    const scaledTicks = this.setTickScale(ticks);
    const scale = this.getScale(scaledTicks, size);
    return scaledTicks.map((tick) => ({
      ...tick,
      color: tick.color || '#333',
      tickColor: tick.tickColor || '#333',
      size: tick.size || 10,
      position: scale(tick.scale as number),
    }));
  };

  render() {
    const { x, y, horizontal } = this.props;
    const { ticks } = this.state;

    return (
      <g transform={`translate(${x}, ${y})`}>
        <LineElement
          x1={0}
          y1={0}
          x2={horizontal ? this.props.size : 0}
          y2={horizontal ? 0 : this.props.size}
          stroke="grey"
          strokeWidth={2}
        />
        {ticks.map((tick, index) => {
          const { position, size, color, tickColor } = tick;
          const halfSize = size / 2;
          const tx = horizontal ? position : -halfSize;
          const ty = horizontal ? -halfSize : position;

          return (
            <g key={index.toString()} transform={`translate(${tx} ${ty})`}>
              {tick.segment !== false && (
                <TickLine horizontal={horizontal} size={size} color={tickColor} />
              )}
              <text
                fill={color}
                x={horizontal ? 0 : 0}
                y={horizontal ? size : 0}
                dominantBaseline={horizontal ? 'hanging' : 'middle'}
                textAnchor={horizontal ? 'middle' : 'end'}
                style={{ fontSize: 12 }}
              >
                {tick.label}
              </text>
            </g>
          );
        })}
      </g>
    );
  }
}

interface TickLineProps {
  horizontal?: boolean;
  size: number;
  color: string;
}
const TickLine: FC<TickLineProps> = ({ horizontal = false, size, color }) => {
  return (
    <LineElement
      x1={0}
      y1={0}
      x2={horizontal ? 0 : size}
      y2={horizontal ? size : 0}
      stroke={color}
    />
  );
};

export default YAxis;
