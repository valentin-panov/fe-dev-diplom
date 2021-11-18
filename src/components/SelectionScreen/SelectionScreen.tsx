import React, { memo } from 'react';
import cn from 'clsx';
import { DatePickerOriginUnit } from 'components/Pickers/DatePickerOrigin/DatePickerOriginUnit';
import s from './SelectionScreen.module.scss';

export type Props = {
  className?: string;
};

export const SelectionScreen = memo<Props>(({ className }) => {
  const dates: string[] = []; // temporary stub
  const onChange = (value: unknown, dateString: string) => {
    dates[0] = dateString; // temporary stub
  };

  return (
    <div className={cn(s.root, className)}>
      <aside className={s.sideSelection}>
        <div className={s.datePicker}>
          <div className={s.sideSelection__title}>Дата поездки</div>
          <DatePickerOriginUnit getDate={onChange} className="asidePicker" />
          <div className={s.sideSelection__title}>Дата возвращения</div>
          <DatePickerOriginUnit getDate={onChange} className="asidePicker" />
        </div>
        <div className={s.divider} />
        <div>adds</div>
        <div className={s.divider} />
        <div className={s.sideSelection__title}>Стоимость</div>
        <div className={s.divider} />
        <div>way</div>
        <div className={s.divider} />
        <div>return</div>
      </aside>
      <div>TEBU</div>
    </div>
  );
});
