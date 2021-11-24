import React, { memo } from 'react';
import cn from 'clsx';
import { DatePickerOriginUnit } from 'components/Pickers/DatePickerOrigin/DatePickerOriginUnit';
import s from './SelectionScreen.module.scss';
import { SelectionFilterItem } from './SelectionFilterItem';
import { SelectionFilterPrice } from './SelectionFilterPrice';
import { SelectionFilterTime } from './SelectionFilterTime';
import { LastTickets } from './LastTickets';
import { iconsCollection, serviceCollection } from '../../Collections/collections';
import { ResultScreen } from './ResultScreen';

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
            <SelectionFilterItem icon={serviceCollection.coupe} text="Купе" />
            <SelectionFilterItem icon={serviceCollection.platz} text="Плацкарт" />
            <SelectionFilterItem icon={serviceCollection.seat} text="Сидячий" />
            <SelectionFilterItem icon={serviceCollection.lux} text="Люкс" />
            <SelectionFilterItem icon={serviceCollection.wifi} text="Wi-Fi" />
            <SelectionFilterItem icon={serviceCollection.express} text="Экспресс" />
          </ul>
          <div className={s.divider} />
          <div className={s.sideSelection__title}>Стоимость</div>
          <div className={s.pricePickerLabels}>
            <span>от</span>
            <span>до</span>
          </div>
          <SelectionFilterPrice initialRange={[1500, 7000]} />
          <div className={s.divider} />
          <SelectionFilterTime icon={iconsCollection.forward} text="Туда" />
          <div className={s.divider} />
          <SelectionFilterTime icon={iconsCollection.backward} text="Обратно" />
        </section>
        <LastTickets />
      </div>
      <div>
        <ResultScreen />
      </div>
    </div>
  );
});
