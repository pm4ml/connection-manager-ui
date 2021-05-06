import React, { FC } from 'react';
import { ContentReader, Modal } from 'components';

interface TransferRequestDetailModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any | null;
  title: string;
  onCloseClick: () => void;
}

export const TransferRequestDetailsModal: FC<TransferRequestDetailModalProps> = ({
  model,
  title,
  onCloseClick,
}) => {
  return (
    <Modal title={title} width="1000px" onClose={onCloseClick} isSubmitEnabled={false}>
      <div style={{ height: '400px', padding: '20px', display: 'flex' }}>
        <ContentReader data={JSON.stringify(model)} />
      </div>
    </Modal>
  );
};
