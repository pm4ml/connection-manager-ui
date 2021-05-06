// import moment from 'moment';
import camelCase from 'lodash/camelCase';
import startCase from 'lodash/startCase';
import groupBy from 'lodash/groupBy';
import ColorScheme from 'color-scheme';
import { TransferError } from './types';

export function toTransfersDate(ISODateString: string): string {
  return ISODateString; // moment(ISODateString).format('DD/MM/YYYY LT z');
}

export function toSpacedPascalCase(str: string): string {
  return startCase(camelCase(str));
}

interface ErrorCount {
  value: number;
  label: string;
  color: string;
}
export function getErrorsByType(errors: TransferError[]): ErrorCount[] {
  const colors = generateColors();
  return Object.entries(groupBy(errors, 'errorType')).map(([type, items], index) => ({
    label: toSpacedPascalCase(type),
    value: items.length,
    color: colors[index % colors.length],
  }));
}

export function generateColors() {
  const scm = new ColorScheme();
  return scm
    .from_hue(370)
    .scheme('analogic')
    .distance(0.1)
    .variation('pastel')
    .colors()
    .map((color: string) => `#${color}`);
}
