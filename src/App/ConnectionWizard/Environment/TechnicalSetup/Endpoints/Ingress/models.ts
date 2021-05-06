import { ExternalIngressIP, ExternalIngressURL, IngressIP, IngressURL } from './types';

const apiToIpModel = (ip: ExternalIngressIP): IngressIP => ({
  id: ip.id,
  state: ip.state,
  address: ip.value.address,
  ports: ip.value.ports,
});

const ipToApiModel = (ip: IngressIP): Partial<ExternalIngressIP> => ({
  value: {
    address: ip.address,
    ports: ip.ports,
  },
});

const apiToUrlModel = (url: ExternalIngressURL): IngressURL => ({
  id: url.id,
  state: url.state,
  url: url.value.url,
});

const urlToApiModel = (url: IngressURL): Partial<ExternalIngressURL> => ({
  value: {
    url: url.url,
  },
});

export { apiToIpModel, apiToUrlModel, ipToApiModel, urlToApiModel };
