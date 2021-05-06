import { generatePoints, generatePercPoints } from 'utils/charts';
import { TransferType } from 'App/types';
import { ErrorDirection, ErrorType } from './types';

function timestamp() {
  return new Date().toISOString();
}

function id() {
  return Math.ceil(Math.random() * 1000);
}

export const transfersErrors = [
  {
    id: id(),
    institution: 'DFSP 1',
    direction: ErrorDirection.Inbound,
    type: TransferType.P2P,
    value: '523$',
    errorType: ErrorType.FromHub,
    committedDate: timestamp(),
  },
  {
    id: id(),
    institution: 'DFSP 1',
    direction: ErrorDirection.Inbound,
    type: TransferType.P2P,
    value: '523$',
    errorType: ErrorType.FromHub,
    committedDate: timestamp(),
  },
  {
    id: id(),
    institution: 'DFSP 1',
    direction: ErrorDirection.Inbound,
    type: TransferType.P2P,
    value: '523$',
    errorType: ErrorType.FromHub,
    committedDate: timestamp(),
  },
  {
    id: id(),
    institution: 'DFSP 1',
    direction: ErrorDirection.Inbound,
    type: TransferType.P2P,
    value: '523$',
    errorType: ErrorType.FromHub,
    committedDate: timestamp(),
  },
];

export const successfulPercs = [
  { points: generatePercPoints((24 * 60) / 2, 100, 40, 0.01), color: '#4fc7e7' },
];
export const avgTimes = [
  { points: generatePoints((24 * 60) / 2, [2000, 5000], 150, 300), color: '#4fc7e7' },
];
