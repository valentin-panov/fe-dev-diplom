import React, { memo } from 'react';
import cn from 'clsx';
import { DatePickerOriginUnit } from 'components/Pickers/DatePickerOrigin/DatePickerOriginUnit';
import moment from 'moment';
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

export type Props = {
  className?: string;
};

export const SelectionScreen = memo<Props>(({ className }) => {
  const status = useSelector((store: RootState) => store.getRoute.status);

  const dates: string[] = []; // temporary stub
  const onChange = (value: unknown, dateString: string) => {
    dates[0] = dateString; // temporary stub
  };

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
                <div className={s.datePicker}>
                  <div className={s.sideSelection__title}>Дата поездки</div>
                  <DatePickerOriginUnit
                    disableDate={moment()}
                    dateType="forward"
                    getDate={onChange}
                    className="asidePicker"
                  />
                  <div className={s.sideSelection__title}>Дата возвращения</div>
                  <DatePickerOriginUnit
                    disableDate={moment()}
                    dateType="return"
                    getDate={onChange}
                    className="asidePicker"
                  />
                </div>
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
