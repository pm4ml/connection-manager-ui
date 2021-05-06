import { State } from 'store/types';
import { buildApis } from './api';
import { Config } from './api/types';

const services = {
  localNode: {
    baseUrl: (state: State) => state.app.config.apiBaseUrl,
  },
};

interface Todo {
  title: string;
}

const dfsps: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsps`,
};

const environments: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: () => `/environments`,
};

const environmentStatus: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/status`,
};

const monetaryZones: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: () => `/monetaryzones`,
};

const batches: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: () => `/batches`,
};

const batchTransfers: Config<Todo, State> = {
  service: services.localNode,
  // eslint-disable-next-line
  url: (_: State, { batchId }: any) => `/batches/${batchId}/transfers`,
};

const transferDetails: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { transferId }: { transferId: string }) => `/transfers/${transferId}/details`,
};

const transfersErrors: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/errors',
};

const transfers: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/transfers',
};

const transfersStatuses: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/transferStatusSummary',
};

const transfersSuccessPerc: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/minuteSuccessfulTransferPerc',
};

const transfersAvgTime: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/minuteAverageTransferResponseTime',
};

const weeklyPositions: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/hourlyPosition',
};

const weeklyFlows: Config<Todo, State> = {
  service: services.localNode,
  url: () => '/hourlyFlow',
};

const dfsp: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/details`,
};

const dfspCA: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/ca`,
};

const dfspHubCA: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/hub/ca`,
};

const dfspAutoCA: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/ca`,
};

const dfspServerCerts: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/serverCerts`,
};

const hubServerCerts: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/hub/serverCerts`,
};

const dfspJWSCerts: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/jwscerts`,
};

const otherDfspJWSCerts: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/alljwscerts`,
};

const ingressUrls: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/endpoints/ingress/urls`,
};

const ingressIps: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/endpoints/ingress/ips`,
};

const ingressUrl: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { urlId, environmentId }: { urlId: string; environmentId: string }) =>
    `/environments/${environmentId}/dfsp/endpoints/ingress/urls/${urlId}`,
};

const ingressIp: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { ipId, environmentId }: { ipId: string; environmentId: string }) =>
    `/environments/${environmentId}/dfsp/endpoints/ingress/ips/${ipId}`,
};

const egressIps: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/endpoints/egress/ips`,
};

const egressIp: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { ipId, environmentId }: { ipId: string; environmentId: string }) =>
    `/environments/${environmentId}/dfsp/endpoints/egress/ips/${ipId}`,
};

const ingressHubEndpoints: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/hub/endpoints/ingress`,
};

const egressHubEndpoints: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/hub/endpoints/egress`,
};

const inboundEnrollments: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/clientCerts`,
};

const inboundEnrollmentsCsr: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/dfsp/clientCerts/csr`,
};

const outboundEnrollments: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/hub/clientCerts`,
};

const outboundEnrollmentCertificate: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/hub/clientCerts`,
};

const outboundEnrollmentAutoCertificate: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { environmentId }: { environmentId: string }) =>
    `/environments/${environmentId}/hub/clientCerts`,
};

const metric: Config<Todo, State> = {
  service: services.localNode,
  url: (_: State, { metricName }: { metricName: string }) => `/metrics/${metricName}`,
};

interface MyMap {
  dfsps: Config<Todo, State>;
  environments: Config<Todo, State>;
  environmentStatus: Config<Todo, State>;
  monetaryZones: Config<Todo, State>;
  batches: Config<Todo, State>;
  batchTransfers: Config<Todo, State>;
  dfsp: Config<Todo, State>;
  dfspCA: Config<Todo, State>;
  dfspAutoCA: Config<Todo, State>;
  dfspHubCA: Config<Todo, State>;
  dfspServerCerts: Config<Todo, State>;
  hubServerCerts: Config<Todo, State>;
  dfspJWSCerts: Config<Todo, State>;
  otherDfspJWSCerts: Config<Todo, State>;
  transfersErrors: Config<Todo, State>;
  transfers: Config<Todo, State>;
  transfersStatuses: Config<Todo, State>;
  transfersSuccessPerc: Config<Todo, State>;
  transfersAvgTime: Config<Todo, State>;
  transferDetails: Config<Todo, State>;
  weeklyFlows: Config<Todo, State>;
  weeklyPositions: Config<Todo, State>;
  ingressUrls: Config<Todo, State>;
  ingressIps: Config<Todo, State>;
  ingressUrl: Config<Todo, State>;
  ingressIp: Config<Todo, State>;
  egressIps: Config<Todo, State>;
  egressIp: Config<Todo, State>;
  ingressHubEndpoints: Config<Todo, State>;
  egressHubEndpoints: Config<Todo, State>;
  inboundEnrollments: Config<Todo, State>;
  inboundEnrollmentsCsr: Config<Todo, State>;
  outboundEnrollments: Config<Todo, State>;
  outboundEnrollmentCertificate: Config<Todo, State>;
  outboundEnrollmentAutoCertificate: Config<Todo, State>;
  metric: Config<Todo, State>;
}

const endpoints = {
  dfsps,
  environments,
  environmentStatus,
  monetaryZones,
  batches,
  batchTransfers,
  dfsp,
  dfspCA,
  dfspAutoCA,
  dfspHubCA,
  dfspServerCerts,
  hubServerCerts,
  dfspJWSCerts,
  otherDfspJWSCerts,
  transferDetails,
  transfersErrors,
  transfers,
  transfersStatuses,
  transfersSuccessPerc,
  transfersAvgTime,
  weeklyPositions,
  weeklyFlows,
  ingressUrls,
  ingressIps,
  ingressUrl,
  ingressIp,
  egressIps,
  egressIp,
  ingressHubEndpoints,
  egressHubEndpoints,
  inboundEnrollments,
  inboundEnrollmentsCsr,
  outboundEnrollments,
  outboundEnrollmentCertificate,
  outboundEnrollmentAutoCertificate,
  metric,
};

export default buildApis<MyMap, State>(endpoints);
