import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  AnimateFadeIn,
  Button,
  ControlIcon,
  FormInput,
  MessageBox,
  Spinner,
  Status,
} from 'components';
import { State, Dispatch } from 'store/types';
import { withMount } from 'utils/hocs';
import { States } from '../types';
import {
  getIngressError,
  getIngressUrls,
  getIngressIps,
  getIngressUrlsValidationResult,
  getIngressIpsValidationResult,
  getIsIngressPending,
  getIsIngressSubmitEnabled,
  getIsIngressSubmitPending,
  getIsIngressChanged,
} from './selectors';
import {
  requestIngressEndpoints,
  addIngressIp,
  removeIngressIp,
  changeIngressUrl,
  changeIngressAddress,
  changeIngressPort,
  addIngressPort,
  removeIngressPort,
  submitIngressEndpoints,
  undoIngressChanges,
} from './actions';

import { IngressIP, IngressURL } from './types';
import './Ingress.css';

const stateProps = (state: State) => ({
  error: getIngressError(state),
  urls: getIngressUrls(state),
  ips: getIngressIps(state),
  urlsValidation: getIngressUrlsValidationResult(state),
  ipsValidation: getIngressIpsValidationResult(state),
  isPending: getIsIngressPending(state),
  isSubmitEnabled: getIsIngressSubmitEnabled(state),
  isSubmitPending: getIsIngressSubmitPending(state),
  isChanged: getIsIngressChanged(state),
});

const actionProps = (dispatch: Dispatch) => ({
  onMount: () => dispatch(requestIngressEndpoints()),
  onAddIpClick: () => dispatch(addIngressIp()),
  onChangeUrl: (url: string, index: number) => dispatch(changeIngressUrl({ url, index })),
  onChangeAddress: (address: string, index: number) =>
    dispatch(changeIngressAddress({ address, index })),
  onChangePort: (port: string, portIndex: number, index: number) =>
    dispatch(changeIngressPort({ port, portIndex, index })),
  onAddPortClick: (index: number) => dispatch(addIngressPort({ index })),
  onRemovePortClick: (portIndex: number, index: number) =>
    dispatch(removeIngressPort({ portIndex, index })),
  onRemoveIpClick: (index: number) => dispatch(removeIngressIp({ index })),
  onSubmitClick: () => dispatch(submitIngressEndpoints()),
  onUndoClick: () => dispatch(undoIngressChanges()),
});

interface ValidationMessage {
  active?: boolean;
  message: string;
}

interface ValidationToken {
  value: string | number | undefined;
  available: boolean;
  isUndefined?: boolean;
  replaced: string;
}

interface ValidationResult {
  tokens: ValidationToken[];
  messages: ValidationMessage[];
  isValid: boolean;
  isRequired: boolean;
}

interface IngressProps {
  error: boolean;
  ips: IngressIP[];
  urls: IngressURL[];
  urlsValidation: ValidationResult[];
  ipsValidation: ValidationResult[];
  isPending: boolean;
  isSubmitEnabled: boolean;
  isSubmitPending: boolean;
  isChanged: boolean;
  onMount: () => null;
  onAddIpClick: () => null;
  onChangeUrl: (url: string, index: number) => null;
  onChangeAddress: (address: string, index: number) => null;
  onChangePort: (port: string, portIndex: number, index: number) => null;
  onAddPortClick: (index: number) => null;
  onRemovePortClick: (portIndex: number, index: number) => null;
  onRemoveIpClick: (index: number) => null;
  onSubmitClick: () => null;
  onUndoClick: () => null;
}
const Ingress: FC<IngressProps> = ({
  error,
  ips,
  urls,
  urlsValidation,
  ipsValidation,
  isPending,
  isSubmitEnabled,
  isSubmitPending,
  isChanged,
  onAddIpClick,
  onChangeUrl,
  onChangeAddress,
  onChangePort,
  onAddPortClick,
  onRemovePortClick,
  onRemoveIpClick,
  onSubmitClick,
  onUndoClick,
}) => {
  if (isPending) {
    return <Spinner center size={20} />;
  }
  if (error) {
    return (
      <MessageBox
        icon="warning-sign"
        kind="danger"
        message="There was an error while loading the endpoints"
        center
        size={30}
        fontSize={17}
      />
    );
  }
  return (
    <div>
      <div className="ingress____buttons">
        <Button
          className="ingress____button"
          label="Submit for Confirmation"
          disabled={!isSubmitEnabled}
          onClick={onSubmitClick}
          pending={isSubmitPending}
        />
        <Button
          className="ingress____button"
          label="Add Additional IP Address"
          icon="plus-small"
          noFill
          onClick={onAddIpClick}
        />
        <Button
          className="ingress____button"
          label="Undo Changes"
          disabled={!isChanged}
          onClick={onUndoClick}
          kind="secondary"
          noFill
        />
      </div>

      <div className="ingress__url__container">
        <div className="ingress__url">
          <FormInput
            type="text"
            placeholder="URL"
            value={urls[0].url}
            onChange={(value: string) => onChangeUrl(value, 0)}
            validation={urlsValidation[0]}
          />
          <div className="ingress__url__status__container">
            <Status.Endpoint state={urls[0].state} />
          </div>
        </div>
      </div>

      {ips.map((ingressIp, index) => (
        <AnimateFadeIn initial={{ y: -10 }} animate={{ y: 0 }} key={index.toString()}>
          <IngressIp
            address={ingressIp.address}
            ports={ingressIp.ports}
            state={ingressIp.state}
            onChangeAddress={onChangeAddress}
            onChangePort={onChangePort}
            onAddPort={onAddPortClick}
            onRemovePort={onRemovePortClick}
            onRemoveIp={onRemoveIpClick}
            validation={ipsValidation}
            index={index}
          />
        </AnimateFadeIn>
      ))}
    </div>
  );
};

interface IngressIPProps {
  index: number;
  state: States;
  address?: string;
  ports: (string | undefined)[];
  // TODO: Find correct validation
  // eslint-disable-next-line
  validation: any;
  onChangeAddress: (address: string, index: number) => null;
  onChangePort: (port: string, portIndex: number, index: number) => null;
  onAddPort: (index: number) => null;
  onRemovePort: (portIndex: number, index: number) => null;
  onRemoveIp: (index: number) => null;
}
const IngressIp: FC<IngressIPProps> = ({
  index,
  state,
  address,
  ports,
  validation,
  onChangeAddress,
  onChangePort,
  onAddPort,
  onRemovePort,
  onRemoveIp,
}) => (
  <div className="ingress__ip__row">
    <div className="ingress__ip__remove">
      <ControlIcon
        icon="close-small"
        size={20}
        tooltip={index === 0 ? 'The first IP cannot be removed' : 'Remove IP'}
        kind="danger"
        onClick={() => onRemoveIp(index)}
        disabled={index === 0}
      />
    </div>
    <div className="ingress__ip__controls">
      <div className="ingress__ip__fields">
        <div className="ingress__ip__address__container">
          <div className="ingress__ip__address">
            <FormInput
              type="text"
              placeholder="Ingress IP Address"
              value={address}
              onChange={(addressValue: string) => onChangeAddress(addressValue, index)}
              validation={validation[index].address}
            />
          </div>
        </div>
        {ports.map((port, portIndex) => (
          <div className="ingress__ip__port__container" key={portIndex.toString()}>
            <div className="ingress__ip__port">
              <FormInput
                type="text"
                placeholder="Port(s)"
                value={port}
                onChange={(value: string) => onChangePort(value, portIndex, index)}
                validation={validation[index].ports[portIndex]}
              />
            </div>
            {portIndex > 0 && (
              <div className="ingress__ip__port-remove">
                <ControlIcon
                  icon="close-small"
                  size={16}
                  tooltip="Remove Port"
                  kind="danger"
                  onClick={() => onRemovePort(portIndex, index)}
                  disabled={portIndex === 0}
                />
              </div>
            )}
          </div>
        ))}
        <Button
          label="Add Port"
          icon="plus-small"
          className="ingress__ip__port-add"
          onClick={() => onAddPort(index)}
          noFill
        />
      </div>
      <div className="ingress__status__container">
        <Status.Endpoint state={state} />
      </div>
    </div>
  </div>
);

const MountedIngress = withMount(Ingress, 'onMount');

export default connect(stateProps, actionProps)(MountedIngress);
