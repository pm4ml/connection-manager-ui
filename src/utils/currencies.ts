const currTable: { [curr: string]: { unicode: string | undefined; symbol: string | undefined } } = {
  // TODO: Add missing: INR | TRY
  ALL: { unicode: '4c, 65, 6b', symbol: undefined },
  AFN: { unicode: '60b', symbol: undefined },
  ARS: { unicode: '24', symbol: undefined },
  AWG: { unicode: '192', symbol: undefined },
  AUD: { unicode: '24', symbol: undefined },
  AZN: { unicode: '20bc', symbol: undefined },
  BSD: { unicode: '24', symbol: undefined },
  BBD: { unicode: '24', symbol: undefined },
  BYN: { unicode: '42, 72', symbol: undefined },
  BZD: { unicode: '42, 5a, 24', symbol: undefined },
  BMD: { unicode: '24', symbol: undefined },
  BOB: { unicode: '24, 62', symbol: undefined },
  BAM: { unicode: '4b, 4d', symbol: undefined },
  BWP: { unicode: '50', symbol: undefined },
  BGN: { unicode: '43b, 432', symbol: undefined },
  BRL: { unicode: '52, 24', symbol: undefined },
  BND: { unicode: '24', symbol: undefined },
  KHR: { unicode: '17db', symbol: undefined },
  CAD: { unicode: '24', symbol: undefined },
  KYD: { unicode: '24', symbol: undefined },
  CLP: { unicode: '24', symbol: undefined },
  CNY: { unicode: 'a5', symbol: undefined },
  COP: { unicode: '24', symbol: undefined },
  CRC: { unicode: '20a1', symbol: undefined },
  HRK: { unicode: '6b, 6e', symbol: undefined },
  CUP: { unicode: '20b1', symbol: undefined },
  CZK: { unicode: '4b, 10d', symbol: undefined },
  DKK: { unicode: '6b, 72', symbol: undefined },
  DOP: { unicode: '52, 44, 24', symbol: undefined },
  XCD: { unicode: '24', symbol: undefined },
  EGP: { unicode: 'a3', symbol: undefined },
  SVC: { unicode: '24', symbol: undefined },
  EUR: { unicode: '20ac', symbol: undefined },
  FKP: { unicode: 'a3', symbol: undefined },
  FJD: { unicode: '24', symbol: undefined },
  GHS: { unicode: 'a2', symbol: undefined },
  GIP: { unicode: 'a3', symbol: undefined },
  GTQ: { unicode: '51', symbol: undefined },
  GGP: { unicode: 'a3', symbol: undefined },
  GYD: { unicode: '24', symbol: undefined },
  HNL: { unicode: '4c', symbol: undefined },
  HKD: { unicode: '24', symbol: undefined },
  HUF: { unicode: '46, 74', symbol: undefined },
  ISK: { unicode: '6b, 72', symbol: undefined },
  IDR: { unicode: '52, 70', symbol: undefined },
  IRR: { unicode: 'fdfc', symbol: undefined },
  IMP: { unicode: 'a3', symbol: undefined },
  ILS: { unicode: '20aa', symbol: undefined },
  JMD: { unicode: '4a, 24', symbol: undefined },
  JPY: { unicode: 'a5', symbol: undefined },
  JEP: { unicode: 'a3', symbol: undefined },
  KZT: { unicode: '43b, 432', symbol: undefined },
  KPW: { unicode: '20a9', symbol: undefined },
  KRW: { unicode: '20a9', symbol: undefined },
  KGS: { unicode: '43b, 432', symbol: undefined },
  LAK: { unicode: '20ad', symbol: undefined },
  LBP: { unicode: 'a3', symbol: undefined },
  LRD: { unicode: '24', symbol: undefined },
  MKD: { unicode: '434, 435, 43d', symbol: undefined },
  MYR: { unicode: '52, 4d', symbol: undefined },
  MUR: { unicode: '20a8', symbol: undefined },
  MXN: { unicode: '24', symbol: undefined },
  MNT: { unicode: '20ae', symbol: undefined },
  MZN: { unicode: '4d, 54', symbol: undefined },
  NAD: { unicode: '24', symbol: undefined },
  NPR: { unicode: '20a8', symbol: undefined },
  ANG: { unicode: '192', symbol: undefined },
  NZD: { unicode: '24', symbol: undefined },
  NIO: { unicode: '43, 24', symbol: undefined },
  NGN: { unicode: '20a6', symbol: undefined },
  NOK: { unicode: '6b, 72', symbol: undefined },
  OMR: { unicode: 'fdfc', symbol: undefined },
  PKR: { unicode: '20a8', symbol: undefined },
  PAB: { unicode: '42, 2f, 2e', symbol: undefined },
  PYG: { unicode: '47, 73', symbol: undefined },
  PEN: { unicode: '53, 2f, 2e', symbol: undefined },
  PHP: { unicode: '20b1', symbol: undefined },
  PLN: { unicode: '7a, 142', symbol: undefined },
  QAR: { unicode: 'fdfc', symbol: undefined },
  RON: { unicode: '6c, 65, 69', symbol: undefined },
  RUB: { unicode: '20bd', symbol: undefined },
  SHP: { unicode: 'a3', symbol: undefined },
  SAR: { unicode: 'fdfc', symbol: undefined },
  RSD: { unicode: '414, 438, 43d, 2e', symbol: undefined },
  SCR: { unicode: '20a8', symbol: undefined },
  SGD: { unicode: '24', symbol: undefined },
  SBD: { unicode: '24', symbol: undefined },
  SOS: { unicode: '53', symbol: undefined },
  ZAR: { unicode: '52', symbol: undefined },
  XOF: { unicode: undefined, symbol: 'CAF' },
  LKR: { unicode: '20a8', symbol: undefined },
  SEK: { unicode: '6b, 72', symbol: undefined },
  CHF: { unicode: '43, 48, 46', symbol: undefined },
  SRD: { unicode: '24', symbol: undefined },
  SYP: { unicode: 'a3', symbol: undefined },
  TWD: { unicode: '4e, 54, 24', symbol: undefined },
  THB: { unicode: 'e3f', symbol: undefined },
  TTD: { unicode: '54, 54, 24', symbol: undefined },
  TVD: { unicode: '24', symbol: undefined },
  UAH: { unicode: '20b4', symbol: undefined },
  GBP: { unicode: 'a3', symbol: undefined },
  USD: { unicode: '24', symbol: undefined },
  UYU: { unicode: '24, 55', symbol: undefined },
  UZS: { unicode: '43b, 432', symbol: undefined },
  VEF: { unicode: '42, 73', symbol: undefined },
  VND: { unicode: '20ab', symbol: undefined },
  YER: { unicode: 'fdfc', symbol: undefined },
  ZWD: { unicode: '5a, 24', symbol: undefined },
  MAD: { unicode: '2e, 62f, 2e, 645', symbol: undefined },
};

export function getCurrencySymbol(currency: string) {
  const reference = currTable[currency];
  if (!reference) {
    return '';
  }
  if (!reference.unicode) {
    return reference.symbol;
  }
  return reference.unicode
    .split(', ')
    .map((unicode) => {
      return String.fromCharCode(Number(`0x${unicode.padStart(4, '0')}`));
    })
    .join('');
}

export interface CurrencyValue {
  netValue: number;
  currency: string;
}

export function getCurrencyValue(targetCurrency: string) {
  return function findCurrencyValue(values: CurrencyValue[]): string | undefined {
    const currencyValue = values.find((total) => total.currency === targetCurrency);
    if (!currencyValue) {
      return undefined;
    }
    return `${getCurrencySymbol(currencyValue.currency)} ${currencyValue.netValue}`;
  };
}

export function getFirstCurrencyValue(targetCurrencies: string[]) {
  return function findFirstCurrencyValue(values: CurrencyValue[]): string | undefined {
    let currencyValue;
    targetCurrencies.some((curr) => {
      currencyValue = getCurrencyValue(curr)(values);
      return currencyValue;
    });
    return currencyValue;
  };
}
