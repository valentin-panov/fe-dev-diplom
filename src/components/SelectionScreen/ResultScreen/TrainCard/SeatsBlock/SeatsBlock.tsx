import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import s from './SeatsBlock.module.scss';
import { Train } from '../../../../../global';
import { SeatsBlockRow } from './SeatBlockRow';
import { ServiceBlock } from '../../../ServicesBlock';

export type Props = {
  className?: string;
  train: Train;
};

const carriageType = {
  class4: 'Сидячий',
  class3: 'Плацкарт',
  class2: 'Купе',
  class1: 'Люкс',
};

export const SeatsBlock = memo<Props>(({ className, train }) => {
  const {
    departure: {
      have_wifi: wifi,
      have_air_conditioning: ac,
      is_express: express,
      have_fourth_class: class4,
      have_third_class: class3,
      have_second_class: class2,
      have_first_class: class1,
      available_seats_info: { fourth: count4, third: count3, second: count2, first: count1 },
      price_info: { fourth: price4, third: price3, second: price2, first: price1 },
    },
  }: Train = train;

  return (
    <div className={cn(s.root, className)}>
      <div className={s.upper_block}>
        {class4 && count4 && price4 && (
          <SeatsBlockRow carriageClass={carriageType.class4} ticketsAmount={count4} ticketsPrice={price4} />
        )}
        {class3 && count3 && price3 && (
          <SeatsBlockRow carriageClass={carriageType.class3} ticketsAmount={count3} ticketsPrice={price3} />
        )}
        {class2 && count2 && price2 && (
          <SeatsBlockRow carriageClass={carriageType.class2} ticketsAmount={count2} ticketsPrice={price2} />
        )}
        {class1 && count1 && price1 && (
          <SeatsBlockRow carriageClass={carriageType.class1} ticketsAmount={count1} ticketsPrice={price1} />
        )}
      </div>
      <div className={s.bottom_block}>
        <ServiceBlock services={{ wifi, express, ac }} className="ticketCard" />
        <Button className={s.btn}>Выбрать места</Button>
      </div>
    </div>
  );
});