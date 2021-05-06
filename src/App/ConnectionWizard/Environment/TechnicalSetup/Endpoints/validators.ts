import { createValidator } from '@modusbox/modusbox-ui-components/dist/redux-validation';

const isNumberBetween = (lower: number, higher: number) => (value: string | number) =>
  value !== '' && !isNaN(value as number) && value >= lower && value <= higher;
const isSubnet = isNumberBetween(0, 32);
const isPort = isNumberBetween(0, 65535);

// Tests for a valida Host
// eslint-disable-next-line max-len
const hostRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
const hostValidator = createValidator(
  'It must be a valid Host',
  (value: string | undefined) => value !== undefined && hostRegex.test(value)
);

// Tests for a valid DNS address
// eslint-disable-next-line max-len
const DNSRegex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/;
const DNSValidator = createValidator(
  'It must be a valid DNS',
  (value: string | undefined) => value !== undefined && DNSRegex.test(value)
);

// Tests for a valid HTTP / HTTPS URL
// eslint-disable-next-line max-len
const URLRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
const URLValidator = createValidator(
  'It must be a valid URL',
  (value: string | undefined) => value !== undefined && URLRegex.test(value)
);

// Tests for a valid IPv4 Address
// eslint-disable-next-line max-len
const IPRegex = /^(([1-9]?\d|1\d\d|25[0-5]|2[0-4]\d)\.){3}([1-9]?\d|1\d\d|25[0-5]|2[0-4]\d)$/;
const IPAddressValidator = createValidator(
  'It must be a valid IP Address',
  (value: string | undefined) => {
    if (!value) {
      return false;
    }
    const [address, subnet] = value.split('/');
    const isValidAddress = IPRegex.test(address);
    const isValidSubnet = subnet === undefined || isSubnet(subnet);
    return isValidAddress && isValidSubnet;
  }
);

const portValidator = createValidator(
  'It must be a valid port / ports range',
  (value: string | undefined) => {
    if (!value) {
      return false;
    }
    const ports = value.split('-');
    const isValidPortCount = ports.length === 1 || ports.length === 2;
    const isValidPortNum = ports.every(isPort);
    const isValidPortRange =
      ports.length === 2 ? parseInt(ports[1], 10) > parseInt(ports[0], 10) : true;
    return isValidPortCount && isValidPortNum && isValidPortRange;
  }
);

export { hostValidator, DNSValidator, URLValidator, IPAddressValidator, portValidator };
