import { AnyAction } from 'redux';

export interface FileControlsProps {
  onViewClick: () => void;
  onDownloadClick: () => AnyAction;
  downloadDisabled?: boolean;
}
