import React, { FC } from 'react';
import { Icon, Tooltip } from 'components';
import './Navbar.css';

type Navbar = {
  username?: string;
  logoutUrl?: string;
  activeConnectionName: string;
  activeConnectionStatusColor: string;
};

const Navbar: FC<Navbar> = ({
  username,
  activeConnectionName,
  activeConnectionStatusColor,
  logoutUrl,
}) => {
  const clickFunc = () => {
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  };

  return (
    <div id="navbar">
      <div id="navbar__controls">
        <a id="navbar__link" href="/">
          Payment Manager
        </a>
      </div>
      <div id="navbar__active__connection">
        Connected to: {activeConnectionName}
        <div
          className="navbar__connection-led"
          style={{ background: activeConnectionStatusColor }}
        />
      </div>
      <div id="navbar__user">
        <div id="navbar__user__icon">
          <Icon name="user-small" fill="#fff" />
        </div>
        <div
          id="navbar__user__name"
          role="button"
          tabIndex={0}
          onClick={clickFunc}
          onKeyUp={clickFunc}
        >
          <Tooltip label="logout">{username || '-'}</Tooltip>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
