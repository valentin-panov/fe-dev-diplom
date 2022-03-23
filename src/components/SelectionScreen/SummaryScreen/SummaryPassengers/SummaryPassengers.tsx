import React, { memo } from 'react';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './SummaryPassengers.module.scss';
import { IOrderSeat } from '../../../../interfaces/Interfaces';
import { RootState } from '../../../../store';
import { appStateSetProgress } from '../../../../reducers/appState';
import { orderReset } from '../../../../reducers/order';

export const SummaryPassengers = memo(() => {
  const dispatch = useDispatch();
  const seats = useSelector((store: RootState) => store.order.departure.seats);
  // eslint-disable-next-line no-underscore-dangle

  const onClick = () => {
    dispatch(orderReset());
    dispatch(appStateSetProgress(0));
  };

  return (
    <div className={s.root}>
      {seats.map((el: IOrderSeat) => (
        <div>{el?.person_info?.first_name}</div>
      ))}
      <Button className={s.btn} onClick={onClick}>
        Изменить
      </Button>
    </div>
  );
});
