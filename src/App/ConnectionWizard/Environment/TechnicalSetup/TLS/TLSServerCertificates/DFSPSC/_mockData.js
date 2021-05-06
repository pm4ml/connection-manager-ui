export const dfspCaHubCertMock =
  '-----BEGIN CERTIFICATE-----MIIEizCCA3OgAwIBAgIQDI7gyQ1qiRWIBAYe4kH5rzANBgkqhkiG9w0BAQsFADBhjxSZnE0qnsHhfTuvcqdFuhOWKU4Z0BqYBvQ3lBetoxi6PrABDJXWKTUgNX31EGDk-----END CERTIFICATE-----';

const Validation = {
  validationCode: 'CSR_CERT_SAME_PUBLIC_KEY',
  performed: true,
  result: 'VALID',
  message: 'Validation Test Message',
  messageTemplate: 'Textual description of the validation result',
  data: {},
  details: 'Test Details',
};

const CertInfo = {
  subject: {
    CN: 'cnvalue',
    emailAddress: 'e@mail.com',
    O: 'Org',
    OU: 'OrgUnit',
    C: 'SriLanka',
    ST: 'None',
    L: 'Central America',
  },
  issuer: {
    CN: 'cnvalue',
    emailAddress: 'e@mail.com',
    O: 'Org',
    OU: 'OrgUnit',
    C: 'SriLanka',
    ST: 'None',
    L: 'Central America',
  },
  subjectAlternativeNames: ['alt1', 'alt2'],
  serialNumber: '17159976289428250189079625547205715159',
  notBefore: '2019-02-04T00:00:00Z',
  notAfter: '2020-02-12T12:00:00Z',
  signatureAlgorithm: 'SHA256WithRSA',
};

export const dfspServerCertsMock = {
  rootCertificate:
    '-----BEGIN CERTIFICATE-----MIIEizCCA3OgAwIBAgIQDI7gyQ1qiRWIBAYe4kH5rzANBgkqhkiG9w0BAQsFADBhMQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMRkwFwYDVQQLExB3+rZ8uckJ2/0lYDblizkVIvP6hnZf1WZUXoOLRg9eFhSvGNoVwvdRLNXSmDmyHBwW4coatc7TlJFGa8kBpJIER-----END CERTIFICATE-----',
  intermediateChain:
    '-----BEGIN CERTIFICATE-----MIIEXDCCA0SgAwIBAgINAeOpMBz8cgY4P5pTHTANBgkqhkiG9w0BAQsFADBMMSAwHgYDVQQLExdHbG9iYWxTaWduIFJvb3QgQ0EgLSBSMjETMBEGA1UEChMKR2xvYmFsU2lnbjETMBEGA1UEAxMKR2xvYmFsU2lnbjAeFw0xNzA2MTUwMDAwNDJaFw0yMTEyMTUwMDAwNDJaMFQxCzAJBgNVBAYTAlVTMR4wHAYDVQQKExVHb29n-----END CERTIFICATE-----',
  serverCertificate:
    '-----BEGIN CERTIFICATE-----VJEA8KbtyX+r8snwU5C1hUrwaW6MWOARa8qBpNQcWTkaIeoYvy/sGIJEmjR0vFEwHdp1cSaWIr6/4g72n7OqXwfinu7ZYW97EfoOSQJeAzAgMBAAGjggEzMIIBLzAOBgNVHQ8BAf8EBAMCAYYwHQYDVR0lBBYwFAYIKwYBBQUHAwEGCCsGAQUFBwMCMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0OBBYEFHfCuFCaZ3Z2sS3ChtCDoH6mfrpLMB8GA1UdIwQYMBaAFJviB1dnHB7AagbeWbSaLd/cGYYuMDUGCCsGAQUFBwEBBCkwJzAlBggrBgEFBQcwAYYZaHR0cDovL29jc3AucGtpLmdvb2cvZ3NyMjAyBgNVHR8EKzApMCegJaAjhiFodHRwOi8vY3JsLnBraS5nb2-----END CERTIFICATE-----',
  validations: [Validation],
  validationState: 'VALID',
  rootCertificateInfo: CertInfo,
  intermediateChainInfo: [CertInfo],
  serverCertificateInfo: CertInfo,
};
