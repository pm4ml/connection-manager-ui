import React, { SFC } from 'react';

type TextElementProps = {
  fill?: string;
  x?: number;
  y?: number;
  dx?: string;
  dy?: string;
  textAnchor?: string;
};

const TextElement: SFC<TextElementProps> = (props) => {
  return (
    <text {...props}>
      <tspan>{props.children}</tspan>
    </text>
  );
};

export default TextElement;
