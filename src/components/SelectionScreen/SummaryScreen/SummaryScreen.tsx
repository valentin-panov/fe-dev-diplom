import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './SummaryScreen.module.scss';
import { appStateSetProgress } from '../../../reducers/appState';
import { TrainCard } from '../ResultScreen/TrainCard';
import { RootState } from '../../../store';

export const SummaryScreen = memo(() => {
  const dispatch = useDispatch();
  const trainsList = useSelector((store: RootState) => store.getRoute.data.items);
  const order = useSelector((store: RootState) => store.order);
  // eslint-disable-next-line no-underscore-dangle
  const train = trainsList.filter((el) => el[0].departure._id === Number(order.departure.route_direction_id));

  const onFinish = () => {
    dispatch(appStateSetProgress(3));
  };

  return (
    <div className={s.root}>
      <div className={s.card}>
        <div className={cn(s.row_subheading, s.row_padding)}>Поезд</div>
        <div className={s.row_trainCard}>
          <TrainCard trains={train[0]} place="summary" />
        </div>
      </div>
      <Button className={s.btn} onClick={onFinish}>
        Подтвердить
      </Button>
    </div>
  );
});
