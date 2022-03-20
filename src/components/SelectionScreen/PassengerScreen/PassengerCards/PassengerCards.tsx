import React, { memo } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import { Button, Collapse } from 'antd';
import s from './PassengerCards.module.scss';
import { RootState } from '../../../../store';
import { PassengerCard } from './PassengerCard';
import { ReactComponent as Minus } from '../../../../svg/passCardMinus.svg';
import { ReactComponent as Plus } from '../../../../svg/passCardPlus.svg';
import './reant.css';

const { Panel } = Collapse;

export type Props = {
  className?: string;
};

export const PassengerCards = memo<Props>(({ className }) => {
  const order = useSelector((store: RootState) => store.order);
  return (
    <div className={cn(s.root, className, 'PassengerCard')}>
      <Collapse
        accordion
        // activeKey={2}
        ghost
        expandIconPosition="left"
        expandIcon={({ isActive }) => (isActive ? <Minus /> : <Plus />)}
      >
        {order.departure.seats.map((el, index) => (
          <Panel
            key={`${el.coach_id + el.seat_number + index}`}
            className={s.panel}
            header={<div className={s.title}>Пассажир {index + 1}</div>}
          >
            <PassengerCard element={el} />
          </Panel>
        ))}
      </Collapse>
      <Button className={s.btn} disabled onClick={() => {}}>
        ДАЛЕЕ
      </Button>
    </div>
  );
});
