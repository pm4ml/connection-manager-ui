import React, { FC } from 'react';
import './Content.css';

type ContentProps = {};

const Content: FC<ContentProps> = ({ children }) => {
  return <div className="content">{children}</div>;
};

export default Content;
