import React, { FC } from 'react';
import './Container.css';

type Container = {};

const SideMenu: FC<Container> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default SideMenu;
