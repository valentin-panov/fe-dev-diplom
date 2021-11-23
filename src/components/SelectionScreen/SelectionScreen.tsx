import React, { memo } from 'react';
import cn from 'clsx';
import { DatePickerOriginUnit } from 'components/Pickers/DatePickerOrigin/DatePickerOriginUnit';
import s from './SelectionScreen.module.scss';
import { SelectionFilterItem } from './SelectionFilterItem';
import { ReactComponent as Coupe } from '../../svg/filter_coupe.svg';
import { ReactComponent as Platz } from '../../svg/filter_platz.svg';
import { ReactComponent as Seat } from '../../svg/filter_seat.svg';
import { ReactComponent as Lux } from '../../svg/filter_lux.svg';
import { ReactComponent as WiFi } from '../../svg/filter_wifi.svg';
import { ReactComponent as Express } from '../../svg/filter_express.svg';
import { ReactComponent as To } from '../../svg/icon_dest_forward.svg';
import { ReactComponent as Back } from '../../svg/icon_dest_back.svg';
import { SelectionFilterPrice } from './SelectionFilterPrice';
import { SelectionFilterTime } from './SelectionFilterTime';
import { LastTickets } from './LastTickets';

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
      <div>
        <section className={s.sideSelection}>
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
          <div className={s.pricePickerLabels}>
            <span>от</span>
            <span>до</span>
          </div>
          <SelectionFilterPrice initialRange={[1500, 7000]} />
          <div className={s.divider} />
          <SelectionFilterTime icon={<To />} text="Туда" />
          <div className={s.divider} />
          <SelectionFilterTime icon={<Back />} text="Обратно" />
        </section>
        <LastTickets />
      </div>
      <div>TEBU</div>
    </div>
  );
});
