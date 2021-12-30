import React, { ReactElement, useEffect } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
import s from './Wrapper.module.scss';
import { searchParamsDateReturnSet } from '../../reducers/searchParams';
import { RootState } from '../../store';

export type Props = {
  className?: string;
  children: React.ReactChildren | React.ReactNode;
};

export const Wrapper = ({ className, children }: Props): ReactElement => {
  const dispatch = useDispatch();
  const forwardStore = useSelector((store: RootState) => store.searchParams.dateOutbound);
  const returnStore = useSelector((store: RootState) => store.searchParams.dateReturn);

  useEffect(() => {
    if (returnStore && forwardStore && returnStore < forwardStore) {
      dispatch(searchParamsDateReturnSet(null));
      const warning = () => {
        message.warning('Нельзя вернуться раньше, чем отправиться. Выберите новую дату возвращения.').then();
      };
      warning();
    }
  }, [returnStore, forwardStore, dispatch]);

  return <div className={cn(s.root, className)}>{children}</div>;
};
