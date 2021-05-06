import React, { FC } from 'react';
import './Page.css';

type Page = {};

const Page: FC<Page> = ({ children }) => {
  return <div className="page">{children}</div>;
};

export default Page;
