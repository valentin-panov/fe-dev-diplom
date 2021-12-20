import React, { memo } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import s from './SelectionScreen.module.scss';
import { SelectionFilterItem } from './SelectionFilterItem';
import { SelectionFilterPrice } from './SelectionFilterPrice';
import { SelectionFilterTime } from './SelectionFilterTime';
import { LastTickets } from './LastTickets';
import { carriageType, iconsCollection, serviceCollection } from '../../collections/collections';
import { ResultScreen } from './ResultScreen';
import { Progress } from './Progress';
import { Loading } from '../Loading';
import { RootState } from '../../store';
import Error404 from '../Error404/Error404';
import { DatePickerOrigin } from '../Pickers/DatePickerOrigin';

export type Props = {
  className?: string;
};

export const SelectionScreen = memo<Props>(({ className }) => {
  const status = useSelector((store: RootState) => store.getRoute.status);

  return (
    <div className={cn(s.root, className)}>
      {status === 'idle' && <Error404 />}
      {status === 'error' && <Error404 />}
      {status === 'pending' && <Loading />}
      {status === 'success' && (
        <>
          <Progress />
          <div className={s.mainRow}>
            <div>
              <section className={s.sideSelection}>
                <DatePickerOrigin pickerPlace="asidePicker" />
                <div className={s.divider} />
                <ul className={s.filterList}>
                  <SelectionFilterItem icon={carriageType.coupe} text="Купе" />
                  <SelectionFilterItem icon={carriageType.platz} text="Плацкарт" />
                  <SelectionFilterItem icon={carriageType.seat} text="Сидячий" />
                  <SelectionFilterItem icon={carriageType.lux} text="Люкс" />
                  <SelectionFilterItem icon={serviceCollection.get('wifi')} text="Wi-Fi" />
                  <SelectionFilterItem icon={serviceCollection.get('express')} text="Экспресс" />
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
        </>
      )}
    </div>
  );
});
