import React, { ReactElement, useEffect, useMemo } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import { BehaviorSubject, of } from 'rxjs';
import s from './Wrapper.module.scss';
import { RootState } from '../../store';
import { getRouteFetchData } from '../../reducers/getRoute';
import { searchParamsDateReturnSet } from '../../reducers/searchParams';
import { Filters } from '../../interfaces/Interfaces';
import { throttling } from '../../utils/throttling';

export type Props = {
  className?: string;
  children: React.ReactChildren | React.ReactNode;
};

export const Wrapper = ({ className, children }: Props): ReactElement => {
  const dispatch = useDispatch();
  const searchParams = useSelector((store: RootState) => store.searchParams);
  const { dateOutbound, dateReturn, filters } = searchParams;
  const filters$ = useMemo(() => new BehaviorSubject<Filters>(filters), [filters]);
  const result$ = useMemo(
    () => filters$.pipe(throttling<Filters>(1500, (arg) => new BehaviorSubject<Filters>(arg))),
    [filters$]
  );

  // Subscription to the input stream
  React.useEffect(() => {
    const subscription = result$.subscribe({
      next: () => {
        // fire update
        if (searchParams.cityDeparture.value && searchParams.cityArrival.value) {
          dispatch(getRouteFetchData(searchParams));
        }
      },
      error: (err) =>
        // handle error here
        of(err),
    });
    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result$]);

  useEffect(() => {
    if (dateReturn && dateOutbound && dateReturn < dateOutbound) {
      dispatch(searchParamsDateReturnSet(null));
      const warning = () => {
        message.warning('Нельзя вернуться раньше, чем отправиться. Выберите новую дату возвращения.').then();
      };
      warning();
    }
  }, [dateReturn, dateOutbound, dispatch]);

  return <div className={cn(s.root, className)}>{children}</div>;
};
