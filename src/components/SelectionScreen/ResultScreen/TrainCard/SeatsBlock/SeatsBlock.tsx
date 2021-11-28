import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import s from './SeatsBlock.module.scss';
import { Train } from '../../../../../global';
import { SeatsBlockRow } from './SeatBlockRow';
import { ServiceBlock } from '../../../ServicesBlock';
import { minValue } from '../../../../../utils/minValue';

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
      have_wifi: wifi,
      have_air_conditioning: ac,
      is_express: express,
      have_fourth_class: seat,
      have_third_class: platz,
      have_second_class: coupe,
      have_first_class: lux,
      available_seats_info: { fourth: seatCount, third: platzCount, second: coupeCount, first: luxCount },
      price_info: { fourth: price4, third: price3, second: price2, first: price1 },
    },
  }: Train = train;

  const seatPrice = price4 ? minValue(price4) : undefined;
  const platzPrice = price3 ? minValue(price3) : undefined;
  const coupePrice = price2 ? minValue(price2) : undefined;
  const luxPrice = price1 ? minValue(price1) : undefined;

  return (
    <div className={cn(s.root, className)}>
      <div className={s.upper_block}>
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
      <div className={s.bottom_block}>
        <ServiceBlock services={{ wifi, express, ac }} className="ticketCard" />
        <Button className={s.btn}>Выбрать места</Button>
      </div>
    </div>
  );
});
