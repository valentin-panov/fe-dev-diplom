import React, { memo } from 'react';
import cn from 'clsx';
import s from './SeatsBlock.module.scss';
import { iconsCollection } from '../../../../../Collections/collections';

export type Props = {
  className?: string;
  carriageClass: string;
  ticketsAmount: number;
  ticketPrice: number;
};

export const SeatsBlockRow = memo<Props>(({ className, carriageClass, ticketsAmount, ticketPrice }) => (
  <div className={cn(s.row, className)}>
    <div className={s.carriageClass}>{carriageClass}</div>
    <div className={s.ticketsAmount}>{ticketsAmount}</div>
    <div className={s.ticketsPrice}>
      <span>от&nbsp;</span>
      {ticketPrice}
    </div>
    <div className={s.moneySymbol}>{iconsCollection.rub}</div>
  </div>
));
