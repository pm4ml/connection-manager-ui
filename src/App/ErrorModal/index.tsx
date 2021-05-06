import React, { FC } from 'react';
import { Icon, Modal } from 'components';
import './ErrorModal.css';

interface ErrorModalProps {
  isVisible: boolean;
  content?: string;
  onClose: () => void;
}
const ErrorModal: FC<ErrorModalProps> = ({ isVisible, content, onClose }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <Modal onClose={onClose} id="error-modal" kind="danger">
      <div className="error-modal__content">
        <Icon name="warning-sign" size={50} className="error-modal__icon" />
        <p className="error-modal__message">{content}</p>
      </div>
    </Modal>
  );
};

export default ErrorModal;
