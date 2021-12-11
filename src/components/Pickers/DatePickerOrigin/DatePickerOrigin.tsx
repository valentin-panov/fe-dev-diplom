import React, { memo } from 'react';
import cn from 'clsx';
import moment from 'moment';
import s from './DatePickerOrigin.module.scss';
import { DatePickerOriginUnit, DateType } from './DatePickerOriginUnit';

export type Props = {
  className?: string;
};

export const DatePickerOrigin = memo<Props>(({ className }) => {
  const onChange = (value: moment.Moment | null, dateType: DateType) => {
    if (value) {
      // eslint-disable-next-line no-console
      console.log(value.format('YYYY-MM-DD'), dateType);
    }
  };

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Дата</span>
      <div className={s.input_holder}>
        <DatePickerOriginUnit dateType="forward" getDate={onChange} className="headerPicker" />
        <DatePickerOriginUnit dateType="return" getDate={onChange} className="headerPicker" />
      </div>
    </div>
  );
});
