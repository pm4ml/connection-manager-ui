import React, { FC, ReactElement } from 'react';
import classnames from 'classnames';
import DataLabel from '../DataLabel';
import './ProgressTab.scss';

interface ProgressTabProps {
  flex?: boolean;
  color?: string;
  kind?: string;
  selectedKind?: string;
  disabled?: boolean;
  active?: boolean;
  selected?: boolean;
  title?: string;
  description?: string;
  status?: string;
  statusLabel?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
  lastTabText?: string;
}

const ProgressTab: FC<ProgressTabProps> = ({
  children,
  flex = false,
  disabled = false,
  color = undefined,
  kind = 'primary',
  selectedKind = kind,
  active = false,
  selected = false,
  title,
  description,
  status,
  statusLabel,
  style,
  onClick,
  className = '',
  lastTabText,
}) => {
  const progressTabClassName = classnames([
    'progress-tab',
    `progress-tab--${selected ? selectedKind : kind}`,
    selected && 'progress-tab--selected',
    disabled && 'progress-tab--disabled',
    !disabled && onClick && 'progress-tab--clickable',
    flex && 'progress-tab--flex',
    active && 'progress-tab--active',
    className,
  ]);

  const realStyle = {
    borderBottomColor: !selected ? color : undefined,
  };
  const textStyle = {
    color: !selected ? color : undefined,
  };
  const circleColorStyle = {
    backgroundColor: !selected ? color : undefined,
  };
  return (
    <>
      <div
        className={progressTabClassName}
        role="presentation"
        onClick={onClick}
        style={{ ...style, ...realStyle }}
      >
        {title && (
          <div className="progress-tab__title">
            <DataLabel size="m">{title}</DataLabel>
          </div>
        )}

        {description && (
          <div className="progress-tab__description" style={textStyle}>
            {description || ''}
          </div>
        )}

        <div className="progress-tab__status">
          {status && (
            <>
              <div className="progress-tab__status-circle" style={circleColorStyle} />
              <div className="progress-tab__status-text" style={textStyle}>
                <DataLabel size="s">{status}</DataLabel>
              </div>
            </>
          )}
          {statusLabel && (
            <div className="progress-tab__status-label" style={textStyle}>
              <DataLabel size="s" bold>
                {statusLabel}
              </DataLabel>
            </div>
          )}
        </div>
      </div>
      {lastTabText && (
        <div className="progress-tab__last-tab">
          <div className="progress-tab__last-tab-text">{lastTabText}</div>
        </div>
      )}
    </>
  );
};

interface ProgressTabsProps {
  flex?: boolean;
  children: ReactElement[];
  onClick?: (index: number) => void;
  selected: number;
}

const ProgressTabs: FC<ProgressTabsProps> = ({ children, flex = false, selected = 0, onClick }) => {
  const className = classnames(['progress-tabs', flex && 'progress-tabs--flex']);

  const selectedChildren = children[selected].props.children;
  return (
    <div className="progress-wrapper">
      <div className={className}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            ...child.props,
            flex,
            selected: selected === index,
            active: child.props.active || selected === index,
            onClick: () => {
              if (!child.props.disabled && onClick) return onClick(index);
              return undefined;
            },
            key: index.toString(),
          })
        )}
      </div>
      {selectedChildren}
    </div>
  );
};

export default ProgressTabs;
export { ProgressTab };
