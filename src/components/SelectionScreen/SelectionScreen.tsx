import React, { memo } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import s from './SelectionScreen.module.scss';
import { SelectionFilterItem } from './SelectionFilterItem';
import { SelectionFilterPrice } from './SelectionFilterPrice';
import { SelectionFilterTime } from './SelectionFilterTime';
import { LastTickets } from './LastTickets';
import { iconsCollection } from '../../collections/collections';
import { ResultScreen } from './ResultScreen';
import { Progress } from './Progress';
import { Loading } from '../Loading';
import { RootState } from '../../store';
import Error404 from '../Error404/Error404';
import { DatePickerOrigin } from '../Pickers/DatePickerOrigin';
import { filtersSet } from '../../reducers/filters';
import { getPriceRange } from '../../utils/getPriceRange';

export type Props = {
  className?: string;
};

export const SelectionScreen = memo<Props>(({ className }) => {
  const dispatch = useDispatch();
  const status = useSelector((store: RootState) => store.getRoute.status);
  const trainsList = useSelector((store: RootState) => store.getRoute.data.items);

  const changeFilter = (filter: string, state: boolean) => {
    dispatch(filtersSet({ [filter]: state }));
  };

  const priceRange = trainsList.length ? getPriceRange(trainsList) : { minPrice: 0, maxPrice: 10000 };

  if (trainsList.length) {
    // eslint-disable-next-line no-console
    console.log(priceRange);
  }

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
                  <SelectionFilterItem onChange={changeFilter} filter="have_second_class" />
                  <SelectionFilterItem onChange={changeFilter} filter="have_third_class" />
                  <SelectionFilterItem onChange={changeFilter} filter="have_fourth_class" />
                  <SelectionFilterItem onChange={changeFilter} filter="have_first_class" />
                  <SelectionFilterItem onChange={changeFilter} filter="have_wifi" />
                  <SelectionFilterItem onChange={changeFilter} filter="is_express" />
                </ul>
                <div className={s.divider} />
                <div className={s.sideSelection__title}>Стоимость</div>
                <div className={s.pricePickerLabels}>
                  <span>от</span>
                  <span>до</span>
                </div>
                <SelectionFilterPrice initialRange={[priceRange.minPrice, priceRange.maxPrice]} />
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
