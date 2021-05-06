import _isEqual from 'lodash/isEqual';

type AnyValue = boolean | number | string | null | undefined | object;
// eslint-disable-next-line
const isDefined = (value: AnyValue): boolean => value !== undefined;

// eslint-disable-next-line
const isUndefined = (value: AnyValue): boolean => value === undefined;

// eslint-disable-next-line
const isEqual = (a: AnyValue, b: AnyValue): boolean => _isEqual(a, b);

// eslint-disable-next-line
const isNotEqual = (a: AnyValue, b: AnyValue): boolean => !_isEqual(a, b);
const isNil = (value: AnyValue): boolean => value === undefined || value === null;
const isNotNil = (value: AnyValue): boolean => value !== undefined && value !== null;

const isNotNilNorEmpty = (value: AnyValue): boolean =>
  value !== undefined && value !== null && value !== '';

const isNotEmptyCollection = (collection: AnyValue[]): boolean => collection.length > 0;

const getAnyIs = (value: AnyValue) => (...args: AnyValue[]): boolean =>
  args.some((arg) => arg === value);
const getAllAre = (value: AnyValue) => (...args: AnyValue[]): boolean =>
  args.every((arg) => arg === value);
const getAnyIsDefined = (...args: AnyValue[]): boolean => args.some(isDefined);
const getAnyIsNotNil = (...args: AnyValue[]): boolean => args.some(isNotNil);

const not = {};

export {
  getAnyIs,
  getAllAre,
  getAnyIsDefined,
  getAnyIsNotNil,
  isNotEqual,
  isDefined,
  isNil,
  isNotNil,
  isUndefined,
  isEqual,
  isNotEmptyCollection,
  isNotNilNorEmpty,
  not,
};
