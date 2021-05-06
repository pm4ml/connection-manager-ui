import { generatePoints } from 'utils/charts';
import { TransferDirection, TransferType, TransferStatus } from 'App/types';
import { BatchStatus } from './types';

function timestamp(): string {
  return new Date().toISOString();
}

function id(): number {
  return Math.ceil(Math.random() * 1000);
}

export const reconciliationOverviewBatches = [
  {
    id: Math.ceil(Math.random() * 1000),
    status: BatchStatus.Open,
    transferCount: 2390,
    transferTotals: [
      {
        netValue: 1234,
        currency: 'USD',
      },
      {
        netValue: 2133,
        currency: 'EUR',
      },
    ],
    errorCount: 0,
    startingTimestamp: timestamp(),
    closingTimestamp: timestamp(),
  },
  {
    id: Math.ceil(Math.random() * 1000),
    status: BatchStatus.OnTrack,
    transferCount: 2390,
    transferTotals: [
      {
        netValue: 1234,
        currency: 'USD',
      },
      {
        netValue: 2133,
        currency: 'EUR',
      },
    ],
    errorCount: 0,
    startingTimestamp: timestamp(),
    closingTimestamp: timestamp(),
  },
  {
    id: Math.ceil(Math.random() * 1000),
    status: BatchStatus.HasErrors,
    transferCount: 2390,
    transferTotals: [
      {
        netValue: 1234,
        currency: 'USD',
      },
      {
        netValue: 2133,
        currency: 'EUR',
      },
    ],
    errorCount: 0,
    startingTimestamp: timestamp(),
    closingTimestamp: timestamp(),
  },
  {
    id: Math.ceil(Math.random() * 1000),
    status: BatchStatus.Overdue,
    transferCount: 2390,
    transferTotals: [
      {
        netValue: 1234,
        currency: 'USD',
      },
      {
        netValue: 2133,
        currency: 'EUR',
      },
    ],
    errorCount: 0,
    startingTimestamp: timestamp(),
    closingTimestamp: timestamp(),
  },
  {
    id: Math.ceil(Math.random() * 1000),
    status: BatchStatus.HasErrors,
    transferCount: 2390,
    transferTotals: [
      {
        netValue: 1234,
        currency: 'USD',
      },
      {
        netValue: 2133,
        currency: 'EUR',
      },
    ],
    errorCount: 0,
    startingTimestamp: timestamp(),
    closingTimestamp: timestamp(),
  },
  {
    id: Math.ceil(Math.random() * 1000),
    status: BatchStatus.Open,
    transferCount: 2390,
    transferTotals: [
      {
        netValue: 1234,
        currency: 'USD',
      },
      {
        netValue: 2133,
        currency: 'EUR',
      },
    ],
    errorCount: 0,
    startingTimestamp: timestamp(),
    closingTimestamp: timestamp(),
  },
];

export const reconciliationOverviewBatchTransfer = [
  {
    id: id(),
    institution: 'DFSP 2',
    direction: TransferDirection.Inbound,
    type: TransferType.P2P,
    transfers: 2390,
    value: '$5430',
    status: TransferStatus.Success,
    initiatedTimestamp: timestamp(),
  },
  {
    id: id(),
    institution: 'DFSP 3',
    direction: TransferDirection.Outbound,
    type: TransferType.P2P,
    transfers: 2390,
    value: '$5430',
    status: TransferStatus.Pending,
    initiatedTimestamp: timestamp(),
  },
  {
    id: id(),
    institution: 'DFSP 1',
    direction: TransferDirection.Inbound,
    type: TransferType.P2P,
    transfers: 2390,
    value: '$5430',
    status: TransferStatus.Error,
    initiatedTimestamp: timestamp(),
  },
  {
    id: id(),
    institution: 'DFSP 2',
    direction: TransferDirection.Outbound,
    type: TransferType.P2P,
    transfers: 2390,
    value: '$5430',
    status: TransferStatus.Error,
    initiatedTimestamp: timestamp(),
  },
];

export const reconciliationOverviewBatchTransferDetails = {
  id: id(),
  institution: 'DFSP 2',
  direction: TransferDirection.Inbound,
  type: TransferType.P2P,
  transfers: 2390,
  value: '$5430',
  status: TransferStatus.Success,
  initiatedTimestamp: timestamp(),
};

export const weeklyFlows = [
  { points: generatePoints(24 * 7, [0, 20000], 2000, 500), color: '#4fc7e7' },
  { points: generatePoints(24 * 7, [0, 20000], 2000, 500), color: '#e23a54' },
];

const reserved = generatePoints(24 * 7, [-10000, 5000], 1000, 1000);
const committed = generatePoints(24 * 7, [0, 5000], 1000, 20);
const today = committed.map(function sumValue(
  _: [number, number],
  index: number
): [number, number] {
  return [index, committed[index][1] + reserved[index][1]];
});
export const weeklyPositions = [
  { points: today, color: '#4fc7e7' },
  { points: reserved, color: '#12d670' },
  { points: committed, color: '#ff9016' },
];
