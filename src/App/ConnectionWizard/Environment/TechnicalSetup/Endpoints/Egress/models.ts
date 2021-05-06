import { ExternalEgressIP, EgressIP } from './types';

const apiToIpModel = (ip: ExternalEgressIP): EgressIP => ({
  id: ip.id,
  state: ip.state,
  address: ip.value.address,
  ports: ip.value.ports,
});

const ipToApiModel = (ip: EgressIP): Partial<ExternalEgressIP> => ({
  value: {
    address: ip.address,
    ports: ip.ports,
  },
});

export { apiToIpModel, ipToApiModel };
