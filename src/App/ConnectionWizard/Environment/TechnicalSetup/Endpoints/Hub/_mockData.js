import { Types, Directions } from '../types';

export const hubIps = [
  {
    direction: Directions.Ingress,
    value: {
      address: '120.2.233.2',
      ports: ['9090', '2323'],
    },
    type: Types.IP,
  },
];
