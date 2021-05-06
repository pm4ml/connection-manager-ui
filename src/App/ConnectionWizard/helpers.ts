import {
  Environment,
  EnvironmentStatus,
  EnvironmentPhaseStepStatuses,
  EnvironmentPhase,
  EnvironmentStep,
  EnvironmentPhases,
  EnvironmentStepIdentifiers,
} from './types';

enum LedColors {
  Completed = '#12d670',
  InProgress = '#ff9933',
  ToDo = '#999999',
  Unknown = '#000000',
  Pending = '#DDDDDD',
}

enum StatusMessages {
  Completed = 'Completed',
  InProgress = 'In Progress',
  ToDo = 'To Do',
  Unknown = 'Unknown',
  Pending = 'Pending',
}

interface ItemStatus {
  status: StatusMessages;
  statusColor: LedColors;
  progress: string;
}

const PendingResponse: ItemStatus = {
  status: StatusMessages.Pending,
  statusColor: LedColors.Pending,
  progress: 'Pending',
};

const UnknownResponse: ItemStatus = {
  status: StatusMessages.Unknown,
  statusColor: LedColors.Unknown,
  progress: 'Not Defined',
};

function isStepCompleted(step: EnvironmentStep) {
  return step.status === EnvironmentPhaseStepStatuses.Completed;
}

function getStepsPercentage(subset: EnvironmentStep[], items: EnvironmentStep[]) {
  return Math.floor((subset.length / items.length) * 100);
}

function getStatusLedColor(completed: number, total: number): LedColors {
  const ratio = completed / total;
  if (ratio === 1) {
    return LedColors.Completed;
  }
  if (ratio > 0) {
    return LedColors.InProgress;
  }
  return LedColors.ToDo;
}

function getStatusMessage(completed: number, total: number): StatusMessages {
  const ratio = completed / total;
  if (ratio === 1) {
    return StatusMessages.Completed;
  }
  if (ratio > 0) {
    return StatusMessages.InProgress;
  }
  return StatusMessages.ToDo;
}

function getStepStatusColor(status: EnvironmentPhaseStepStatuses) {
  if (status === EnvironmentPhaseStepStatuses.ToDo) {
    return LedColors.ToDo;
  }
  if (status === EnvironmentPhaseStepStatuses.InProgress) {
    return LedColors.InProgress;
  }
  if (status === EnvironmentPhaseStepStatuses.Completed) {
    return LedColors.Completed;
  }
  return LedColors.Unknown;
}

function getStepStatusMessage(status: EnvironmentPhaseStepStatuses) {
  if (status === EnvironmentPhaseStepStatuses.ToDo) {
    return StatusMessages.ToDo;
  }
  if (status === EnvironmentPhaseStepStatuses.InProgress) {
    return StatusMessages.InProgress;
  }
  if (status === EnvironmentPhaseStepStatuses.Completed) {
    return StatusMessages.Completed;
  }
  return StatusMessages.Unknown;
}

interface EnvironmentPhaseConfig {
  title: string;
  identifier: EnvironmentPhases;
  param: string;
}

export const environmentPhases: EnvironmentPhaseConfig[] = [
  {
    title: 'Phase 1: Business Setup',
    identifier: EnvironmentPhases.BusinessSetup,
    param: 'businessSetup',
  },
  {
    title: 'Phase 2: Technical Setup',
    identifier: EnvironmentPhases.TechnicalSetup,
    param: 'technicalSetup',
  },
];

export function getPhaseConfig(identifier: EnvironmentPhases): EnvironmentPhaseConfig {
  return environmentPhases.find(
    (phase) => phase.identifier === identifier
  ) as EnvironmentPhaseConfig;
}

export function getPhaseSteps(
  phases: EnvironmentPhase[],
  phaseIdentifier: EnvironmentPhases,
  pending: boolean
): EnvironmentStep[] {
  if (pending) {
    return [];
  }
  const phase = phases.find((item) => item.phase === phaseIdentifier);
  return phase?.steps || [];
}

export function getPhaseStatus(
  phases: EnvironmentPhase[],
  identifier: EnvironmentPhases,
  pending: boolean
): ItemStatus {
  if (pending) {
    return PendingResponse;
  }
  const phase = phases?.find((item) => item.phase === identifier);
  if (!phase) {
    return UnknownResponse;
  }
  const { steps } = phase;
  const completedSteps = steps.filter(isStepCompleted);
  return {
    progress: `${completedSteps.length}/${steps.length} Steps Completed`,
    status: getStatusMessage(completedSteps.length, steps.length),
    statusColor: getStatusLedColor(completedSteps.length, steps.length),
  };
}

export function getEnvironmentPhases(
  environmentsStatuses: EnvironmentStatus[],
  environment: Environment,
  pending: boolean
): EnvironmentPhase[] {
  if (pending) {
    return [];
  }
  const environmentsStatus = environmentsStatuses.find(
    (status) => status.environmentId === environment.id
  );
  return environmentsStatus?.phases || [];
}

export function getEnvironmentStatus(
  environmentsStatuses: EnvironmentStatus[],
  environment: Environment,
  phases: EnvironmentPhase[],
  pending: boolean
): ItemStatus {
  if (pending) {
    return PendingResponse;
  }
  const environmentsStatus = environmentsStatuses.find(
    (status) => status.environmentId === environment.id
  );
  if (!environmentsStatus) {
    return UnknownResponse;
  }
  const steps = phases.map((phase) => phase.steps);
  const allSteps = steps.flat();
  const completedSteps = allSteps.filter(isStepCompleted);
  return {
    status: getStatusMessage(completedSteps.length, allSteps.length),
    statusColor: getStatusLedColor(completedSteps.length, allSteps.length),
    progress: `${getStepsPercentage(completedSteps, allSteps)}% Completed`,
  };
}

export function getStepStatus(
  steps: EnvironmentStep[],
  identifier: EnvironmentStepIdentifiers,
  pending: boolean
): ItemStatus {
  if (pending) {
    return PendingResponse;
  }
  const step = steps.find((currentStep) => currentStep.identifier === identifier);
  if (!step) {
    return UnknownResponse;
  }
  return {
    status: getStepStatusMessage(step.status),
    statusColor: getStepStatusColor(step.status),
    progress: '0',
  };
}
