/* eslint-disable no-console */
import { Switch, Route, Redirect, useParams, useHistory, useRouteMatch } from 'react-router-dom';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { State, Dispatch } from 'store/types';
import { ProgressTabs, ProgressTab } from 'components';

const stateProps = (state: State) => ({});

const dispatchProps = (dispatch: Dispatch) => ({});

type TestProps = {};

const Test: FC<TestProps> = () => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/:parent`} component={() => <TestTabs parentPath={match.path} />} />
      <Route>
        <Redirect to={`${match.url}/setup`} />
      </Route>
    </Switch>
  );
};

type TestTabsProps = {
  parentPath: string;
};

interface ParentParams {
  parent: string;
}
interface ChildParams {
  child: string;
}

const TestTabs: FC<TestTabsProps> = ({ parentPath }) => {
  const params = useParams<ParentParams>();
  const history = useHistory();
  const match = useRouteMatch();

  const parentTabs = ['setup', 'review', 'confirm', 'approve'];

  function onParentTabClick(index: number) {
    history.push(`${parentPath}/${parentTabs[index]}`);
  }

  const parentTabIndex = parentTabs.indexOf(params.parent);

  return (
    <div className="test">
      <ProgressTabs flex onClick={onParentTabClick} selected={parentTabIndex}>
        <ProgressTab title="Setup" status="Tested" statusLabel="7/7 Steps" kind="green">
          <Switch>
            <Route path={`${match.url}/:child`}>
              <Setup childPath={match.url} />
            </Route>
            <Route>
              <Redirect to={`${match.url}/name`} />
            </Route>
          </Switch>
        </ProgressTab>
        <ProgressTab title="Review" status="Tested" statusLabel="7/7 Steps" kind="secondary">
          <Switch>
            <Route path={`${match.url}/:child`}>
              <Setup childPath={match.url} />
            </Route>
            <Route>
              <Redirect to={`${match.url}/name`} />
            </Route>
          </Switch>
        </ProgressTab>
        <ProgressTab title="Confirm" status="Tested" statusLabel="7/7 Steps" kind="danger" />
        <ProgressTab title="Approve" status="Tested" statusLabel="7/7 Steps" kind="danger" />
      </ProgressTabs>
    </div>
  );
};

type SetupTabsProps = {
  childPath: string;
};
const Setup: FC<SetupTabsProps> = ({ childPath }) => {
  const params = useParams<ChildParams>();
  const history = useHistory();

  const childTabs = ['name', 'lastname', 'age'];

  const childTabIndex = childTabs.indexOf(params.child);

  function onChildTabClick(index: number) {
    history.push(`${childPath}/${childTabs[index]}`);
  }
  return (
    <>
      <ProgressTabs flex onClick={onChildTabClick} selected={childTabIndex}>
        <ProgressTab
          title="name"
          description="Your birthday given first name"
          status="Tested"
          statusLabel="7/7 Steps"
          kind="green"
          selectedKind="primary"
          style={{ flex: '0 0 150px' }}
        />
        <ProgressTab
          title="lastname"
          description="Your birthday given last name"
          statusLabel="7/7 Steps"
          status="Tested"
          kind="green"
          selectedKind="primary"
        />
        <ProgressTab
          title="age"
          description="Your age"
          statusLabel="7/7 Steps"
          status="Tested"
          kind="green"
          selectedKind="primary"
          disabled
        />
      </ProgressTabs>
    </>
  );
};

export default connect(stateProps, dispatchProps)(Test);
