import React, { memo, useRef } from 'react';
import cn from 'clsx';
import { Collapse } from 'antd';
import { useSelector } from 'react-redux';
import s from './OrderPassengers.module.scss';
import { RootState } from '../../../../store';
import { ReactComponent as Minus } from '../../../../svg/icon_dest_minus.svg';
import { ReactComponent as Plus } from '../../../../svg/icon_dest_plus.svg';
import { iconsCollection } from '../../../../collections/collections';
import { OrderSeat } from '../../../../interfaces/Interfaces';

const { Panel } = Collapse;

export type Props = {
  className?: string;
};

export const OrderPassengers = memo<Props>(({ className }) => {
  const forward = useRef(null);
  const {
    departure: { seats },
  } = useSelector((store: RootState) => store.order);
  const ticketTypes = seats.reduce(
    (acc: { child: number; adult: number }, el: OrderSeat) => {
      if (el.is_child === true) {
        return { ...acc, child: acc.child + 1 };
      }
      return { ...acc, adult: acc.adult + 1 };
    },
    { adult: 0, child: 0 }
  );
  return (
    <div className={cn(s.root, className)}>
      <Collapse ghost expandIconPosition="right" expandIcon={({ isActive }) => (isActive ? <Minus /> : <Plus />)}>
        <Panel
          header={
            <div className={s.header}>
              <div className={s.icon}>{iconsCollection.passenger}</div>
              <div className={s.sideSelection__title}>Пассажиры</div>
            </div>
          }
          key={1}
        >
          <div className={s.timePickerPanel} ref={forward}>
            {ticketTypes.adult > 0 && (
              <div className={cn(s.timePickerSubTitle, s.firstST)}>Взрослых: {ticketTypes.adult}</div>
            )}
            {ticketTypes.child > 0 && (
              <div className={cn(s.timePickerSubTitle, s.secondST)}>Детей: {ticketTypes.child}</div>
            )}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});
