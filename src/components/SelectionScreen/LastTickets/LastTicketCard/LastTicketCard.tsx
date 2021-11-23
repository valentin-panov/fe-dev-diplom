import React, { memo } from 'react';
import cn from 'clsx';
import s from './LastTicketCard.module.scss';
import { ReactComponent as Rub } from '../../../../svg/rub.svg';
import { ReactComponent as Express } from '../../../../svg/filter_express.svg';
import { ReactComponent as Platz } from '../../../../svg/filter_platz.svg';
import { ReactComponent as WiFi } from '../../../../svg/filter_wifi.svg';
import { ReactComponent as Cup } from '../../../../svg/service_cup.svg';
import { getBeautifulNumber } from '../../../../utils/getBeatifulNumber';

export type PointX = { city: string; station: string };

const serviceCollection = {
  express: <Express />,
  wifi: <WiFi />,
  platz: <Platz />,
  cup: <Cup />,
};

export type serviceList = 'express' | 'wifi' | 'platz' | 'cup';

export type Services = Array<serviceList>;

export type LastTicketData = {
  id: number;
  pointA: PointX;
  pointB: PointX;
  price: number;
  services: Services;
};

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
          <div className={s.price__rub}>
            <Rub />
          </div>
        </div>
      </div>
    </div>
  );
});
