import { Switch, Route, Redirect, useParams, useHistory, useRouteMatch } from 'react-router-dom';
import React, { FC } from 'react';
import { ProgressTabs, ProgressTab } from 'components';
import { EnvironmentStep, EnvironmentStepIdentifiers } from '../../types';
import * as helpers from '../../helpers';
import DfspConfig from './DfspConfig';

const businessSetupSteps: string[] = ['idGeneration'];

interface BusinessSetupRouterProps {
  steps: EnvironmentStep[];
  isEnvironmentsStatusesPending: boolean;
}

const BusinessSetupRouter: FC<BusinessSetupRouterProps> = ({
  steps,
  isEnvironmentsStatusesPending,
}) => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/:step(${businessSetupSteps.join('|')})`}>
        <BusinessSetup
          steps={steps}
          isEnvironmentsStatusesPending={isEnvironmentsStatusesPending}
        />
      </Route>
      <Route>
        <Redirect to={`${match.url}/${businessSetupSteps[0]}`} />
      </Route>
    </Switch>
  );
};

interface BusinessSetupParams {
  step: string;
}

interface BusinessSetupTabsProps {
  steps: EnvironmentStep[];
  isEnvironmentsStatusesPending: boolean;
}

const BusinessSetup: FC<BusinessSetupTabsProps> = ({ steps, isEnvironmentsStatusesPending }) => {
  const params = useParams<BusinessSetupParams>();
  const history = useHistory();

  const stepTabIndex = businessSetupSteps.indexOf(params.step);

  function onBusinessSetupTabClick(index: number) {
    history.push(businessSetupSteps[index]);
  }

  const idGeneration = helpers.getStepStatus(
    steps,
    EnvironmentStepIdentifiers.IdGeneration,
    isEnvironmentsStatusesPending
  );

  return (
    <>
      <ProgressTabs flex onClick={onBusinessSetupTabClick} selected={stepTabIndex}>
        <ProgressTab
          description="ID Generation"
          status={idGeneration.status}
          color={idGeneration.statusColor}
          kind="green"
          selectedKind="primary"
          className="connection-wizard__steps"
          lastTabText="Done!"
        >
          <DfspConfig />
        </ProgressTab>
        <></>
      </ProgressTabs>
    </>
  );
};

export default BusinessSetupRouter;
