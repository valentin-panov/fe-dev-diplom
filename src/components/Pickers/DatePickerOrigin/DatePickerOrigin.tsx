import React, { memo } from 'react';
import cn from 'clsx';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import s from './DatePickerOrigin.module.scss';

export type Props = {
  className?: string;
};

export const DatePickerOrigin = memo<Props>(({ className }) => {
  const dates: string[] = []; // temporary stub

  const onChange = (value: unknown, dateString: string) => {
    dates[0] = dateString; // temporary stub
  };

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Дата {dates[0]}</span>
      <div className={s.input_holder}>
        <DatePicker onChange={onChange} className={s.inputItem} locale={locale} allowClear />
        <DatePicker onChange={onChange} className={s.inputItem} locale={locale} allowClear />
      </div>
    </div>
  );
});
