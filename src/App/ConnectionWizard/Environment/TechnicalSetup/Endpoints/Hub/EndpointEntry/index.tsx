import React, { FC } from 'react';
import { Types } from '../../types';
import { HubEndpointAddress, HubEndpointURL, HubEndpointValue } from '../types';
import './EndpointEntry.css';

interface EndpointDetailProps {
  title: string;
  value: string;
}

const EndpointDetail: FC<EndpointDetailProps> = ({ title, value }) => (
  <div className="endpoint__entry__detail">
    <span className="endpoint__entry__title">{title}:</span>
    <span className="endpoint__entry__value">{value}</span>
  </div>
);

interface AddressDetailsProps {
  value: HubEndpointAddress;
}

const AddressDetails: FC<AddressDetailsProps> = ({ value }) => (
  <>
    <EndpointDetail title="IP" value={value.address} key="address" />
    <EndpointDetail
      title={`Port${value.ports.length > 1 ? 's' : ''}`}
      value={value.ports.join(', ')}
      key="ports"
    />
  </>
);

interface URLDetailsProps {
  value: HubEndpointURL;
}

const URLDetails: FC<URLDetailsProps> = ({ value }) => (
  <EndpointDetail title="URL" value={value.url} />
);

interface EndpointEntryProps {
  type: Types;
  value: HubEndpointValue;
}

const EndpointEntry: FC<EndpointEntryProps> = ({ type, value }) => (
  <div className="endpoint__entry">
    {type === Types.IP ? (
      <AddressDetails value={value as HubEndpointAddress} />
    ) : (
      <URLDetails value={value as HubEndpointURL} />
    )}
  </div>
);

export default EndpointEntry;
