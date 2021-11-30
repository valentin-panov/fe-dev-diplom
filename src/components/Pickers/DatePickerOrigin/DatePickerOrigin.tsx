import React, { memo } from 'react';
import cn from 'clsx';
import s from './DatePickerOrigin.module.scss';
import { DatePickerOriginUnit } from './DatePickerOriginUnit';

export type Props = {
  className?: string;
};

export const DatePickerOrigin = memo<Props>(({ className }) => {
  const onChange = (value: unknown, dateString: string) => {
    // eslint-disable-next-line no-console
    console.log(value, dateString);
  };

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Дата</span>
      <div className={s.input_holder}>
        <DatePickerOriginUnit getDate={onChange} className="headerPicker" />
        <DatePickerOriginUnit getDate={onChange} className="headerPicker" />
      </div>
    </div>
  );
});
