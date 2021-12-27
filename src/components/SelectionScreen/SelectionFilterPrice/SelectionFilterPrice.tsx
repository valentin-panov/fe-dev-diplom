import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'clsx';
import { Slider } from 'antd';
import s from './SelectionFilterPrice.module.scss';
import './rewrite.css';
import { searchParamsFiltersSet } from '../../../reducers/searchParams';

export type Range = [number, number];

export type Props = {
  className?: string;
  initialRange: Range;
};

export const SelectionFilterPrice = memo<Props>(({ className, initialRange }) => {
  const dispatch = useDispatch();

  const [range, setRange] = useState<Range>(initialRange);
  const min = initialRange[0];
  const max = initialRange[1];

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
    dispatch(searchParamsFiltersSet({ price_from: range[0], price_to: range[1] }));
  };

  return (
    <div className={cn(s.root, className)}>
      <Slider
        max={max}
        min={min}
        range={{ draggableTrack: true }}
        step={10}
        defaultValue={range}
        tooltipVisible
        tooltipPlacement="bottom"
        onChange={(value: number | Range) => onChangeRange(value)}
      />
    </div>
  );
});
