import React, { SFC } from 'react';
import { Modal, ContentReader } from '@modusbox/modusbox-ui-components/dist/index';

interface CertificateModalProps {
  onClose: () => void;
  title: string;
  content?: string | null;
}

const CertificateModal: SFC<CertificateModalProps> = ({ onClose, title, content }) => (
  <Modal title={title} onClose={onClose} primaryAction="Close" width="800px" flex>
    <ContentReader data={content} style={{ height: '300px' }} />
  </Modal>
);
export default CertificateModal;
