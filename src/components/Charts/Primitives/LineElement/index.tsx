import React, { SFC } from 'react';

type LineElementProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  width?: number;
  strokeWidth?: number;
  height?: number;
  x?: number;
  y?: number;
  fill?: string;
  strokeDasharray?: string | number;
};

const LineElement: SFC<LineElementProps> = (props) => {
  return <line {...props} />;
};

export default LineElement;
