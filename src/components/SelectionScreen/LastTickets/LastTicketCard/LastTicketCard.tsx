import React, { memo } from 'react';
import cn from 'clsx';
import s from './LastTicketCard.module.scss';
import { getBeautifulNumber } from '../../../../utils/getBeatifulNumber';

import { LastTicketData } from '../../../../global';
import { iconsCollection, serviceCollection } from '../../../../Collections/collections';

export type Props = {
  className?: string;
  data: LastTicketData;
};

export const LastTicketCard = memo<Props>(({ className, data }) => {
  const { pointA, pointB, price, services } = data;
  const stationA = pointA.station.split(' ');
  const stationB = pointB.station.split(' ');

  return (
    <div className={cn(s.root, className)}>
      <div className={s.row}>
        <div className={s.city}>{pointA.city}</div>
        <div className={s.city}>{pointB.city}</div>
      </div>
      <div className={s.row}>
        <div className={s.station}>
          {stationA.map((el) => (
            <span key={el}>
              {el}
              <br />
            </span>
          ))}
        </div>
        <div className={s.station}>
          {stationB.map((el) => (
            <span key={el}>
              {el}
              <br />
            </span>
          ))}
        </div>
      </div>
      <div className={s.row}>
        <div className={s.service__bar}>
          {services.map((el) => (
            <div className={s.service__icon} key={el}>
              {serviceCollection[el]}
            </div>
          ))}
        </div>
        <div className={s.price}>
          <div className={s.price__from}>от</div>
          <div className={s.price__number}>{getBeautifulNumber(price)}</div>
          <div className={s.price__rub}>{iconsCollection.rub}</div>
        </div>
      </div>
    </div>
  );
});