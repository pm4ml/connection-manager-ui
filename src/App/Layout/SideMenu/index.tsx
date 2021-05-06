import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Menu, MenuItem, MenuSection } from 'components';
import { useHistory } from 'react-router-dom';
import { State } from 'store/types';
import './SideMenu.css';

const stateProps = (state: State) => ({
  pathname: state.router.location.pathname,
});

type SideMenuProps = {
  pathname: string;
};

const SideMenu: FC<SideMenuProps> = ({ pathname }) => {
  const history = useHistory();
  return (
    <div className="side-menu">
      <Menu path="/" pathname={history.location.pathname} onChange={history.push}>
        <MenuSection label="BUSINESS OPS">
          <MenuItem path="/dashboard" label="Overview (mocked)" />
          <MenuItem path="/transfers" label="Transfers" />
          <MenuItem
            path="/test"
            partial
            label="Test"
            hidden={true /* process.env.NODE_ENV !== 'development' */}
          />
        </MenuSection>
        <MenuSection label="TECHNICAL OPS">
          <MenuItem path="/techdashboard" label="Overview" />
          <MenuItem path="/connections" partial label="Connection Wizard" />
        </MenuSection>
      </Menu>
    </div>
  );
};

export default connect(stateProps)(SideMenu);
