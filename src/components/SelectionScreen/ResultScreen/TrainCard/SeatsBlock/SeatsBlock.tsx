import React, { memo } from 'react';
import cn from 'clsx';
import s from './SeatsBlock.module.scss';
import { Train } from '../../../../../global';
import { SeatsBlockRow } from './SeatBlockRow';

export type Props = {
  className?: string;
  train: Train;
};

const servicesName = {
  seat: 'Сидячий',
  platz: 'Плацкарт',
  coupe: 'Купе',
  lux: 'Люкс',
};

export const SeatsBlock = memo<Props>(({ className, train }) => {
  const {
    departure: {
      have_fourth_class: seat,
      have_third_class: platz,
      have_second_class: coupe,
      have_first_class: lux,
      available_seats_info: { fourth: seatCount, third: platzCount, second: coupeCount, first: luxCount },
      price_info: { fourth: price4, third: price3, second: price2, first: price1 },
    },
  }: Train = train;

  const seatPrice = price4 ? price4.bottom_price : undefined;
  const platzPrice = price3 ? price3.bottom_price : undefined;
  const coupePrice = price2 ? price2.bottom_price : undefined;
  const luxPrice = price1 ? price1.bottom_price : undefined;

  return (
    <div className={cn(s.root, className)}>
      {seat && seatCount && seatPrice && (
        <SeatsBlockRow carriageClass={servicesName.seat} ticketsAmount={seatCount} ticketPrice={seatPrice} />
      )}
      {platz && platzCount && platzPrice && (
        <SeatsBlockRow carriageClass={servicesName.platz} ticketsAmount={platzCount} ticketPrice={platzPrice} />
      )}
      {coupe && coupeCount && coupePrice && (
        <SeatsBlockRow carriageClass={servicesName.coupe} ticketsAmount={coupeCount} ticketPrice={coupePrice} />
      )}
      {lux && luxCount && luxPrice && (
        <SeatsBlockRow carriageClass={servicesName.lux} ticketsAmount={luxCount} ticketPrice={luxPrice} />
      )}
    </div>
  );
});
