// CSR_CERT_SAME_PUBLIC_KEY
// CSR_CERT_SAME_SUBJECT_INFO

const Validation = {
  validationCode: 'CSR_CERT_SAME_PUBLIC_KEY',
  performed: true,
  result: 'VALID',
  message: 'It worked',
  messageTemplate:
    'Textual description of the validation result, using the JavaScript template literal format',
  data: {},
  details: 'string',
};
const CSRInfo = {
  subject: {
    CN: 'cnvalue',
    emailAddress: 'e@mail.com',
    O: 'Org',
    OU: 'OrgUnit',
    C: 'SriLanka',
    ST: 'None',
    L: 'Central America',
  },
  extensions: {
    subjectAltName: {
      dns: ['dns1', 'dns2'],
      ips: ['163.10.5.24'],
      emailAddresses: ['pki@modusbox.live'],
      uris: ['http://modusbox.live'],
    },
  },
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

export const outboundEnrollments = [
  {
    id: 1,
    certificate: 'string',
    csr: 'string',
    state: 'CSR_LOADED',
    certInfo: CertInfo,
    csrInfo: CSRInfo,
    hubCAId: 1,
    validations: [Validation],
    validationState: 'VALID',
  },
  {
    id: 2,
    certificate: 'string',
    csr: 'string',
    state: 'NEW',
    // certInfo: CertInfo,
    csrInfo: CSRInfo,
    hubCAId: 1,
    validations: [Validation],
    validationState: 'VALID',
  },
];
