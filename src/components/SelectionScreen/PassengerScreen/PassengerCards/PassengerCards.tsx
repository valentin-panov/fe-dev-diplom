import React, { memo } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import s from './PassengerCards.module.scss';
import { RootState } from '../../../../store';
import { PassengerCard } from './PassengerCard';

export type Props = {
  className?: string;
};

export const PassengerCards = memo<Props>(({ className }) => {
  const order = useSelector((store: RootState) => store.order);
  return (
    <div className={cn(s.root, className)}>
      {order.departure.seats.map(() => (
        <PassengerCard />
      ))}
    </div>
  );
});
