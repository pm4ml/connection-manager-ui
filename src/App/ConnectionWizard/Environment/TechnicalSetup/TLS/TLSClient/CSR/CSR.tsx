import React, { FC } from 'react';
import { Button, CertificateModal, FileControls, FormInput } from 'components';
import connectors from './connectors';

import './index.css';

interface CSRProps {
  certificate?: string | null;
  isModalVisible: boolean;
  isSubmitEnabled: boolean;
  isSubmitPending: boolean;
  isAutogeneratePending: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onAutogenerateClick: () => void;
  onViewClick: () => void;
  onModalCloseClick: () => void;
}

const CSR: FC<CSRProps> = ({
  certificate,
  isModalVisible,
  isSubmitEnabled,
  isSubmitPending,
  isAutogeneratePending,
  onChange,
  onAutogenerateClick,
  onSubmit,
  onViewClick,
  onModalCloseClick,
}) => {
  return (
    <div className="csr">
      <div>
        <Button
          className="csr__submit"
          label="Submit"
          icon="check-small"
          onClick={onSubmit}
          pending={isSubmitPending}
          disabled={!isSubmitEnabled}
        />

        <Button
          className="csr__autogenerate"
          label="Auto generate"
          icon="check-small"
          onClick={onAutogenerateClick}
          pending={isAutogeneratePending}
        />
      </div>

      <div className="csr__csr">
        <FormInput
          type="file"
          label="CSR"
          parseFileAsText
          onChange={onChange}
          elementWidth="400px"
          value={certificate}
          required
        />
        {certificate && <FileControls onViewClick={onViewClick} />}
      </div>

      {isModalVisible && (
        <CertificateModal title="CSR" onClose={onModalCloseClick} content={certificate} />
      )}
    </div>
  );
};

export default connectors(CSR);
