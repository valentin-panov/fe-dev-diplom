import React, { memo } from 'react';
import cn from 'clsx';
import { DatePickerOriginUnit } from 'components/Pickers/DatePickerOrigin/DatePickerOriginUnit';
import { Slider } from 'antd';
import s from './SelectionScreen.module.scss';
import { SelectionFilterItem } from './SelectionFilterItem';
import { ReactComponent as Coupe } from './svg/icon_coupe.svg';
import { ReactComponent as Platz } from './svg/icon_platz.svg';
import { ReactComponent as Seat } from './svg/icon_seat.svg';
import { ReactComponent as Lux } from './svg/icon_lux.svg';
import { ReactComponent as WiFi } from './svg/icon_wifi.svg';
import { ReactComponent as Express } from './svg/icon_express.svg';

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
        <ul className={s.filterList}>
          <SelectionFilterItem icon={<Coupe />} text="Купе" />
          <SelectionFilterItem icon={<Platz />} text="Плацкарт" />
          <SelectionFilterItem icon={<Seat />} text="Сидячий" />
          <SelectionFilterItem icon={<Lux />} text="Люкс" />
          <SelectionFilterItem icon={<WiFi />} text="Wi-Fi" />
          <SelectionFilterItem icon={<Express />} text="Экспресс" />
        </ul>
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
