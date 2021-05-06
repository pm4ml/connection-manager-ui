import React, { FC } from 'react';
import classnames from 'classnames';
import AnimateFadeIn from '../AnimateFadeIn';
import './Legend.css';

interface Item {
  color: string;
  label: string;
  value?: string;
}

interface LegendProps {
  vertical?: boolean;
  className?: string;
  items: Item[];
}

const Legend: FC<LegendProps> = ({ items, vertical = false, className }) => {
  const legendClassName = classnames([
    'legend__container',
    vertical && 'legend__container--vertical',
    className,
  ]);
  return (
    <div className={legendClassName}>
      <AnimateFadeIn delay={0.3} initial={{ x: 0 }} animate={{ x: 0 }}>
        {items.map((item, index) => (
          <Item key={index.toString()} {...item} />
        ))}
      </AnimateFadeIn>
    </div>
  );
};

interface ItemProps extends Item {}

const Item: FC<ItemProps> = ({ color, label, value }) => (
  <div className="legend__item">
    <div className="legend__item__descriptor">
      <div className="legend__item__color" style={{ background: color }} />
      <span className="legend__item__label">{label}</span>
    </div>
    {value && <span className="legend__item__value">{value}</span>}
  </div>
);
export default Legend;
