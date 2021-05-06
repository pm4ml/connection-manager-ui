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
  getEgressError,
  getEgressIps,
  getEgressIpsValidationResult,
  getIsEgressPending,
  getIsEgressSubmitEnabled,
  getIsEgressSubmitPending,
  getIsEgressChanged,
} from './selectors';
import {
  requestEgressEndpoints,
  addEgressIp,
  removeEgressIp,
  changeEgressAddress,
  changeEgressPort,
  addEgressPort,
  removeEgressPort,
  submitEgressEndpoints,
  undoEgressChanges,
} from './actions';

import { EgressIP } from './types';
import './Egress.css';

const stateProps = (state: State) => ({
  error: getEgressError(state),
  ips: getEgressIps(state),
  ipsValidation: getEgressIpsValidationResult(state),
  isPending: getIsEgressPending(state),
  isSubmitEnabled: getIsEgressSubmitEnabled(state),
  isSubmitPending: getIsEgressSubmitPending(state),
  isChanged: getIsEgressChanged(state),
});

const actionProps = (dispatch: Dispatch) => ({
  onMount: () => dispatch(requestEgressEndpoints()),
  onAddIpClick: () => dispatch(addEgressIp()),
  onChangeAddress: (address: string, index: number) =>
    dispatch(changeEgressAddress({ address, index })),
  onChangePort: (port: string, portIndex: number, index: number) =>
    dispatch(changeEgressPort({ port, portIndex, index })),
  onAddPortClick: (index: number) => dispatch(addEgressPort({ index })),
  onRemovePortClick: (portIndex: number, index: number) =>
    dispatch(removeEgressPort({ portIndex, index })),
  onRemoveIpClick: (index: number) => dispatch(removeEgressIp({ index })),
  onSubmitClick: () => dispatch(submitEgressEndpoints()),
  onUndoClick: () => dispatch(undoEgressChanges()),
});

interface EgressProps {
  error: boolean;
  ips: EgressIP[];
  // TODO: Find correct validation
  // eslint-disable-next-line
  ipsValidation: any;
  isPending: boolean;
  isSubmitEnabled: boolean;
  isSubmitPending: boolean;
  isChanged: boolean;
  onMount: () => null;
  onAddIpClick: () => null;
  onChangeAddress: (address: string, index: number) => null;
  onChangePort: (port: string, portIndex: number, index: number) => null;
  onAddPortClick: (index: number) => null;
  onRemovePortClick: (portIndex: number, index: number) => null;
  onRemoveIpClick: (index: number) => null;
  onSubmitClick: () => null;
  onUndoClick: () => null;
}
const Egress: FC<EgressProps> = ({
  error,
  ips,
  ipsValidation,
  isPending,
  isSubmitEnabled,
  isSubmitPending,
  isChanged,
  onAddIpClick,
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
      <div className="egress____buttons">
        <Button
          className="egress____button"
          label="Submit for Confirmation"
          disabled={!isSubmitEnabled}
          onClick={onSubmitClick}
          pending={isSubmitPending}
        />
        <Button
          className="egress____button"
          label="Add Additional IP Address"
          icon="plus-small"
          noFill
          onClick={onAddIpClick}
        />
        <Button
          className="egress____button"
          label="Undo Changes"
          disabled={!isChanged}
          onClick={onUndoClick}
          kind="secondary"
          noFill
        />
      </div>
      {ips.map((egressIp, index) => (
        <AnimateFadeIn initial={{ y: -10 }} animate={{ y: 0 }} key={index.toString()}>
          <EgressIp
            address={egressIp.address}
            ports={egressIp.ports}
            state={egressIp.state}
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

interface EgressIPProps {
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
const EgressIp: FC<EgressIPProps> = ({
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
  <div className="egress__ip__row">
    <div className="egress__ip__remove">
      <ControlIcon
        icon="close-small"
        size={20}
        tooltip={index === 0 ? 'The first IP cannot be removed' : 'Remove IP'}
        kind="danger"
        onClick={() => onRemoveIp(index)}
        disabled={index === 0}
      />
    </div>
    <div className="egress__ip__controls">
      <div className="egress__ip__fields">
        <div className="egress__ip__address__container">
          <div className="egress__ip__address">
            <FormInput
              type="text"
              placeholder="Egress IP Address"
              value={address}
              onChange={(addressValue: string) => onChangeAddress(addressValue, index)}
              validation={validation[index].address}
            />
          </div>
        </div>
        {ports.map((port, portIndex) => (
          <div className="egress__ip__port__container" key={portIndex.toString()}>
            <div className="egress__ip__port">
              <FormInput
                type="text"
                placeholder="Port(s)"
                value={port}
                onChange={(value: string) => onChangePort(value, portIndex, index)}
                validation={validation[index].ports[portIndex]}
              />
            </div>
            {portIndex > 0 && (
              <div className="egress__ip__port-remove">
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
          className="egress__ip__port-add"
          onClick={() => onAddPort(index)}
          noFill
        />
      </div>
      <div className="egress__status__container">
        <Status.Endpoint state={state} />
      </div>
    </div>
  </div>
);

const MountedEgress = withMount(Egress, 'onMount');

export default connect(stateProps, actionProps)(MountedEgress);
