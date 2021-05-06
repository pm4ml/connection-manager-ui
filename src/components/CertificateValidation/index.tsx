import React, { PureComponent, FC, SFC } from 'react';
import moment from 'moment';
import { composeClassName } from 'utils/html';
import { Button, Icon, Modal } from '@modusbox/modusbox-ui-components/dist/index';
import './index.scss';
import { CertificateValidationResults } from 'App/types';
import {
  CertificateValidationState,
  CertificateValidationModalType,
  TypeLabelByTypeMethod,
} from './types';

const VALID = 'VALID';
const INVALID = 'INVALID';
const NOT_AVAILABLE = 'NOT_AVAILABLE';
const STATES = { VALID, INVALID, NOT_AVAILABLE };

const getTypeLabelByType = (type: CertificateValidationModalType): TypeLabelByTypeMethod => {
  if (type === 'csr') {
    return { prefix: 'This', label: 'CSR', verb: 'is', haveVerb: 'has' };
  }
  if (type === 'certificate') {
    return { prefix: 'This', label: 'Certificate', verb: 'is', haveVerb: 'has' };
  }
  if (type === 'both') {
    return { prefix: 'These', label: 'CSR and Certificate', verb: 'are', haveVerb: 'have' };
  }
  if (type === 'ca') {
    return { prefix: 'This', label: 'Certificate Authority', verb: 'is', haveVerb: 'has' };
  }

  return { prefix: '', label: '', verb: '', haveVerb: '' };
};

const getIconByState = (state: string) => {
  if (state === INVALID) {
    return 'warning-sign';
  }
  if (state === VALID) {
    return 'check-small';
  }
  return 'question-mark';
};

const getMessageByStateAndType = (state: string, type: CertificateValidationModalType) => {
  const { prefix, label, verb } = getTypeLabelByType(type);

  if (state === INVALID) {
    return `${prefix} ${label} ${verb} invalid.`;
  }
  if (state === VALID) {
    return `${prefix} ${label} ${verb} valid.`;
  }
  return `The ${label} validity is unknown.`;
};

const getModalTitleByStateAndType = (state: string, type: CertificateValidationModalType) => {
  const { label } = getTypeLabelByType(type);
  if (state === INVALID) {
    return `Invalid ${label}`;
  }
  if (state === VALID) {
    return `Valid ${label}`;
  }
  return undefined;
};

const getModalKindByState = (state: string) => {
  if (state === INVALID) {
    return 'danger';
  }
  if (state === VALID) {
    return 'primary';
  }
  return undefined;
};

const getButtonKindByState = (state: string) => {
  if (state === INVALID) {
    return 'danger';
  }
  if (state === VALID) {
    return 'success';
  }
  return undefined;
};

const removeNotPerformed = (validation: CertificateValidationResults) =>
  validation.performed === true;
const hasCodeStartingWith = (strs: string[]) => (validation: CertificateValidationResults) =>
  strs.some((str) => validation.validationCode.startsWith(str));
const isCertificate = hasCodeStartingWith(['CERTIFICATE_', 'CSR_CERT_']);
const isCA = hasCodeStartingWith(['VERIFY_ROOT_', 'CA_CERTIFICATE_', 'VERIFY_CHAIN_']);
const isInvalid = (validation: CertificateValidationResults) =>
  validation.result === STATES.INVALID;

const getRealType = (validations = []) => {
  const hasSomeCACodes = validations.some(isCA);
  const hasSomeCertificatesCodes = validations.some(isCertificate);
  const hasSomeInvalidCSRsCodes = validations.some(
    (validation) => !isCertificate(validation) && !isCA(validation) && isInvalid(validation)
  );
  const hasSomeInvalidCertificatesCodes = validations.some(
    (validation) => isCertificate(validation) && isInvalid(validation)
  );

  if (hasSomeCACodes) {
    return 'ca';
  }
  if (hasSomeInvalidCSRsCodes && hasSomeInvalidCertificatesCodes) {
    return 'both';
  }
  if (hasSomeInvalidCertificatesCodes) {
    return 'certificate';
  }
  if (hasSomeInvalidCSRsCodes) {
    return 'csr';
  }
  if (hasSomeCertificatesCodes) {
    return 'certificate';
  }
  return 'csr';
};

interface CertificateValidationModalProps {
  type?: CertificateValidationModalType;
  state?: string;
  validations: CertificateValidationResults[];
  onClose?: () => void;
}

class CertificateValidation extends PureComponent<
  CertificateValidationModalProps,
  CertificateValidationState
> {
  static getDerivedStateFromProps(props: CertificateValidationModalProps) {
    // make sure the certificate validation state prop is set to one of the available
    // otherwise default to NOT_AVAILABLE in order to properly display missing or invalid data
    const validations = props.validations.filter(removeNotPerformed);
    const caState = props.state || '';
    return {
      // eslint-disable-next-line no-prototype-builtins
      state: STATES.hasOwnProperty(caState) ? caState : NOT_AVAILABLE,
      validations,
      type: props.type || getRealType(validations as never),
    };
  }

  constructor(props: CertificateValidationModalProps) {
    super(props);
    this.onViewDetailsClick = this.onViewDetailsClick.bind(this);

    this.onCloseModalClick = this.onCloseModalClick.bind(this);

    this.state = {
      isModalVisible: false,
    } as CertificateValidationState;
  }

  onViewDetailsClick() {
    this.setState({
      isModalVisible: true,
    });
  }

  onCloseModalClick() {
    this.setState({
      isModalVisible: false,
    });
  }

  render() {
    const { state, validations, type } = this.state;
    const validationClassName = composeClassName([
      'certificate-validation',
      state === VALID && 'certificate-validation--valid',
      state === INVALID && 'certificate-validation--invalid',
      state === NOT_AVAILABLE && 'certificate-validation--unavailable',
    ]);

    const icon = getIconByState(state);
    const message = getMessageByStateAndType(state, type);
    const buttonKind = getButtonKindByState(state);

    return (
      <div className={validationClassName}>
        <div className="certificate-validation__row">
          <Icon size={20} className="certificate-validation__icon" name={icon} />
          <div className="certificate-validation__message">{message}</div>
          {state !== NOT_AVAILABLE && (
            <Button
              size="s"
              label="View Details"
              kind={buttonKind}
              onClick={this.onViewDetailsClick}
            />
          )}
        </div>
        {this.state.isModalVisible && (
          <CertificateValidationModal
            type={type}
            state={state}
            validations={validations}
            onClose={this.onCloseModalClick}
          />
        )}
      </div>
    );
  }
}
const CertificateValidationModal: SFC<CertificateValidationModalProps> = ({
  type,
  state = NOT_AVAILABLE,
  validations,
  onClose,
}) => {
  const title = getModalTitleByStateAndType(state, type);
  const kind = getModalKindByState(state);

  return (
    <Modal
      title={title}
      allowClose={false}
      allowSubmit
      isSubmitEnabled
      onSubmit={onClose}
      primaryAction="Continue"
      width="800px"
      kind={kind}
    >
      <ModalTitle state={state} type={type} />
      <div>{validations.map(toValidationRow)}</div>
    </Modal>
  );
};

interface ModalTitleProps {
  state: string;
  type: CertificateValidationModalType;
}

const ModalTitle: FC<ModalTitleProps> = ({ state, type }) => {
  const modalTitleClassName = composeClassName([
    'certificate-validation__modal__title',
    state === VALID && 'certificate-validation__modal__title--valid',
    state === INVALID && 'certificate-validation__modal__title--invalid',
  ]);

  const { label, haveVerb } = getTypeLabelByType(type);

  return (
    <div className={modalTitleClassName}>
      <Icon name={getIconByState(state)} size={30} />
      <span className="certificate-validation__modal__title-text">
        The {label} {haveVerb} the following validations
      </span>
    </div>
  );
};

const toValidationRow = (validation: CertificateValidationResults, index: number) => {
  const isValid = validation.result === VALID;
  const validationItemClassName = composeClassName([
    'certificate-validation__modal__item',
    isValid && 'certificate-validation__modal__item--valid',
    !isValid && 'certificate-validation__modal__item--invalid',
  ]);
  const icon = isValid ? 'check-small' : 'close-small';
  const message = parseValidation(validation);
  return (
    <div key={index} className={validationItemClassName}>
      <Icon size={26} className="certificate-validation__modal__item-icon" name={icon} />
      <div className="certificate-validation__modal__item-message">{message}</div>
    </div>
  );
};

const parseValidation = (validation: CertificateValidationResults): string => {
  const { message, messageTemplate, data } = validation;
  if (messageTemplate === '') {
    return message;
  }
  // find all the template literals
  const regex = /\${data\.([a-zA-Z.]+)}/g;
  const results = messageTemplate.match(regex);
  const replacements = (results || []).map((result: string) => {
    const match = result.match(/(\w+)/g);

    if (match) {
      const key: string = match[1];
      // @ts-ignore TODO fix the below
      const currentDataKey = data[key];
      const { type, value } = currentDataKey;

      if (type === 'DATE') {
        return moment(value).format('lll z');
      }
      return value;
    }
    return '';
  });
  return messageTemplate.replace(regex, () => replacements?.pop() || '');
};
export default CertificateValidation;
