import React, { memo, useState } from 'react';
import cn from 'clsx';
import InputRange, { Range } from 'react-input-range';
import s from './SelectionFilterPrice.module.scss';
import 'react-input-range/lib/css/index.css';
import './rewrite.css';

export type Props = {
  className?: string;
  initialRange: Range;
};

export const SelectionFilterPrice = memo<Props>(({ className, initialRange }) => {
  const [range, setRange] = useState<Range>(initialRange);
  const { min } = initialRange;
  const { max } = initialRange;

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
      <InputRange
        maxValue={max}
        minValue={min}
        value={range}
        onChange={(value) => onChangeRange(value)}
        draggableTrack
      />
    </div>
  );
});
