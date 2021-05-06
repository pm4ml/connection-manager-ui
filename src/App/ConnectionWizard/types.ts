// TODO: Use import type as soon as it's available in order to avoid type dependency cycles
/* eslint-disable-next-line import/no-cycle */
import { SharedActionTypes, SharedState } from './Shared/types';
import { EnvironmentActionTypes, EnvironmentState } from './Environment/types';
// TODO: Use import type as soon as it's available in order to avoid type dependency cycles
/* eslint-disable-next-line import/no-cycle */
import { EnvironmentsActionTypes, EnvironmentsState } from './Environments/types';

export type WizardActionTypes =
  | SharedActionTypes
  | EnvironmentActionTypes
  | EnvironmentsActionTypes;

export interface WizardState {
  shared: SharedState;
  environment: EnvironmentState;
  environments: EnvironmentsState;
}

export interface Environment {
  id: string;
  name: string;
}

export interface EnvironmentStatus {
  environmentId: string;
  phases: EnvironmentPhase[];
}

export interface EnvironmentPhase {
  phase: EnvironmentPhases;
  steps: EnvironmentStep[];
}

export enum EnvironmentPhases {
  BusinessSetup = 'BUSINESS_SETUP',
  TechnicalSetup = 'TECHNICAL_SETUP',
}

export interface EnvironmentStep {
  identifier: EnvironmentStepIdentifiers;
  status: EnvironmentPhaseStepStatuses;
}

export enum EnvironmentStepIdentifiers {
  IdGeneration = 'ID_GENERATION',
  Endpoints = 'ENDPOINTS',
  CsrExchange = 'CSR_EXCHANGE',
  CertificateAuthority = 'CERTIFICATE_AUTHORITY',
  ServerCertificatesExchange = 'SERVER_CERTIFICATES_EXCHANGE',
  JwsCertificates = 'JWS_CERTIFICATES',
}

export enum EnvironmentPhaseStepStatuses {
  ToDo = 'NOT_STARTED',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
}
