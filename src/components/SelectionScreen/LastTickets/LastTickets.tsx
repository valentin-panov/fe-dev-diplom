import React, { memo } from 'react';
import cn from 'clsx';
import s from './LastTickets.module.scss';
import { LastTicketCard, LastTicketData } from './LastTicketCard';

export type Props = {
  className?: string;
};

const data: LastTicketData = {
  pointA: { city: 'Санкт-Петербург', station: 'Курский вокзал' },
  pointB: { city: 'Самара', station: 'Московский вокзал' },
  price: 2500,
  services: ['wifi', 'express', 'cup'],
};

export const LastTickets = memo<Props>(({ className }) => (
  <section className={cn(s.root, className)}>
    <div className={s.lastTicketsTitle}>последние билеты</div>
    <LastTicketCard data={data} />
  </section>
));
