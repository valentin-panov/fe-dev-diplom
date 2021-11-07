import React, { memo } from 'react';
import cn from 'clsx';
import s from './DatePickerOrigin.module.scss';
import { DatePickerOriginUnit } from './DatePickerOriginUnit';

export type Props = {
  className?: string;
};

export const DatePickerOrigin = memo<Props>(({ className }) => {
  const dateFormat = 'DD/MM/YY';
  const placeholder = 'ДД/ММ/ГГ';

  const dates: string[] = []; // temporary stub
  const onChange = (value: unknown, dateString: string) => {
    dates[0] = dateString; // temporary stub
  };

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Дата {dates[0]}</span>
      <div className={s.input_holder}>
        <DatePickerOriginUnit dateFormat={dateFormat} getDate={onChange} placeholder={placeholder} />
        <DatePickerOriginUnit dateFormat={dateFormat} getDate={onChange} placeholder={placeholder} />
      </div>
    </div>
  );
});
