import { Switch, Route, Redirect, useParams, useHistory, useRouteMatch } from 'react-router-dom';
import React, { FC } from 'react';
import { DataLabel, ProgressTabs, ProgressTab } from 'components';
import { Environment, EnvironmentStatus, EnvironmentPhases } from '../types';
import * as helpers from '../helpers';
import loadEnvironment from './hocs/loadEnvironment';
import BusinessSetup from './BusinessSetup';
import TechnicalSetup from './TechnicalSetup';

const phases: string[] = helpers.environmentPhases.map(
  (environmentPhase) => environmentPhase.param
);

interface EnvironmentRouterProps {
  environments: Environment[];
  isEnvironmentsStatusesPending: boolean;
  environmentsStatuses: EnvironmentStatus[];
  environmentsStatusesError: string | null;
}

interface EnvironmentRouterParams {
  environment: string;
}

const EnvironmentRouter: FC<EnvironmentRouterProps> = ({
  environments,
  isEnvironmentsStatusesPending,
  environmentsStatuses,
  environmentsStatusesError,
}) => {
  const params = useParams<EnvironmentRouterParams>();
  const match = useRouteMatch();
  const history = useHistory();
  const onPhaseClick = (url: string) => history.push(`${match.url}/${url}`);

  return (
    <Switch>
      <Route path={`${match.url}/:phase(${phases.join('|')})`}>
        <EnvironmentPhasesTabs
          onPhaseClick={onPhaseClick}
          environmentName={params.environment}
          environments={environments}
          isEnvironmentsStatusesPending={isEnvironmentsStatusesPending}
          environmentsStatuses={environmentsStatuses}
          environmentsStatusesError={environmentsStatusesError}
        />
      </Route>
      <Route>
        <Redirect to={`${match.url}/${phases[0]}`} />
      </Route>
    </Switch>
  );
};

interface EnvironmentPhasesTabsProps {
  environmentName: string;
  environments: Environment[];
  isEnvironmentsStatusesPending: boolean;
  environmentsStatuses: EnvironmentStatus[];
  environmentsStatusesError: string | null;
  onPhaseClick: (url: string) => void;
}

interface PhaseParams {
  phase: string;
}

const EnvironmentPhasesTabs: FC<EnvironmentPhasesTabsProps> = ({
  environmentName,
  environments,
  isEnvironmentsStatusesPending,
  environmentsStatuses,
  environmentsStatusesError,
  onPhaseClick,
}) => {
  const params = useParams<PhaseParams>();
  const history = useHistory();

  function onPhaseTabClick(index: number) {
    onPhaseClick(phases[index]);
  }

  const phaseTabIndex = phases.indexOf(params.phase);
  const currentEnvironment = environments.find(
    (environment) => environment.name === environmentName
  );

  const currentEnvironmentPhases = helpers.getEnvironmentPhases(
    environmentsStatuses,
    currentEnvironment as Environment,
    isEnvironmentsStatusesPending
  );
  const businessSetupConfig = helpers.getPhaseConfig(EnvironmentPhases.BusinessSetup);
  const technicalSetupConfig = helpers.getPhaseConfig(EnvironmentPhases.TechnicalSetup);

  const businessSetup = helpers.getPhaseStatus(
    currentEnvironmentPhases,
    EnvironmentPhases.BusinessSetup,
    isEnvironmentsStatusesPending
  );

  const businessSetupSteps = helpers.getPhaseSteps(
    currentEnvironmentPhases,
    EnvironmentPhases.BusinessSetup,
    isEnvironmentsStatusesPending
  );

  const technicalSetup = helpers.getPhaseStatus(
    currentEnvironmentPhases,
    EnvironmentPhases.TechnicalSetup,
    isEnvironmentsStatusesPending
  );

  const technicalSetupSteps = helpers.getPhaseSteps(
    currentEnvironmentPhases,
    EnvironmentPhases.TechnicalSetup,
    isEnvironmentsStatusesPending
  );

  return (
    <div>
      <div className="connection-wizard__phases-header">
        <DataLabel size="l">{environmentName} Setup</DataLabel>
        <DataLabel size="m" className="connection-wizard__phases__back-link">
          <a
            href="#null"
            onClick={(e) => {
              e.preventDefault();
              history.push('/connections');
            }}
          >
            {'<'} Back to overview
          </a>
        </DataLabel>
      </div>
      <ProgressTabs flex onClick={onPhaseTabClick} selected={phaseTabIndex}>
        <ProgressTab
          title={businessSetupConfig.title}
          status={businessSetup.status}
          statusLabel={businessSetup.progress}
          kind="green"
        >
          <BusinessSetup
            steps={businessSetupSteps}
            isEnvironmentsStatusesPending={isEnvironmentsStatusesPending}
          />
        </ProgressTab>
        <ProgressTab
          title={technicalSetupConfig.title}
          status={technicalSetup.status}
          statusLabel={technicalSetup.progress}
          kind="secondary"
        >
          <TechnicalSetup
            steps={technicalSetupSteps}
            isEnvironmentsStatusesPending={isEnvironmentsStatusesPending}
          />
        </ProgressTab>
      </ProgressTabs>
    </div>
  );
};

export default loadEnvironment(EnvironmentRouter);
