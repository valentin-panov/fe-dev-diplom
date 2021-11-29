import React, { memo } from 'react';
import cn from 'clsx';
import s from './LastTicketCard.module.scss';
import { getBeautifulNumber } from '../../../../utils/getBeatifulNumber';

import { Train } from '../../../../global';
import { iconsCollection } from '../../../../Collections/collections';
import { ServiceBlock } from '../../ServicesBlock';
import { capitalize } from '../../../../utils/capitalize';

export type Props = {
  className?: string;
  train: Train;
};

export const LastTicketCard = memo<Props>(({ className, train }) => {
  const {
    min_price: price,
    have_wifi: wifi,
    have_air_conditioning: ac,
    is_express: express,
    departure: {
      from: {
        railway_station_name: stationAfull,
        city: { name: cityA },
      },
      to: {
        railway_station_name: stationBfull,
        city: { name: cityB },
      },
    },
  }: Train = train;

  const stationA = stationAfull.split(' ');
  const stationB = stationBfull.split(' ');

  return (
    <div className={cn(s.root, className)}>
      <div className={s.row}>
        <div className={s.city}>{capitalize(cityA)}</div>
        <div className={s.city}>{capitalize(cityB)}</div>
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
        <ServiceBlock services={{ wifi, ac, express }} className="lastTickets" />
        <div className={s.price}>
          <div className={s.price__from}>от</div>
          <div className={s.price__number}>{getBeautifulNumber(price)}</div>
          <div className={s.price__rub}>{iconsCollection.rub}</div>
        </div>
      </div>
    </div>
  );
});
