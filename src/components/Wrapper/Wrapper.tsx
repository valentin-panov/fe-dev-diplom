import React, { ReactElement, useEffect } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import s from './Wrapper.module.scss';
import { RootState } from '../../store';
import { getRouteFetchData } from '../../reducers/getRoute';
import { searchParamsDateReturnSet } from '../../reducers/searchParams';

export type Props = {
  className?: string;
  children: React.ReactChildren | React.ReactNode;
};

export const Wrapper = ({ className, children }: Props): ReactElement => {
  const dispatch = useDispatch();
  const searchParams = useSelector((store: RootState) => store.searchParams);
  const { dateOutbound, dateReturn, filters } = searchParams;

  useEffect(() => {
    if (dateReturn && dateOutbound && dateReturn < dateOutbound) {
      dispatch(searchParamsDateReturnSet(null));
      const warning = () => {
        message.warning('Нельзя вернуться раньше, чем отправиться. Выберите новую дату возвращения.').then();
      };
      warning();
    }
  }, [dateReturn, dateOutbound, dispatch]);

  useEffect(() => {
    // TODO THROTTLING
    dispatch(getRouteFetchData(searchParams));
  }, [dispatch, filters]);

  return <div className={cn(s.root, className)}>{children}</div>;
};
