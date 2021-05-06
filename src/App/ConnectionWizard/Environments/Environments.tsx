import React, { FC } from 'react';
import { AnimateFadeIn, Accordion, AccordionItem } from 'components';
import { useHistory } from 'react-router-dom';
import * as helpers from '../helpers';
import { Environment, EnvironmentStatus } from '../types';

interface EnvironmentsOverviewProps {
  environments: Environment[];
  isEnvironmentsStatusesPending: boolean;
  environmentsStatuses: EnvironmentStatus[];
  environmentsStatusesError: string | null;
}

const EnvironmentsOverview: FC<EnvironmentsOverviewProps> = ({
  environments,
  isEnvironmentsStatusesPending,
  environmentsStatuses,
  environmentsStatusesError,
}) => {
  const history = useHistory();
  return (
    <AnimateFadeIn initial={{ y: 10 }} animate={{ y: 0 }}>
      {environments.map((environment) => {
        const phases = helpers.getEnvironmentPhases(
          environmentsStatuses,
          environment,
          isEnvironmentsStatusesPending
        );
        const { status, statusColor, progress } = helpers.getEnvironmentStatus(
          environmentsStatuses,
          environment,
          phases,
          isEnvironmentsStatusesPending
        );

        return (
          <Accordion
            key={environment.name}
            title={environment.name}
            pending={isEnvironmentsStatusesPending}
            status={status}
            statusColor={statusColor}
            progress={progress}
            onClick={() => history.push(`/connections/${environment.name}`)}
          >
            {helpers.environmentPhases.map((phase) => {
              const phaseStatus = helpers.getPhaseStatus(
                phases,
                phase.identifier,
                isEnvironmentsStatusesPending
              );

              const onClick = () => history.push(`/connections/${environment.name}/${phase.param}`);

              return (
                <AccordionItem
                  key={phase.param}
                  title={phase.title}
                  pending={isEnvironmentsStatusesPending}
                  status={phaseStatus.status}
                  statusColor={phaseStatus.statusColor}
                  progress={phaseStatus.progress}
                  onClick={onClick}
                />
              );
            })}
          </Accordion>
        );
      })}
    </AnimateFadeIn>
  );
};

export default EnvironmentsOverview;
