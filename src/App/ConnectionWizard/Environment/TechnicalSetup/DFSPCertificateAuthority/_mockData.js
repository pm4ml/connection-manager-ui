export const dfspCaHubCertMock =
  '-----BEGIN CERTIFICATE-----MIIEizCCA3OgAwIBAgIQDI7gyQ1qiRWIBAYe4kH5rzANBgkqhkiG9w0BAQsFADBhjxSZnE0qnsHhfTuvcqdFuhOWKU4Z0BqYBvQ3lBetoxi6PrABDJXWKTUgNX31EGDk-----END CERTIFICATE-----';

const Validation = {
  validationCode: 'CSR_CERT_SAME_PUBLIC_KEY',
  performed: true,
  result: 'VALID',
  message: 'Validation Test Message',
  messageTemplate:
    'Textual description of the validation result, using the JavaScript template literal format',
  data: {},
  details: 'Test Details',
};

export const dfspCertificateMock = {
  rootCertificate: 'Test Root Certificate',
  intermediateChain: 'Test Root Certificate',
  validations: [Validation],
  validationState: 'VALID',
};
