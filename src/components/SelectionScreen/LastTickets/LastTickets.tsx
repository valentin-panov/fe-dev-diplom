import React, { memo } from 'react';
import cn from 'clsx';
import s from './LastTickets.module.scss';
import { LastTicketCard, LastTicketData } from './LastTicketCard';

export type Props = {
  className?: string;
};

const data1: LastTicketData = {
  id: 1,
  pointA: { city: 'Санкт-Петербург', station: 'Курский вокзал' },
  pointB: { city: 'Самара', station: 'Московский вокзал' },
  price: 2500,
  services: ['wifi', 'express', 'cup'],
};
const data2: LastTicketData = {
  id: 2,
  pointA: { city: 'Москва', station: 'Курский вокзал' },
  pointB: { city: 'Казань', station: 'Московский вокзал' },
  price: 3500,
  services: ['wifi', 'express', 'cup'],
};
const data3: LastTicketData = {
  id: 3,
  pointA: { city: 'Казань', station: 'Курский вокзал' },
  pointB: { city: 'Нижний новгород', station: 'Московский вокзал' },
  price: 3800,
  services: ['wifi', 'express', 'cup'],
};

const ticketsArray: LastTicketData[] = [data1, data2, data3];

export const LastTickets = memo<Props>(({ className }) => (
  <section className={cn(s.root, className)}>
    <div className={s.lastTicketsTitle}>последние билеты</div>
    {ticketsArray.map((el) => (
      <LastTicketCard data={el} key={el.id} />
    ))}
  </section>
));
