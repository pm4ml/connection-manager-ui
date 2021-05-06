import { Switch, Route, Redirect, useParams, useHistory, useRouteMatch } from 'react-router-dom';
import React, { FC } from 'react';
import { ProgressTabs, ProgressTab } from 'components';
import { EnvironmentStep, EnvironmentStepIdentifiers } from '../../types';

import * as helpers from '../../helpers';
import Endpoints from './Endpoints';
import DFSPCertificateAuthority from './DFSPCertificateAuthority';
import TLS from './TLS/TLSClient';
import TLSServerCertificates from './TLS/TLSServerCertificates';
import DFSPJWSCertificates from './JWSCertificates/DFSPJWSCertificates';

const technicalSetupSteps: string[] = ['Endpoints', 'TLSConfig', 'CertAuth', 'CertEx', 'JWSCert'];

interface TechnicalSetupRouterProps {
  steps: EnvironmentStep[];
  isEnvironmentsStatusesPending: boolean;
}

const TechnicalSetupRouter: FC<TechnicalSetupRouterProps> = ({
  steps,
  isEnvironmentsStatusesPending,
}) => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.url}/:step(${technicalSetupSteps.join('|')})`}>
        <TechnicalSetup
          steps={steps}
          isEnvironmentsStatusesPending={isEnvironmentsStatusesPending}
        />
      </Route>
      <Route>
        <Redirect to={`${match.url}/${technicalSetupSteps[0]}`} />
      </Route>
    </Switch>
  );
};

interface TechnicalSetupParams {
  step: string;
}

interface TechnicalSetupTabsProps {
  steps: EnvironmentStep[];
  isEnvironmentsStatusesPending: boolean;
}

const TechnicalSetup: FC<TechnicalSetupTabsProps> = ({ steps, isEnvironmentsStatusesPending }) => {
  const params = useParams<TechnicalSetupParams>();
  const history = useHistory();

  const stepTabIndex = technicalSetupSteps.indexOf(params.step);

  function onTechnicalSetupTabClick(index: number) {
    history.push(technicalSetupSteps[index]);
  }

  const endpoints = helpers.getStepStatus(
    steps,
    EnvironmentStepIdentifiers.Endpoints,
    isEnvironmentsStatusesPending
  );
  const csrExchange = helpers.getStepStatus(
    steps,
    EnvironmentStepIdentifiers.CsrExchange,
    isEnvironmentsStatusesPending
  );
  const certificateAuthority = helpers.getStepStatus(
    steps,
    EnvironmentStepIdentifiers.CertificateAuthority,
    isEnvironmentsStatusesPending
  );
  const serverCertificatesExchange = helpers.getStepStatus(
    steps,
    EnvironmentStepIdentifiers.ServerCertificatesExchange,
    isEnvironmentsStatusesPending
  );
  const jwsCertificates = helpers.getStepStatus(
    steps,
    EnvironmentStepIdentifiers.JwsCertificates,
    isEnvironmentsStatusesPending
  );

  return (
    <>
      <ProgressTabs flex onClick={onTechnicalSetupTabClick} selected={stepTabIndex}>
        <ProgressTab
          description="Endpoints"
          status={endpoints.status}
          color={endpoints.statusColor}
          kind="green"
          selectedKind="primary"
          className="connection-wizard__steps"
        >
          <Endpoints />
        </ProgressTab>

        <ProgressTab
          description="CSR Exchange"
          status={csrExchange.status}
          color={csrExchange.statusColor}
          kind="green"
          selectedKind="primary"
          className="connection-wizard__steps"
        >
          <TLS />
        </ProgressTab>

        <ProgressTab
          description="Certificate Authority"
          status={certificateAuthority.status}
          color={certificateAuthority.statusColor}
          kind="green"
          selectedKind="primary"
          className="connection-wizard__steps"
        >
          <DFSPCertificateAuthority />
        </ProgressTab>

        <ProgressTab
          description="Server Certificates Exchange"
          status={serverCertificatesExchange.status}
          color={serverCertificatesExchange.statusColor}
          kind="green"
          selectedKind="primary"
          className="connection-wizard__steps"
        >
          <TLSServerCertificates />
        </ProgressTab>

        <ProgressTab
          description="JWS Certificates"
          status={jwsCertificates.status}
          color={jwsCertificates.statusColor}
          kind="green"
          selectedKind="primary"
          className="connection-wizard__steps"
          lastTabText="Done!"
        >
          <DFSPJWSCertificates />
        </ProgressTab>
      </ProgressTabs>
    </>
  );
};

export default TechnicalSetupRouter;
