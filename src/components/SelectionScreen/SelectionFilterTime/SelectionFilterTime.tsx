import React, { memo, ReactElement, useState } from 'react';
import cn from 'clsx';
import InputRange, { Range } from 'react-input-range';
import { Collapse } from 'antd';
import { ReactComponent as Plus } from '../svg/icon_dest_plus.svg';
import { ReactComponent as Minus } from '../svg/icon_dest_minus.svg';

import s from './SelectionFilterTime.module.scss';
import 'react-input-range/lib/css/index.css';
import './rewrite.css';

const { Panel } = Collapse;

export type Props = {
  className?: string;
  icon: ReactElement;
  text: string;
};

export const SelectionFilterTime = memo<Props>(({ className, icon, text }) => {
  const [range, setRange] = useState<Range>({ min: 0, max: 24 });
  const min = 0;
  const max = 24;

  const onChangeRange = (value: Range | number): void => {
    if (typeof value === 'number') {
      const minValue = 0;
      const maxValue = max > value ? value : max;
      const setValue = { min: minValue, max: maxValue };
      setRange(setValue);
    } else {
      const minValue = min < value.min ? value.min : min;
      const maxValue = max > value.max ? value.max : max;
      const setValue = { min: minValue, max: maxValue };
      setRange(setValue);
    }
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
            <InputRange
              maxValue={min}
              minValue={max}
              value={range}
              onChange={(value) => onChangeRange(value)}
              draggableTrack
              step={1}
            />
            <div className={cn(s.timePickerSubTitle, s.secondST)}>Время прибытия</div>
            <InputRange
              maxValue={min}
              minValue={max}
              value={range}
              onChange={(value) => onChangeRange(value)}
              draggableTrack
              step={1}
            />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});
