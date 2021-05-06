export const environments = [
  { id: '1', name: 'qa' },
  { id: '2', name: 'test' },
];

export const getEnvironmentStatus = (id) => [
  {
    phase: 'BUSINESS_SETUP',
    steps: [
      {
        identifier: 'ID_GENERATION',
        status: 'COMPLETED',
      },
    ],
  },
  {
    phase: 'TECHNICAL_SETUP',
    steps: [
      {
        identifier: 'ENDPOINTS',
        status: 'COMPLETED',
      },
      {
        identifier: 'CSR_EXCHANGE',
        status: 'IN_PROGRESS',
      },
      {
        identifier: 'CERTIFICATE_AUTHORITY',
        status: 'COMPLETED',
      },
      {
        identifier: 'SERVER_CERTIFICATES_EXCHANGE',
        status: 'COMPLETED',
      },
      {
        identifier: 'JWS_CERTIFICATES',
        status: 'COMPLETED',
      },
    ],
  },
];
