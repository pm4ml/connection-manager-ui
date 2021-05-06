import moment from 'moment';
import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';
import { ReconciliationOverviewBatch, BatchStatus } from './types';

export function statusToClassName(status: BatchStatus): string {
  const states = {
    [BatchStatus.Open]: 'open',
    [BatchStatus.OnTrack]: 'on-track',
    [BatchStatus.HasErrors]: 'has-errors',
    [BatchStatus.Overdue]: 'overdue',
  };
  return states[status];
}

interface StatusMap {
  open: number;
  onTrack: number;
  hasErrors: number;
  overdue: number;
}

export function getAllStatusCount(items: ReconciliationOverviewBatch[]): StatusMap {
  function countStatus(overviewBatches: ReconciliationOverviewBatch[], status: BatchStatus) {
    return overviewBatches.reduce((total: number, item: ReconciliationOverviewBatch): number => {
      return total + (item.status === status ? 1 : 0);
    }, 0);
  }
  return {
    open: countStatus(items, BatchStatus.Open),
    onTrack: countStatus(items, BatchStatus.OnTrack),
    hasErrors: countStatus(items, BatchStatus.HasErrors),
    overdue: countStatus(items, BatchStatus.Overdue),
  };
}

export function toDashboardDate(timestamp: string | undefined): string | undefined {
  if (!timestamp) {
    return undefined;
  }
  return moment(timestamp).format('DD/MM/YYYY LT z');
}

export function toSpacedPascalCase(str: string): string {
  return startCase(camelCase(str));
}

export function generateDailyTimeLabels(count: number) {
  return new Array(count).fill(0).map((_, index) =>
    moment()
      .subtract(index + 1, 'days')
      .format('MM/DD/YYYY')
  );
}

interface Mapping<T> {
  color: string;
  key: keyof T;
}

// eslint-disable-next-line
export function toLineChartData(items: any, mappings: any) {
  // eslint-disable-next-line
  return mappings.map((mapping: any) => ({
    color: mapping.color,
    // eslint-disable-next-line
    points: items.map((flow: any, index: number) => [index, parseInt(flow[mapping.key])]),
  }));
}
