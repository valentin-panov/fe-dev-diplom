import React, { memo } from 'react';
import cn from 'clsx';
import { DatePickerOriginUnit } from 'components/Pickers/DatePickerOrigin/DatePickerOriginUnit';
import { Slider, Switch } from 'antd';
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
        <div>
          <Switch defaultChecked />
        </div>
        <div className={s.divider} />
        <div className={s.sideSelection__title}>Стоимость</div>
        <div>
          <Slider defaultValue={[20, 50]} range={{ draggableTrack: true }} style={{ width: '300px', height: '20px' }} />
        </div>
        <div className={s.divider} />
        <div className={s.sideSelection__title}>Туда</div>
        <div className={s.divider} />
        <div className={s.sideSelection__title}>Обратно</div>
      </aside>
      <div>TEBU</div>
    </div>
  );
});
