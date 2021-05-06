import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import React, { FC } from 'react';
import { ErrorBox, Spinner } from 'components';
import EnvironmentRouter from './Environment';
import EnvironmentsOverview from './Environments';
import loadEnvironmentsStatus from './Shared/hocs/loadEnvironmentsStatus';
import loadEnvironmentStatus from './Shared/hocs/loadEnvironmentStatus';
import { Environment, EnvironmentStatus } from './types';
import connector from './connectors';
import './ConnectionWizard.css';

const EnvironmentsOverviewWithStatus = loadEnvironmentsStatus(EnvironmentsOverview);
const EnvironmentRouterWithStatus = loadEnvironmentStatus(EnvironmentRouter);

interface WizardRouterLoaderProps {
  environments: Environment[];
  environmentsError: string | null;
  isEnvironmentsStatusesPending: boolean;
  environmentsStatuses: EnvironmentStatus[];
  environmentsStatusesError: string | null;
}

const WizardRouterLoader: FC<WizardRouterLoaderProps> = ({
  environments,
  environmentsError,
  isEnvironmentsStatusesPending,
  environmentsStatuses,
  environmentsStatusesError,
}) => {
  if (environmentsError) {
    return <ErrorBox>Unable to load environments</ErrorBox>;
  }

  if (!environments.length) {
    return (
      <div className="connection-wizard__loader">
        <Spinner size={30} />
      </div>
    );
  }
  return (
    <WizardRouter
      environments={environments}
      isEnvironmentsStatusesPending={isEnvironmentsStatusesPending}
      environmentsStatuses={environmentsStatuses}
      environmentsStatusesError={environmentsStatusesError}
    />
  );
};

interface WizardRouterProps {
  environments: Environment[];
  isEnvironmentsStatusesPending: boolean;
  environmentsStatuses: EnvironmentStatus[];
  environmentsStatusesError: string | null;
}

const WizardRouter: FC<WizardRouterProps> = ({
  environments,
  isEnvironmentsStatusesPending,
  environmentsStatuses,
  environmentsStatusesError,
}) => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.url} exact>
        <EnvironmentsOverviewWithStatus
          // @ts-ignore
          environments={environments}
          isEnvironmentsStatusesPending={isEnvironmentsStatusesPending}
          environmentsStatuses={environmentsStatuses}
          environmentsStatusesError={environmentsStatusesError}
        />
      </Route>
      <Route path={match.url}>
        <EnvironmentsRouter
          // @ts-ignore
          environments={environments}
          isEnvironmentsStatusesPending={isEnvironmentsStatusesPending}
          environmentsStatuses={environmentsStatuses}
          environmentsStatusesError={environmentsStatusesError}
        />
      </Route>
    </Switch>
  );
};

interface EnvironmentsRouterProps {
  environments: Environment[];
  isEnvironmentsStatusesPending: boolean;
  environmentsStatuses: EnvironmentStatus[];
  environmentsStatusesError: string | null;
}

const EnvironmentsRouter: FC<EnvironmentsRouterProps> = ({
  environments,
  isEnvironmentsStatusesPending,
  environmentsStatuses,
  environmentsStatusesError,
}) => {
  const environmentNames = environments.map((environment) => environment.name);
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/:environment(${environmentNames.join('|')})`}>
        <EnvironmentRouterWithStatus
          // @ts-ignore
          environments={environments}
          isEnvironmentsStatusesPending={isEnvironmentsStatusesPending}
          environmentsStatuses={environmentsStatuses}
          environmentsStatusesError={environmentsStatusesError}
        />
      </Route>
      <Route>
        <Redirect to={match.url} />
      </Route>
    </Switch>
  );
};

export default connector(WizardRouterLoader);
