import React, { FC } from 'react';
import { FormInput, Pill, ErrorBox } from 'components';
import { connect } from 'react-redux';
import { State } from 'store/types';
import { ErrorMessage, ValidationResults } from 'App/types';
import { DFSP } from 'App/ConnectionWizard/Environment/Main/types';
import { getIsDfspReadPending } from 'App/ConnectionWizard/selectors';
import * as selectors from './selectors';
import './DfspConfig.css';

interface DfspConfigProps {
  dfspConfig?: DFSP;
  dfspConfigError: ErrorMessage;
  dfspConfigValidationResult: ValidationResults;
  isDfspReadPending: boolean;
}

const stateProps = (state: State) => ({
  dfspConfig: selectors.getDfspConfig(state),
  dfspConfigError: selectors.getDfspConfigError(state),
  dfspConfigValidationResult: selectors.DfspModelValidationResult(state),
  isDfspReadPending: getIsDfspReadPending(state),
});

const DfspConfig: FC<DfspConfigProps> = ({
  dfspConfig,
  dfspConfigError,
  dfspConfigValidationResult,
  isDfspReadPending,
}) => {
  if (dfspConfigError) {
    return <ErrorBox>DfspConfig ID Generator: Unable to load data</ErrorBox>;
  }

  return (
    <div className="basic-dfsp-config__container">
      <Pill
        icon="info-small"
        label="This is set by the Hub and cannot be edited by the DFSP"
        kind="tertiary"
      />

      <div className="basic-dfsp-config__fields">
        <FormInput
          size="l"
          disabled
          value={dfspConfig?.name}
          type="text"
          label="DFSP Name"
          name="DFSPName"
          validation={dfspConfigValidationResult.fields.name}
          pending={isDfspReadPending}
        />
      </div>

      <div className="basic-dfsp-config__fields">
        <FormInput
          size="l"
          disabled
          value={dfspConfig?.id}
          type="text"
          label="DFSP ID"
          name="DFSPID"
          validation={dfspConfigValidationResult.fields.id}
          pending={isDfspReadPending}
        />
      </div>
    </div>
  );
};

export default connect(stateProps)(DfspConfig);
