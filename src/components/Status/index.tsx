import React, { FC } from 'react';
import { composeClassName } from 'utils/html';
import './Status.css';

const UNSET = 'UNSET';
const NEW = 'NEW';
const CONFIRMED = 'CONFIRMED';
const CSR_LOADED = 'CSR_LOADED';
const CERT_SIGNED = 'CERT_SIGNED';
const INVALID = 'INVALID';
const VALID = 'VALID';

enum Leds {
  Gray = 'gray',
  Green = 'green',
  Yellow = 'yellow',
  Blue = 'blue',
  Red = 'red',
}

const getStateClassname = (state: string, type: string) => {
  const states = {
    [`ENDPOINT_${UNSET}`]: Leds.Gray,
    [`ENDPOINT_${NEW}`]: Leds.Yellow,
    [`ENDPOINT_${CONFIRMED}`]: Leds.Green,
    [`CSR_${NEW}`]: Leds.Yellow,
    [`CSR_${CSR_LOADED}`]: Leds.Yellow,
    [`CSR_${CERT_SIGNED}`]: Leds.Green,
    [`CSR_${INVALID}`]: Leds.Red,
    [`CSR_${VALID}`]: Leds.Green,
  };
  return states[`${type}_${state}`] || Leds.Gray;
};

const getStateMessage = (state: string, type: string) => {
  const states = {
    [`ENDPOINT_${UNSET}`]: 'Not yet sent for processing',
    [`ENDPOINT_${NEW}`]: 'Awaiting Processing',
    [`ENDPOINT_${CONFIRMED}`]: 'Processed and Confirmed',
    ENDPOINT_UNAVAILABLE: 'Unable to get Endpoint Status',
    [`CSR_${NEW}`]: 'Not sure',
    [`CSR_${CSR_LOADED}`]: 'CSR created',
    [`CSR_${CERT_SIGNED}`]: 'Certificate created',
    [`CSR_${INVALID}`]: 'CSR Invalid',
    [`CSR_${VALID}`]: 'Certificate Validated',
    CSR_UNAVAILABLE: 'Unable to get CSR Status',
  };
  return states[`${type}_${state}`] || states[`${type}_UNAVAILABLE`] || 'Unable to get Status';
};

interface StatusComponentProps {
  state: string;
  type: string;
}
const StatusComponent: FC<StatusComponentProps> = ({ state, type }) => {
  const className = composeClassName([
    'status__info__led',
    `status__info__led--${getStateClassname(state, type)}`,
  ]);
  const message = getStateMessage(state, type);
  return (
    <div className="status__info">
      <div className="status__info__label">Status: </div>
      <div className={className} />
      <div className="status__info__text">{message}</div>
    </div>
  );
};

interface CSRProps {
  state: string;
}

const CSR: FC<CSRProps> = ({ state }) => <StatusComponent state={state} type="CSR" />;
interface EndpointProps {
  state: string;
}

const Endpoint: FC<EndpointProps> = ({ state }) => (
  <StatusComponent state={state} type="ENDPOINT" />
);

const Status = { Endpoint, CSR };

export default Status;
