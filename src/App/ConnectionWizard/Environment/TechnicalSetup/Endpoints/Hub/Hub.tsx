import React, { FC } from 'react';
import { connect } from 'react-redux';
import { MessageBox, Spinner } from 'components';
import { State, Dispatch } from 'store/types';
import { withMount } from 'utils/hocs';
import { ErrorMessage } from 'App/types';
import EndpointEntry from './EndpointEntry';
import './Hub.css';

import {
  getIsHubEndpointsReadPending,
  getHubEndpointsEgressEndpoints,
  getHubEndpointsEgressEndpointsError,
  getHubEndpointsIngressEndpoints,
  getHubEndpointsIngressEndpointsError,
} from './selectors';
import { requestHubEndpoints } from './actions';
import { EgressHubEndpoint, IngressHubEndpoint } from './types';

const stateProps = (state: State) => ({
  isEndpointsPending: getIsHubEndpointsReadPending(state),
  egressEndpoints: getHubEndpointsEgressEndpoints(state),
  egressEndpointsError: getHubEndpointsEgressEndpointsError(state),
  ingressEndpoints: getHubEndpointsIngressEndpoints(state),
  ingressEndpointsError: getHubEndpointsIngressEndpointsError(state),
});

const actionProps = (dispatch: Dispatch) => ({
  onMount: () => dispatch(requestHubEndpoints()),
});

interface HubEndpointsProps {
  isEndpointsPending: boolean;
  egressEndpoints: EgressHubEndpoint[];
  ingressEndpoints: IngressHubEndpoint[];
  egressEndpointsError: ErrorMessage;
  ingressEndpointsError: ErrorMessage;
}

const HubEndpoints: FC<HubEndpointsProps> = ({
  isEndpointsPending,
  egressEndpoints,
  ingressEndpoints,
  egressEndpointsError,
  ingressEndpointsError,
}) => {
  let content = null;
  if (egressEndpointsError || ingressEndpointsError) {
    content = (
      <MessageBox
        icon="warning-sign"
        kind="danger"
        message="There was an error while loading the endpoints"
        center
        size={30}
        fontSize={17}
      />
    );
  } else if (isEndpointsPending) {
    content = <HubEndpointsLoader />;
  } else if (!egressEndpoints.length && !ingressEndpoints.length) {
    content = (
      <MessageBox
        icon="info-small"
        kind="default"
        message="There are no endpoints"
        size={30}
        fontSize={17}
        center
      />
    );
  } else {
    content = (
      <div className="hub-endpoints__row">
        <div className="hub-endpoints__header">
          <div className="hub-endpoints__header__names">
            <div className="hub-endpoints__hub-name">HUB NAME</div>
          </div>
        </div>
        <div className="hub-endpoints__body">
          <HubEndpointsSection title="Egress Endpoints" endpoints={egressEndpoints} />
          <HubEndpointsSection title="Ingress Endpoints" endpoints={ingressEndpoints} />
        </div>
        <div className="hub-endpoints__footer" />
      </div>
    );
  }

  return content;
};

const HubEndpointsLoader = () => <Spinner center size={20} />;

interface HubEndpointsSectionProps {
  title: string;
  endpoints: EgressHubEndpoint[] | IngressHubEndpoint[];
}

const HubEndpointsSection: FC<HubEndpointsSectionProps> = ({ title, endpoints }) => (
  <div className="hub-endpoints__body__section">
    <div className="hub-endpoints__body__section__title">{title}</div>
    <div>
      {endpoints.map((endpoint, index) => (
        <EndpointEntry type={endpoint.type} value={endpoint.value} key={index.toString()} />
      ))}
    </div>
  </div>
);

const MountedHubEndpoints = withMount(HubEndpoints, 'onMount');
export default connect(stateProps, actionProps)(MountedHubEndpoints);
