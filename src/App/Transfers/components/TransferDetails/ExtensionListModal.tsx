import React, { FC } from 'react';
import { Modal, ErrorBox, DataList } from 'components';
import { ExtensionListItem } from '../../types';

interface ExtensionListModalProps {
  model: ExtensionListItem[];
  title: string;
  onCloseClick: () => void;
}

const columns = [
  {
    label: 'Key',
    key: 'key',
  },
  {
    label: 'Value',
    key: 'value',
  },
];

export const ExtensionListModal: FC<ExtensionListModalProps> = ({ model, title, onCloseClick }) => {
  let content = null;

  if (!model) {
    content = <ErrorBox>Extension List: Unable to load extension list</ErrorBox>;
  } else {
    content = <DataList columns={columns} list={model} />;
  }

  return (
    <Modal title={title} width="800px" onClose={onCloseClick} isSubmitEnabled={false}>
      {content}
    </Modal>
  );
};
