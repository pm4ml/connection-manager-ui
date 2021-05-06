import React, { SFC } from 'react';
import { Button } from '@modusbox/modusbox-ui-components/dist/index';
import './index.css';

interface FileControlsProps {
  onViewClick?: () => void;
  onDownloadClick?: () => void;
  downloadDisabled?: EventTarget | boolean;
}

const FileControls: SFC<FileControlsProps> = ({
  onViewClick,
  onDownloadClick,
  downloadDisabled,
}) => (
  <div className="file-controls">
    {onViewClick && (
      <Button
        className="file-controls__button"
        icon="studio-project-small"
        label="View"
        kind="secondary"
        noFill
        size="m"
        onClick={onViewClick}
      />
    )}
    {onDownloadClick && (
      <Button
        className="file-controls__button"
        icon="download-small"
        label="Download"
        noFill
        size="m"
        onClick={onDownloadClick}
        disabled={downloadDisabled}
      />
    )}
  </div>
);

export default FileControls;
