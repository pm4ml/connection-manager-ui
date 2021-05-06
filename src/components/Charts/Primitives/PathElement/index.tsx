import React, { SFC } from 'react';

type PathElementProps = {
  d: string | undefined;
  stroke: string;
  fill: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
  strokeDasharray?: string;
};

const PathElement: SFC<PathElementProps> = (props) => {
  return <path {...props} />;
};

export default PathElement;
