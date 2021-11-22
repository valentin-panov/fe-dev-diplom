import React, { memo, ReactElement, useState } from 'react';
import cn from 'clsx';
import { Collapse, Slider } from 'antd';

import { ReactComponent as Plus } from '../svg/icon_dest_plus.svg';
import { ReactComponent as Minus } from '../svg/icon_dest_minus.svg';

import s from './SelectionFilterTime.module.scss';
import 'react-input-range/lib/css/index.css';
import './rewrite.css';
import { Range } from '../SelectionFilterPrice';

const { Panel } = Collapse;

export type Props = {
  className?: string;
  icon: ReactElement;
  text: string;
};

export const SelectionFilterTime = memo<Props>(({ className, icon, text }) => {
  const [range, setRange] = useState<Range>([0, 1440]);

  const min = 0;
  const max = 1440;

  const onChangeRange = (value: number | Range): void => {
    if (typeof value === 'number') {
      const minValue = 0;
      const maxValue = max > value ? value : max;
      const setValue: Range = [minValue, maxValue];
      setRange(setValue);
    } else {
      const minValue = min < value[0] ? value[0] : min;
      const maxValue = max > value[1] ? value[1] : max;
      const setValue: Range = [minValue, maxValue];
      setRange(setValue);
    }
  };

  const formatterDuration = (value: number | undefined): string => {
    if (typeof value === 'undefined') {
      return '';
    }
    const hour = Math.floor(value / 60);
    const minutes = value - hour * 60;
    return `${`0${hour}`.slice(-2)}:${`0${minutes}`.slice(-2)}`;
  };

  return (
    <div className={cn(s.root, className)}>
      <Collapse ghost expandIconPosition="right" expandIcon={({ isActive }) => (isActive ? <Minus /> : <Plus />)}>
        <Panel
          header={
            <div className={s.header}>
              <div className={s.icon}>{icon}</div>
              <div className={s.sideSelection__title}>{text}</div>
            </div>
          }
          key={1}
        >
          <div className={s.timePickerPanel}>
            <div className={cn(s.timePickerSubTitle, s.firstST)}>Время отбытия</div>
            <Slider
              max={max}
              min={min}
              range={{ draggableTrack: true }}
              step={30}
              defaultValue={range}
              tooltipVisible
              tooltipPlacement="bottom"
              tipFormatter={(value) => formatterDuration(value)}
              onChange={(value: number | Range) => onChangeRange(value)}
            />
            <div className={cn(s.timePickerSubTitle, s.secondST)}>Время прибытия</div>
            <Slider
              max={max}
              min={min}
              range={{ draggableTrack: true }}
              step={30}
              defaultValue={range}
              tooltipVisible
              tooltipPlacement="bottom"
              tipFormatter={(value) => formatterDuration(value)}
              onChange={(value: number | Range) => onChangeRange(value)}
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});
