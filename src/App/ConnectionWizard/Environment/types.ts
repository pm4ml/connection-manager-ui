import { MainActionTypes, MainState } from './Main/types';
import { IngressActionTypes, IngressState } from './TechnicalSetup/Endpoints/Ingress/types';
import { EgressActionTypes, EgressState } from './TechnicalSetup/Endpoints/Egress/types';
import { HubActionTypes, HubState } from './TechnicalSetup/Endpoints/Hub/types';
import { DFSPCertificateAuthorityState } from './TechnicalSetup/DFSPCertificateAuthority/types';
import { DfspCSRActionTypes, CSRState } from './TechnicalSetup/TLS/TLSClient/CSR/types';
import {
  DfspSentCSRsActionTypes,
  SentCSRsState,
} from './TechnicalSetup/TLS/TLSClient/SentCSRs/types';
import {
  DfspHubCSRsActionTypes,
  DfspHubCSRsState,
} from './TechnicalSetup/TLS/TLSClient/HubCSRs/types';
import {
  DfspSCActionTypes,
  DfspSCState,
} from './TechnicalSetup/TLS/TLSServerCertificates/DFSPSC/types';
import {
  DfspHubSCActionTypes,
  DfspHubSCState,
} from './TechnicalSetup/TLS/TLSServerCertificates/HubSC/types';
import { DFSPJWSActionTypes, DFSPJWSState } from './TechnicalSetup/JWSCertificates/DFSPJWS/types';
import {
  OtherDFSPsJWSActionTypes,
  OtherDFSPsJWSState,
} from './TechnicalSetup/JWSCertificates/OtherDFSPsJWS/types';

export type EnvironmentActionTypes =
  | MainActionTypes
  | IngressActionTypes
  | EgressActionTypes
  | HubActionTypes
  | DFSPCertificateAuthorityState
  | DfspCSRActionTypes
  | DfspCSRActionTypes
  | DfspSentCSRsActionTypes
  | DfspHubCSRsActionTypes
  | DfspSCActionTypes
  | DfspHubSCActionTypes
  | DFSPJWSActionTypes
  | OtherDFSPsJWSActionTypes;

export interface EnvironmentState {
  main: MainState;
  endpoints: {
    ingress: IngressState;
    egress: EgressState;
    hub: HubState;
  };
  dfspca: DFSPCertificateAuthorityState;
  tls: {
    tlsclient: { csr: CSRState; csrs: SentCSRsState; hub: DfspHubCSRsState };
    tlsserver: {
      dfsps: DfspSCState;
      hubsc: DfspHubSCState;
    };
  };
  jws: {
    dfspjws: DFSPJWSState;
    otherdfspjws: OtherDFSPsJWSState;
  };
}
